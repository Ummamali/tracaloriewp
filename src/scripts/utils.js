// Contains all utlity

export function createCustomElement(tagname, { children = [], ...props }) {
  const newEl = document.createElement(tagname);

  for (const [attr, value] of Object.entries(props)) {
    newEl.setAttribute(attr, value);
  }

  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      newEl.appendChild(document.createTextNode(child.toString()));
    } else {
      newEl.appendChild(child);
    }
  }

  return newEl;
}

export function sumNumbers(...numbers) {
  let s = 0;
  numbers.forEach((n) => (s += n));
  return s;
}
