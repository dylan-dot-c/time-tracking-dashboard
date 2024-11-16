import data from "./data.js";

const mainContainer = document.querySelector("main");
let timeframe = "weekly";
let activeButton = document.querySelector(`button[value=${timeframe}]`);
activeButton.classList.add("active");
const buttons = document.querySelectorAll(".time--button");

function loadData(timeframe) {
    const template = document.getElementById("cardTemplate");
    data.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const wrapper = clone.querySelector("article");
        wrapper.classList.add(
            `${item.title.toLowerCase().replace(" ", "-")}--background`
        );
        const heading = clone.querySelector("h2");
        heading.textContent = item.title;
        const timeSpent = clone.querySelector(".time--elapsed");
        timeSpent.textContent = item.timeframes[timeframe].current + "hrs";
        const lastTimeLabel = clone.querySelector(".time--duration");
        lastTimeLabel.textContent =
            timeframe == "daily"
                ? "Yesterday"
                : timeframe == "weekly"
                ? "Last Week"
                : "Last Month";
        const lastTimeSpent = clone.querySelector(".last-time-spent");
        lastTimeSpent.textContent = item.timeframes[timeframe].previous + "hrs";
        mainContainer.appendChild(clone);
    });
}

function updateData() {
    const articles = document.querySelectorAll("article");
    articles.forEach((art, index) => {
        const timeSpent = art.querySelector(".time--elapsed");
        timeSpent.textContent =
            data[index].timeframes[timeframe].current + "hrs";
        const lastTimeLabel = art.querySelector(".time--duration");
        lastTimeLabel.textContent =
            timeframe == "daily"
                ? "Yesterday"
                : timeframe == "weekly"
                ? "Last Week"
                : "Last Month";
        const lastTimeSpent = art.querySelector(".last-time-spent");
        lastTimeSpent.textContent =
            data[index].timeframes[timeframe].previous + "hrs";
    });
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // if they clicked the same btn
        // it won't re-render
        if (btn === activeButton) {
            return;
        }

        if (activeButton) {
            activeButton.classList.remove("active");
        }
        btn.classList.add("active");
        activeButton = btn;
        timeframe = e.target.value;
        updateData();
    });
});

loadData(timeframe);
