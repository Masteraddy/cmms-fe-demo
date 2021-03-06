import { Container, Inner } from './styles/Page';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';

import Header from './Header';
import SidebarMenu from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { useAppState } from './shared/AppProvider';
import { withRouter } from 'next/router';
import Router from 'next/router';

const { Content } = Layout;

const NonDashboardRoutes = [
  '/',
  '/signin',
  '/signup',
  '/forgot',
  '/lockscreen',
  '/_error',
  '/reset',
];

const Page = ({ router, children }) => {
  const [loading, setLoading] = useState(true);
  const [state] = useAppState();
  const [active, setActive] = useState(false);
  Router.events.on('routeChangeStart', () => setActive(true));
  Router.events.on('routeChangeComplete', () => setActive(false));
  Router.events.on('routeChangeError', () => setActive(false));
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <Spin tip='Loading...' size='large' spinning={active}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? 'weakColor' : ''} ${
            state.boxed ? 'boxed shadow-sm' : ''
          }`}
        >
          {!isNotDashboard && <Header />}
          <Layout className='workspace'>
            {!isNotDashboard && (
              <SidebarMenu
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
              />
            )}

            <Layout>
              <Content>
                {!isNotDashboard ? <Inner>{children}</Inner> : children}
              </Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};

export default withRouter(Page);
