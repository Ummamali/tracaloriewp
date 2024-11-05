import { createCustomElement } from "./utils";

export function AddMealModel(addMeal) {
  // form groups below
  const titleFG = createCustomElement("div", {
    children: [
      createCustomElement("label", {
        for: "meal-title",
        children: ["Title"],
        class: "text-sm text-gray-700",
      }),
      createCustomElement("input", {
        id: "meal-title",
        type: "text",
        class: "my-input",
      }),
    ],
  });
  const caloriesFG = createCustomElement("div", {
    children: [
      createCustomElement("label", {
        for: "meal-calories",
        children: ["Calories"],
        class: "text-sm text-gray-700",
      }),
      createCustomElement("input", {
        id: "meal-calories",
        type: "text",
        class: "my-input",
      }),
    ],
  });

  const addBtn = createCustomElement("button", {
    children: ["Add Meal"],
    class: "btn bg-green-600",
    type: "submit",
  });

  const form = createCustomElement("form", {
    children: [titleFG, caloriesFG, addBtn],
    class: "space-y-4",
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      title: document.getElementById("meal-title").value,
      calories: parseInt(document.getElementById("meal-calories").value),
    };
    if (formData.title && formData.calories) {
      addMeal(formData);
    } else {
      alert("Invalid Values!!!");
    }
  });
  return form;
}

export function AddWorkoutModel(addWorkout) {
  // form groups below
  const titleFG = createCustomElement("div", {
    children: [
      createCustomElement("label", {
        for: "workout-title",
        children: ["Title"],
        class: "text-sm text-gray-700",
      }),
      createCustomElement("input", {
        id: "workout-title",
        type: "text",
        class: "my-input",
      }),
    ],
  });
  const caloriesFG = createCustomElement("div", {
    children: [
      createCustomElement("label", {
        for: "workout-calories",
        children: ["Calories"],
        class: "text-sm text-gray-700",
      }),
      createCustomElement("input", {
        id: "workout-calories",
        type: "text",
        class: "my-input",
      }),
    ],
  });

  const addBtn = createCustomElement("button", {
    children: ["Add Workout"],
    class: "btn bg-green-600",
    type: "submit",
  });

  const form = createCustomElement("form", {
    children: [titleFG, caloriesFG, addBtn],
    class: "space-y-4",
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      title: document.getElementById("workout-title").value,
      calories: parseInt(document.getElementById("workout-calories").value),
    };
    if (formData.title && formData.calories) {
      addWorkout(formData);
    } else {
      alert("Invalid Values!!!");
    }
  });
  return form;
}

export function SetDailyLimitModel(setLimitTo) {
  // form groups below
  const limitFG = createCustomElement("div", {
    children: [
      createCustomElement("label", {
        for: "daily-limit-input",
        children: ["New Limit"],
        class: "text-sm text-gray-700",
      }),
      createCustomElement("input", {
        id: "daily-limit-input",
        type: "text",
        class: "my-input",
      }),
    ],
  });

  const addBtn = createCustomElement("button", {
    children: ["Set Limit"],
    class: "btn bg-green-600",
    type: "submit",
  });

  const form = createCustomElement("form", {
    children: [limitFG, addBtn],
    class: "space-y-4",
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      limit: parseInt(document.getElementById("daily-limit-input").value),
    };
    if (formData.limit) {
      setLimitTo(formData.limit);
    } else {
      alert("Invalid Values!!!");
    }
  });
  return form;
}
