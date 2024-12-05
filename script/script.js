"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const deadline = new Date("2025-01-01T00:00:00Z"); // Дедлайн в формате UTC

  function getTimeDifference(endtime) {
    const now = new Date();
    const timezoneOffsetInMs = now.getTimezoneOffset() * 60000; // Смещение временной зоны в миллисекундах
    const localTime = now.getTime() - timezoneOffsetInMs; // Локальное время в миллисекундах

    const timeDiff = endtime - localTime;

    if (timeDiff <= 0) {
      return "С Новым годом!";
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      return {
        total: timeDiff,
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
          container = document.querySelector(".timer");

    let timerId = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeDifference(endtime);
      if (typeof t === 'object') {
        days.textContent = setZero(t.days);
        hours.textContent = setZero(t.hours);
        minutes.textContent = setZero(t.minutes);
        seconds.textContent = setZero(t.seconds);
      } else {
        container.innerHTML = `<h2>${t}</h2>`;
        clearInterval(timerId); // Остановка таймера после достижения дедлайна
      }
    }
  }

  setClock(deadline);
});