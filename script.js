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

const checklistEl = document.getElementById("checklist");
const progressFillEl = document.getElementById("progressFill");
const progressLabelEl = document.getElementById("progressLabel");
const celebrationEl = document.getElementById("celebration");
const restartBtnEl = document.getElementById("restartBtn");

restartBtnEl.addEventListener("click", () => {
  location.reload();
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
