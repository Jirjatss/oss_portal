export const formattedDate = (dateOfBirth) => {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedMonth = !isNaN(month)
    ? month.toString().padStart(2, "0")
    : "01";
  const formattedDay = !isNaN(day) ? day.toString().padStart(2, "0") : "01";
  const formattedYear = !isNaN(year) ? year.toString() : "2024";
  const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};
