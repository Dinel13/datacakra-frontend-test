export const dateSQLtoDate = (date: string) => {
  const dateObj = new Date(date);
  let day = dateObj.getDate();
  let month = dateObj.toLocaleString("default", { month: "long" });
  let daystr = day.toString();
  if (day < 10) {
    daystr = `0${day}`;
  }
  return `${dateObj.getFullYear()}-${month}-${daystr}`;
};