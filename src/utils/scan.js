const scan = () => {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      success(res) {
        resolve(res);
      }
    });
  });
};

export default scan;
