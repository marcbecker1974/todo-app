const ITEMS = [
  "Turn off alarm clock",
  "Make bed",
  "Take shower",
  "Brush teeth",
  "Shave",
  "Deodorant",
  "Get dressed",
  "Do hair",
  "Take pills",
  "Take vitamins",
  "Check how I am feeling",
  "Drink coffee",
  "Relax for 15 minutes",
  "Pack lunch",
  "Lock the door"
];

const TIERS = {
  RED: "#e63946",
  ORANGE: "#f4a261",
  GREEN: "#2a9d8a"
};

const clockHoursEl = document.getElementById("clockHours");
const clockColonEl = document.getElementById("clockColon");
const clockMinutesEl = document.getElementById("clockMinutes");

const cetTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Berlin",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

function updateClock() {
  const now = new Date();
  const parts = cetTimeFormatter.formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  clockHoursEl.textContent = parts.hour;
  clockMinutesEl.textContent = parts.minute;
  clockColonEl.classList.toggle("clock__colon--dim", Number(parts.second) % 2 === 1);
}

updateClock();
setInterval(updateClock, 1000);

const checklistEl = document.getElementById("checklist");
const progressFillEl = document.getElementById("progressFill");
const progressLabelEl = document.getElementById("progressLabel");
const celebrationEl = document.getElementById("celebration");
const restartBtnEl = document.getElementById("restartBtn");
const themeToggleEl = document.getElementById("themeToggle");

restartBtnEl.addEventListener("click", () => {
  location.reload();
});

themeToggleEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggleEl.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

let state = { checked: [] };

function tierColor(count) {
  if (count >= 10) return TIERS.GREEN;
  if (count >= 5) return TIERS.ORANGE;
  return TIERS.RED;
}

function render() {
  const checkedCount = state.checked.length;
  const remaining = ITEMS.filter((item) => !state.checked.includes(item));

  document.documentElement.style.setProperty("--tier-color", tierColor(checkedCount));

  progressFillEl.style.width = `${(checkedCount / ITEMS.length) * 100}%`;
  progressLabelEl.textContent = `${checkedCount} / ${ITEMS.length} done`;

  checklistEl.innerHTML = "";

  if (remaining.length === 0) {
    checklistEl.classList.add("hidden");
    celebrationEl.classList.remove("hidden");
    return;
  }

  checklistEl.classList.remove("hidden");
  celebrationEl.classList.add("hidden");

  remaining.forEach((item) => {
    const li = document.createElement("li");
    li.className = "checklist__item";

    const checkboxId = `item-${item.replace(/\s+/g, "-")}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checklist__checkbox";
    checkbox.id = checkboxId;

    const label = document.createElement("label");
    label.className = "checklist__label";
    label.setAttribute("for", checkboxId);
    label.textContent = item;

    checkbox.addEventListener("change", () => {
      li.classList.add("removing");
      setTimeout(() => {
        state.checked.push(item);
        render();
      }, 350);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    checklistEl.appendChild(li);
  });
}

render();
