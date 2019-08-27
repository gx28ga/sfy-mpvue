import CONFIG from "./config.js";

const API_BASE_URL = "http://192.168.1.171:8080";

const request = (url, method, data, needSubDomain = true) => {
  // let _url = API_BASE_URL + (needSubDomain ? "/" + CONFIG.subDomain : "") + url;
  let _url = `${API_BASE_URL}${needSubDomain &&
    `/${CONFIG.subDomain}`}${url}  `;

  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: {
        json: JSON.stringify(data)
      },
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

export { login, getMemberInfo, getComboList, submitCombo };
