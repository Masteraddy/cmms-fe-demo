import "../assets/styles.less";

// import App from 'next/app';
import { Fragment, useState } from "react";
import redirect from "next-redirect";
import absoluteUrl from "next-absolute-url";

import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/HashLoader";

import AppProvider from "../components/shared/AppProvider";
import { Provider } from "react-redux";
import { GlobalStyles } from "../components/styles/GlobalStyles";
import Head from "next/head";
import NProgress from "nprogress";
import { makeStore } from "../redux";
import Page from "../components/Page";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import {
  getCookie,
  getUser,
  getUserLocal,
  getUsersLocal,
  getServices,
  getServicesLocal,
  getRequestLocal,
  getOutRequestLocal,
  getLocationLocal,
  getPropertyLocal,
  getPropertLocal,
  getEquipmentLocal,
  getInventoryLocal,
  getInspectionLocal,
  getInspectionsLocal,
  getAssetLocal,
  getCssLocal,
  getPpmsLocal,
  getFiltersLocal,
  getRegionInfosLocal,
  getIHSDatasLocal,
} from "../redux/actions";
import { getSiteInfosLocal } from "../redux/actions/siteInfoActions";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, store }) => {
  // const [active, setActive] = useState(false);
  // Router.events.on('routeChangeStart', () => setActive(true));
  // Router.events.on('routeChangeComplete', () => setActive(false));
  // Router.events.on('routeChangeError', () => setActive(false));
  return (
    <Fragment>
      <Provider store={store}>
        <GlobalStyles />
        <Head>
          <meta
            name='viewport'
            content='user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height'
          />
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='shortcut icon' href='/images/logo.png' />
          <title>Servo - Sostein Product</title>
          <link rel='stylesheet' href='/min/dropzone.min.css' />
          <link rel='stylesheet' href='/styles/filepicker.css' />
          <link
            href='https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700'
            rel='stylesheet'
          />
          {pageProps.ieBrowser && (
            <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js' />
          )}
        </Head>
        <AppProvider>
          {/* <LoadingOverlay
            active={active}
            spinner={<BounceLoader color={'#ffffff'} />}
          > */}
          <Page>
            <Component {...pageProps} />
          </Page>
          {/* </LoadingOverlay> */}
        </AppProvider>
      </Provider>
    </Fragment>
  );
};
// }

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const userAgent = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;
  const { origin } = absoluteUrl(ctx.req);
  const hostname = origin;

  let ie = false;
  if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
    ie = true;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, hostname);
  }

  pageProps.query = ctx.query;
  pageProps.ieBrowser = ie;

  const NonDashboardRoutes = [
    "/signin",
    "/signup",
    "/forgot",
    "/lockscreen",
    "/_error",
    "/reset",
  ];
  var Routes = ctx.pathname || Router.pathname;
  const isNotDashboard = NonDashboardRoutes.includes(Routes);

  const token = getCookie("token", ctx.req);
  const id = getCookie("intd", ctx.req);

  // let datas;

  const users = await getUsersLocal(hostname, token);
  const services = await getServicesLocal(hostname);
  const propert = await getPropertLocal(hostname);
  const filter = await getFiltersLocal(hostname);
  // console.log(users);
  ctx.store.dispatch({ type: "USERSINFO", payload: users });
  ctx.store.dispatch({ type: "GET_SERVICES", payload: services });
  ctx.store.dispatch({ type: "GET_PROPERTIES", payload: propert });
  ctx.store.dispatch({ type: "GET_FILTERS", payload: filter });
  if (token) {
    if (isNotDashboard) {
      {
        ctx.req ? redirect(ctx, "/dashboard") : Router.push("/dashboard");
      }
    }
    const user = await getUserLocal(hostname, token, id);
    var requests = await getRequestLocal(hostname, user, token);
    var outrequests = await getOutRequestLocal(hostname, user, token);
    const locations = await getLocationLocal(hostname);
    const properties = await getPropertyLocal(hostname, user);
    const regioninfos = await getRegionInfosLocal(hostname);
    const siteinfos = await getSiteInfosLocal(hostname);
    const ihsdatas = await getIHSDatasLocal(hostname);

    if (
      user.usertype === "manager" ||
      user.usertype === "technician" ||
      user.usertype === "procurement" ||
      user.usertype === "team-member"
    ) {
      var equipment = await getEquipmentLocal(hostname);
      var inspection = await getInspectionsLocal(hostname);
      var inventory = await getInventoryLocal(hostname);
      var asset = await getAssetLocal(hostname);
      var css = await getCssLocal(hostname);
      var ppms = await getPpmsLocal(hostname);
      ctx.store.dispatch({ type: "GET_EQUIPMENTS", payload: equipment });
      ctx.store.dispatch({ type: "GET_INVENTORYS", payload: inventory });
      ctx.store.dispatch({ type: "GET_INSPECTIONS", payload: inspection });
      ctx.store.dispatch({ type: "GET_ASSETS", payload: asset });
      ctx.store.dispatch({ type: "GET_CSS", payload: css });
      ctx.store.dispatch({ type: "GET_PPMS", payload: ppms });
      // userRequest = await requests;
    }
    // console.log(user._id, requests);
    ctx.store.dispatch({ type: "GET_IHS_DATAS", payload: ihsdatas });
    ctx.store.dispatch({ type: "GET_REGION_INFOS", payload: regioninfos });
    ctx.store.dispatch({ type: "GET_SITE_INFOS", payload: siteinfos });
    ctx.store.dispatch({ type: "GET_REQUESTS", payload: requests });
    ctx.store.dispatch({ type: "GET_OUTREQUESTS", payload: outrequests });
    ctx.store.dispatch({ type: "GET_LOCATIONS", payload: locations });
    ctx.store.dispatch({ type: "GET_PROPERTYS", payload: properties });
    ctx.store.dispatch({ type: "AUTHENTICATE", payload: user._id });
    ctx.store.dispatch({ type: "USERINFO", payload: user });
  } else {
    if (!isNotDashboard) {
      if (
        Routes === "/" ||
        Routes === "/about" ||
        Routes === "/service" ||
        Routes === "/contact" ||
        Routes === "/request" ||
        Routes === "/cs"
      ) {
        console.log(!isNotDashboard, Routes);
      } else {
        {
          ctx.req ? redirect(ctx, "/signin") : Router.push("/signin");
        }
      }
      // console.log(Routes);
    }
  }
  return { pageProps };
};

export default withRedux(makeStore)(MyApp);
