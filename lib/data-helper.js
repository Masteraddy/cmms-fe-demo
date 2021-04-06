import { getDayRequestNo } from '../redux/actions';

const priceData = (requests = []) => {
  let actualPrice = 0,
    fixedPrice = 0,
    profitPrice = 0;
  requests.map((dt) => {
    actualPrice += dt.actual;
    fixedPrice += dt.fixed;
    profitPrice += dt.profit;
    return dt;
  });

  let price = [
    {
      theta: actualPrice || 0,
      color: '#007bff',
      title: 'Total Actual Price',
    },
    { theta: fixedPrice || 0, color: '#52c41a', title: 'Total Fixed Price' },
    { theta: profitPrice || 0, color: '#faad14', title: 'Total Profit' },
  ];
  return price;
};

const ourData = (requests = []) => {
  var pendingReq = requests.filter((dt) => dt.status === 'pending').length;
  var ongoingReq = requests.filter((dt) => dt.status === 'on-going').length;
  var holdReq = requests.filter((dt) => dt.status === 'hold').length;
  var parkReq = requests.filter((dt) => dt.status === 'park').length;
  var doneReq = requests.filter((dt) => dt.status === 'done').length;

  let data = [
    {
      theta: pendingReq || 0,
      color: '#007bff',
      title: 'Pending',
      className: 'custom-class',
    },
    { theta: doneReq || 0, color: '#52c41a', title: 'Done' },
    { theta: ongoingReq || 0, color: '#faad14', title: 'Ongoing' },
    { theta: holdReq || 0, color: '#f5222d', title: 'Hold' },
    { theta: parkReq || 0, color: '#52ffff', title: 'Park' },
  ];
  return data;
};

const finalFilter = (data = []) => {
  let arr = [];
  data.map((dt) => {
    arr.push({ x: dt.title, y: dt.theta });
  });
  return arr;
};

const priceFilter = (price = []) => {
  let arr = [];
  price.map((dt) => {
    arr.push({ x: dt.title, y: dt.theta });
  });
  return arr;
};

const generateFilter = (requests, axes, days) => {
  let arr = [];
  axes.map((x) => {
    const y = getDayRequestNo(requests, days[1], x);
    arr.push({ x, y });
  });
  // console.log(y)
  return arr;
};

const emailData = (inspections) => {
  let emails = [];
  let uniqEmail = [];
  let finalDt = [];
  inspections.forEach((user) => {
    emails.push(user.email);
    if (!uniqEmail.includes(user.email)) {
      uniqEmail.push(user.email);
    }
  });

  uniqEmail.forEach((x) => {
    let y = emails.filter((em) => em === x).length;
    let dt = { x, y };
    finalDt.push(dt);
  });
  return finalDt;
};

const siteData = (inspections) => {
  let insps = inspections.map((dt) => {
    dt.project = `${dt.projectsite.property} at ${dt.projectsite.location}`;
    return dt;
  });
  let site = [];
  let uniqSite = [];
  let finalDt = [];
  insps.forEach((user) => {
    site.push(user.project);
    if (!uniqSite.includes(user.project)) {
      uniqSite.push(user.project);
    }
  });

  uniqSite.forEach((x) => {
    let y = site.filter((em) => em === x).length;
    let dt = { x, y };
    finalDt.push(dt);
  });
  return finalDt;
};

module.exports = {
  ourData,
  priceFilter,
  finalFilter,
  priceData,
  generateFilter,
  emailData,
  siteData,
};
