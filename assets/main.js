import data from "./data.js";

const mainContainer = document.querySelector("main");
var buttons = document.querySelectorAll(".time--button");
var timeframe, activeButton;

function main() {
    const url = new URL(window.location);
    timeframe = url.searchParams.get("timeframe");
    if (
        timeframe !== "daily" &&
        timeframe !== "weekly" &&
        timeframe !== "monthly"
    ) {
        timeframe = "weekly";
    }
    activeButton = document.querySelector(`button[value=${timeframe}]`);
    activeButton.classList.add("active");
    loadData();
}

function loadData() {
    const template = document.getElementById("cardTemplate");
    data.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const wrapper = clone.querySelector("article");
        const heading = clone.querySelector("h2");

        wrapper.classList.add(
            `${item.title.toLowerCase().replace(" ", "-")}--background`
        );
        heading.textContent = item.title;
        updateCardData(clone, undefined, item, "item");
        mainContainer.appendChild(clone);
    });
}

function updateData() {
    const articles = document.querySelectorAll("article");
    articles.forEach((art, index) => {
        updateCardData(art, index, undefined, "index");
    });
}

function getCurrentTimeLabel(timeframe) {
    let result =
        timeframe == "daily"
            ? "Yesterday"
            : timeframe == "weekly"
            ? "Last Week"
            : "Last Month";
    return result;
}

function updateCardData(wrapper, index, item, focus = "index") {
    let obj = focus == "index" ? data[index] : item;
    const timeSpent = wrapper.querySelector(".time--elapsed");
    const lastTimeLabel = wrapper.querySelector(".time--duration");
    const lastTimeSpent = wrapper.querySelector(".last-time-spent");
    const { current, previous } = obj.timeframes[timeframe];

    timeSpent.textContent = current + "hrs";
    timeSpent.setAttribute("datetime", getDatetimeAttr(current));
    lastTimeLabel.textContent = getCurrentTimeLabel(timeframe);
    lastTimeLabel.setAttribute("datetime", getDatetimeAttr(current));
    lastTimeSpent.textContent = previous + "hrs";
}

function getDatetimeAttr(timeInHours) {
    return "PT" + timeInHours + "H";
}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // if they clicked the same btn
        // it won't re-render
        if (btn === activeButton) {
            return;
        }
        activeButton.classList.remove("active");
        btn.classList.add("active");
        activeButton = btn;
        timeframe = e.target.value;

        const url = new URL(window.location);
        url.searchParams.set("timeframe", timeframe);
        window.history.pushState({ timeframe }, "", url);
        updateData();
    });
});

main();
