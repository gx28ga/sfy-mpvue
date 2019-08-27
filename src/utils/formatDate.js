import formatNumber from "./formatNumber";

const formatFullDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
};

export default formatFullDate;
