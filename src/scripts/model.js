// This file contains code for models

import { createCustomElement } from "./utils";

export default class ModelController {
  open(child, title) {
    const backdrop = createCustomElement("div", {
      class:
        "absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur hover:cursor-pointer",
      children: [],
    });

    backdrop.addEventListener("click", (e) => {
      this.close();
    });

    const card = createCustomElement("div", {
      class: "relative bg-white max-w-lg mx-auto mt-4 px-8 py-6 rounded",
      children: [
        createCustomElement("h2", { class: "text-xl", children: [title] }),
        child,
      ],
    });

    const div = createCustomElement("div", {
      class: "modal-in fixed w-screen h-screen z-50",
      children: [backdrop, card],
    });
    console.log("opening model...");
    this.modelElement = div;
    document.body.insertAdjacentElement("afterbegin", div);
  }

  close() {
    this.modelElement.classList.add("modal-out");
    this.modelElement.addEventListener("animationend", (e) => {
      this.modelElement.remove();
    });
  }
}
