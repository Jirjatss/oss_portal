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

export const appointmentDateFormatter = (inputDate) => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const date = inputDate.getDate().toString().padStart(2, "0");
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const seconds = inputDate.getSeconds().toString().padStart(2, "0");
  const milliseconds = inputDate.getMilliseconds().toString().padStart(3, "0");

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export const minDateAppointment = () => {
  const today = new Date();
  const minDate = today;
  const dateObj = new Date(minDate);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formattedDateAppointment = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}, ${dayOfMonth} ${month} ${year}`;
};

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate.replace("at", "").trim();
};
