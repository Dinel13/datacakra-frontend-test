export const dateSQLtoDateInput = (date : string) => {
   const dateObj = new Date(date);
   let day = dateObj.getDate();
   let month = dateObj.getMonth() + 1;
   let daystr = day.toString();
   let monthstr = month.toString();
   if (month < 10) {
     monthstr = `0${month}`;
   }
   if (day < 10) {
     daystr = `0${day}`;
   }
   return `${dateObj.getFullYear()}-${monthstr}-${daystr}`;
 };