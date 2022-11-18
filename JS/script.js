"use strict";
import dataArr from "../data.json" assert { type: "json" };

const dayArr = [];
const day = whatDay(dataArr);
const isTouchDevice = "ontouchstart" in document.documentElement;
console.log(isTouchDevice);
const chartBox = document.querySelector(".chart-box");
chartBox.insertAdjacentHTML("afterbegin", `<div class="chart-div"></div>`);
const chartDiv = document.querySelector(".chart-div");

/* ------ Retrieve Day Fn ------- */
function whatDay(dataArr) {
  dataArr.forEach(function (data) {
    const { day } = data;
    dayArr.push(day);
  });
  const sun = dayArr.pop();
  dayArr.unshift(sun);

  return dayArr[new Date().getDay()];
}
/* --- Inserting a div ----- */
dataArr.forEach(function (data, index) {
  const active = data.day === day ? `chart--active` : `chart-ele`;
  const htmlChart = `
  <div class="chart ${active}" style=" height:${data.amount * 2}px;">
  <span>$${data.amount}</span>
  </div>`;
  chartDiv.insertAdjacentHTML("beforeend", htmlChart);
});

/* --- Inserting the chart elements ---- */
const chartElems = document.querySelectorAll(".chart");
chartElems.forEach(function (chartEl) {
  if (isTouchDevice) {
    touchEventFun(chartEl);
  }
  chartEl.addEventListener("mouseover", () => {
    chartEl.classList.add("chart-hover");
  });
  chartEl.addEventListener("mouseout", () => {
    chartEl.classList.remove("chart-hover");
  });
});

/* --- Touch Screen Events ---- */
function touchEventFun(chart) {
  chart.addEventListener("touchstart", () => {
    chart.classList.add("chart-hover");
  });
  chart.addEventListener("touchend", () => {
    chart.classList.add("chart-hover");
  });
}

/* --- Inserting the day elements --- */
chartBox.insertAdjacentHTML("beforeend", `<div class="day-div"></div>`);
const dayDiv = document.querySelector(".day-div");
dataArr.forEach(function (data) {
  // const today = data.day === day ? `day--active` : `day`;
  const htmlDay = `<p class="${data.day}-ele">${data.day}</p>`;
  dayDiv.insertAdjacentHTML("beforeend", htmlDay);
});
