function formatDate(dateString) {
  const date = new Date(dateString);

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Format hours and minutes to always be two digits
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Get day, month, and year
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Format day and month to always be two digits
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${hours}h${minutes} ${day}/${month}/${year}`;
}
module.exports = formatDate;
