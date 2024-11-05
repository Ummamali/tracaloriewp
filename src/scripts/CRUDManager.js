export default class CRUDManager {
  constructor(crudName, UIContainer, UIComponent, changeHandler = null) {
    this.name = crudName;
    this._items = [];
    this.UIContainer = UIContainer;
    this.UIComponent = UIComponent;
    this.changeHandler = changeHandler;
    this.currentID = 0;
  }

  saveToLS() {
    localStorage.setItem(`CRUD-${this.name}`, JSON.stringify(this._items));
  }

  loadFromLS() {
    const lsItems = localStorage.getItem(`CRUD-${this.name}`);
    if (lsItems !== null) {
      this._items = JSON.parse(lsItems);
      const highestId =
        this._items.length > 0
          ? Math.max(...this._items.map((item) => item._id))
          : -1;
      this.currentID = highestId + 1;
    }
  }

  renderAllItems() {
    this._items.forEach((item) => {
      const el = this.UIComponent({
        ...item,
        _requestdelete: (id) => this.delete(id),
      });
      el.setAttribute("data-id", item._id);
      this.UIContainer.appendChild(el);
    });
  }

  loadAndRenderAll() {
    this.loadFromLS();
    this.renderAllItems();
  }

  create(newItem, updateUI = true, updateLS = true) {
    newItem._id = this.currentID;
    this._items.push(newItem);
    this.currentID += 1;
    if (updateUI) {
      const el = this.UIComponent({
        ...newItem,
        _requestdelete: (id) => this.delete(id),
      });
      el.setAttribute("data-id", newItem._id);
      el.classList.add("crud-item-in");
      this.UIContainer.appendChild(el);
    }

    if (updateLS) {
      this.saveToLS();
    }

    if (this.changeHandler) {
      this.changeHandler();
    }
  }

  delete(itemId, updateUI = true, updateLS = true) {
    const itemIdx = this._items.findIndex((it) => it._id === itemId);
    this._items.splice(itemIdx, 1);

    if (updateUI) {
      const targetEl = this.UIContainer.querySelector(
        `div[data-id="${itemId}"]`
      );
      targetEl.classList.add("crud-item-out");
      targetEl.addEventListener("animationend", (e) =>
        this.UIContainer.removeChild(targetEl)
      );
    }

    if (updateLS) {
      this.saveToLS();
    }

    if (this.changeHandler) {
      this.changeHandler();
    }
  }

  deleteAll(updateUI = true, updateLS = true) {
    this._items = [];
    this.currentID = 0;

    if (updateUI) {
      while (this.UIContainer.firstChild) {
        this.UIContainer.removeChild(this.UIContainer.firstChild);
      }
    }

    if (updateLS) {
      this.saveToLS();
    }
  }

  search(q, attributeGetter, updateDOM = true) {
    const filteredItems = this._items.filter((item) =>
      attributeGetter(item).toLowerCase().includes(q.toLowerCase())
    );
    if (updateDOM) {
      // clearing the dom
      while (this.UIContainer.firstChild) {
        this.UIContainer.removeChild(this.UIContainer.firstChild);
      }

      // appending children
      filteredItems.forEach((item) => {
        const el = this.UIComponent({
          ...item,
          _requestdelete: (id) => this.delete(id),
        });
        el.setAttribute("data-id", item._id);
        this.UIContainer.appendChild(el);
      });
    }
  }

  get items() {
    return this._items;
  }

  set items(value) {
    console.warn("Invalid Operation! Cannot set values for CRUD");
  }
}
