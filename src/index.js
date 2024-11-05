import ModelController from "./scripts/model";
import CRUDManager from "./scripts/CRUDManager";
import { ItemComponent } from "./scripts/CRUDComponents";
import { sumNumbers } from "./scripts/utils";
import {
  SetDailyLimitModel,
  AddMealModel,
  AddWorkoutModel,
} from "./scripts/ModelComponents";

import "./styles/styles.css";
import "./styles/animations.css";
import "./styles/twoutput.css";

class MainController {
  constructor() {
    // The major elements in this application
    this.elements = {
      setDailyLimit: document.getElementById("set-daily-limit"),
      resetDay: document.getElementById("reset-day"),
      dailyLimit: document.getElementById("daily-limit"),
      netGain: document.getElementById("net-gain"),
      caloriesConsumed: document.getElementById("calories-consumed"),
      caloriesBurned: document.getElementById("calories-burned"),
      caloriesRemaining: document.getElementById("calories-remaining"),
      progress: document.getElementById("progress"),
      progressText: document.getElementById("progress-percentage"),
      addMealBtn: document.getElementById("add-meal"),
      addWorkoutBtn: document.getElementById("add-workout"),
      searchMeal: document.getElementById("search-meal"),
      searchWorkout: document.getElementById("search-workout"),
    };
    // model controller
    this.model = new ModelController();

    // properties, the state of the application
    this.state = { dailyLimit: 1000 };

    // The two major CRUDs
    this.mealsCRUD = new CRUDManager(
      "meals",
      document.getElementById("meals-list"),
      ItemComponent,
      () => this.updateBannerDOM()
    );
    this.workoutCRUD = new CRUDManager(
      "workout",
      document.getElementById("workout-list"),
      ItemComponent,
      () => this.updateBannerDOM()
    );
  }

  saveStateToLS() {
    localStorage.setItem("APP-state", JSON.stringify(this.state));
  }

  loadStateFromLS() {
    const newSt = localStorage.getItem("APP-state");
    if (newSt) {
      this.state = JSON.parse(newSt);
    }
  }

  updateBannerDOM() {
    const consumedCalories = sumNumbers(
      ...this.mealsCRUD.items.map((x) => x.calories)
    );
    const burnedCalories = sumNumbers(
      ...this.workoutCRUD.items.map((x) => x.calories)
    );
    const netGain = consumedCalories - burnedCalories;

    this.elements.dailyLimit.innerText = this.state.dailyLimit;
    this.elements.caloriesConsumed.innerText = consumedCalories;
    this.elements.caloriesBurned.innerText = burnedCalories;
    this.elements.netGain.innerText = netGain;
    this.elements.caloriesRemaining.innerText =
      netGain <= this.state.dailyLimit
        ? this.state.dailyLimit - netGain
        : "Passed Limit";

    if (netGain < 0) {
      this.elements.progress.style.width = "0%";
      this.elements.progressText.style.color = `#444`;
      this.elements.progressText.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> You have negative gain`;
    } else if (netGain >= 0 && netGain <= this.state.dailyLimit) {
      const percentage =
        this.state.dailyLimit > 0 ? (netGain * 100) / this.state.dailyLimit : 0;
      this.elements.progress.style.backgroundColor = `green`;
      this.elements.progressText.style.color = `#444`;
      this.elements.progress.style.width = `${percentage}%`;
      this.elements.progressText.innerText = `${parseInt(percentage)}%`;
    } else {
      const percentage = (netGain * 100) / this.state.dailyLimit;
      this.elements.progress.style.width = `100%`;
      this.elements.progress.style.backgroundColor = `red`;
      this.elements.progressText.innerText = `${parseInt(percentage)}%`;
      this.elements.progressText.style.color = `red`;
    }
  }

  setDailyLimit(limit, saveToLS = true, updateDOM = true) {
    this.state.dailyLimit = limit;
    if (updateDOM) {
      this.updateBannerDOM();
    }
    if (saveToLS) {
      this.saveStateToLS();
    }
  }

  initCRUDSAndState() {
    this.loadStateFromLS();
    // first of all, loading the state
    this.mealsCRUD.loadAndRenderAll();
    this.workoutCRUD.loadAndRenderAll();
  }

  initListeners() {
    // adds the event listeners and other stuff
    this.elements.setDailyLimit.addEventListener("click", (e) => {
      this.model.open(
        SetDailyLimitModel((newLimit) => {
          this.setDailyLimit(newLimit);
          this.model.close();
        }),
        "Set Daily Limit"
      );
    });

    this.elements.resetDay.addEventListener("click", (e) => {
      this.mealsCRUD.deleteAll();
      this.workoutCRUD.deleteAll();
      this.setDailyLimit(0);
    });

    // To add meal item
    this.elements.addMealBtn.addEventListener("click", (e) => {
      this.model.open(
        AddMealModel((mealObj) => {
          this.mealsCRUD.create(mealObj);
          this.model.close();
        }),
        "Add Meal"
      );
    });
    // To add workout item
    this.elements.addWorkoutBtn.addEventListener("click", (e) => {
      this.model.open(
        AddWorkoutModel((wObj) => {
          this.workoutCRUD.create(wObj);
          this.model.close();
        }),
        "Add Workout"
      );
    });

    // To search for meals and show all if q is empty, show all
    this.elements.searchMeal.addEventListener("change", (e) => {
      this.mealsCRUD.search(e.target.value, (x) => x.title);
    });
    this.elements.searchMeal.addEventListener("input", (e) => {
      if (e.target.value === "") {
        this.mealsCRUD.search(e.target.value, (x) => x.title);
      }
    });

    // To search for meals and show all if q is empty, show all
    this.elements.searchWorkout.addEventListener("change", (e) => {
      this.workoutCRUD.search(e.target.value, (x) => x.title);
    });
    this.elements.searchWorkout.addEventListener("input", (e) => {
      if (e.target.value === "") {
        this.workoutCRUD.search(e.target.value, (x) => x.title);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const ctrl = new MainController();
  ctrl.initCRUDSAndState();
  ctrl.updateBannerDOM();
  ctrl.initListeners();
});
