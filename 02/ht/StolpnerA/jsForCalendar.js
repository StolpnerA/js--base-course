let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let $$ = text => document.querySelector(text);

(function init() {
  $$(".back").addEventListener("click", back);
  $$(".next").addEventListener("click", next);
  drawInteractiveCalendar(year, month);
})();

function drawInteractiveCalendar(year, month) {
  let d = new Date(year, month - 1);
  let mon = month - 1;
  let table =
    "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";
  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }
  while (d.getMonth() === mon) {
    table += `<td>${d.getDate()}</td>`;
    if (d.getDay() === 0) {
      table += "</tr><tr>";
    }
    d.setDate(d.getDate() + 1);
  }

  table += "</tr></table>";
  $$("#calendar").innerHTML = table;
  $$("#info").innerHTML = month + " / " + year;
}
function getDay(d) {
  let day = d.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
}

function back() {
  --month;
  check();
}
function next() {
  ++month;
  check();
}
function check() {
  if (month === 13) {
    ++year;
    month = 1;
  } else if (month === 0) {
    --year;
    month = 12;
  }
  return drawInteractiveCalendar(year, month);
}
