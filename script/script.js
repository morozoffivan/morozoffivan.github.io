"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const deadline = "2025-01-01";

  function getTimeDeference(endtime) {
    const timeDef = Date.parse(endtime) - Date.parse(new Date());
    if (timeDef <= 0) {
      return "С новым Годом!";
    } else {
      const days = Math.floor(timeDef / (1000 * 60 * 60 * 24)),
        hours = Math.floor((timeDef / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((timeDef / (1000 * 60)) % 60),
        seconds = Math.floor((timeDef / 1000) % 60);
      return {
        timeDef,
        days,
        hours,
        minutes,
        seconds,
      };
    }
  }

  function setZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(endtime) {
    const days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      container = document.querySelector(".timer"),
      timerId = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeDeference(endtime);
      if (typeof t == "object") {
        days.innerHTML = setZero(t.days);
        hours.innerHTML = setZero(t.hours);
        minutes.innerHTML = setZero(t.minutes);
        seconds.innerHTML = setZero(t.seconds);
      } else {
        container.innerHTML = `<h2>${t}</h2>`;
      }

      if (endtime <= 0) {
        clearInterval(timerId);
      }
    }
  }

  setClock(deadline);
});
