import CONFIG from "./config.js";

// const API_BASE_URL = "http://192.168.3.3:8080";
const API_BASE_URL = "http://218.75.40.91:8008";

const request = (url, method, data, needSubDomain = true) => {
  // let _url = API_BASE_URL + (needSubDomain ? "/" + CONFIG.subDomain : "") + url;
  let _url = `${API_BASE_URL}${needSubDomain && `/${CONFIG.subDomain}`}${url}`;
  console.log(_url);
  let _data = data ? { json: JSON.stringify(data) } : undefined;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: _data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(reponse) {
        resolve(reponse.data);
      },
      fail(error) {
        reject(error);
      },
      complete(data) {
        // 加载完成
      }
    });
  });
};

let login = (username, password) => {
  return request("/login.do?m=login", "post", {
    username,
    password
  });
};

let getMemberInfo = code => {
  return request("/card.do?m=getCode", "post", {
    code
  });
};

let getComboList = (hrId, date) => {
  return request("/card.do?m=getThisWeekMeals", "post", {
    hrId,
    data: date
  });
};

let submitCombo = (date, bizCardNumber, caterTypeId, userId, list) => {
  return request("/card.do?m=weekDiancan", "post", {
    date,
    bizCardNumber,
    caterTypeId,
    userId,
    list
  });
};

let getInspectList = () => {
  return request("/card.do?m=dailyPatrolReportApplyList", "get");
};

let getInspectDetail = id => {
  return request("/card.do?m=dailyPatrolReportApplyDetail", "get", {
    id
  });
};

let getServiceList = code => {
  return request("/card.do?m=nrList", "get", {
    code
  });
};

let submitService = (nursePerson, id, nurseDate) => {
  return request("/card.do?m=service", "get", {
    nursePerson,
    id,
    nurseDate
  });
};

let getActivityList = () => {
  return request("/card.do?m=activity", "get");
};

let signActivity = (hrId, activityId, inOrout, userId) => {
  return request("/card.do?m=activitySign", "get");
};

export {
  API_BASE_URL,
  login,
  getMemberInfo,
  getComboList,
  submitCombo,
  getInspectList,
  getServiceList,
  submitService,
  getActivityList,
  signActivity,
  getInspectDetail
};
