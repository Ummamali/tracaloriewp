// This file contains components for Meal and WOrkouts CRUD

import { createCustomElement } from "./utils";

// Can be used for both MEAL and WORKOUT
export function ItemComponent({ _id, title, calories, _requestdelete }) {
  const deleteButton = createCustomElement("button", {
    children: [
      createCustomElement("i", {
        children: [],
        class: "fa-solid fa-remove",
      }),
    ],
    class: "text-red-600",
  });
  deleteButton.addEventListener("click", (e) => _requestdelete(_id));
  const div = createCustomElement("div", {
    class: "flex items-center justify-between bg-gray-100 py-2 px-4 rounded-sm",
    children: [
      createCustomElement("p", { children: [title], class: "text-gray-800" }),
      createCustomElement("div", {
        class: "flex items-center gap-3",
        children: [
          createCustomElement("p", {
            children: [calories],
            class: "text-gray-700",
          }),
          deleteButton,
        ],
      }),
    ],
  });
  return div;
}
