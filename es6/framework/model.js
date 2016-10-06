class Model {
  constructor(data) {
    this._data = {};
    this._changed = {};
    this._history = {};

    this.uid = a.getUid();

    // add options
    for (let name in data) {
      this.addAttribute(name, data[name]);

      this._data[name] = data[name];
    }
  }

  addAttribute(name, value) {
    Object.defineProperty(this, name, {
      get: function() {
        return this._data[name];
      }
    });
  }

  set(name, value) {
    let data;
    let options = {};

    if (_.isObject(name)) {
      data = name;
      options = value || options;
    } else {
      data = {
        [name]: value
      };
    }

    for (let property in data) {
      if (property in this._data) {
        if (this._data[property] !== data[property]) {
          if (!this._changed[property]) {
            this._changed[property] = this._data[property];
          }

          this._data[property] = data[property];
        }
      } else {
        // throw an error
      }
    }
  }

  undo() {
    if (Object.keys(this._changed).length) {
      this.set(this._changed);
    }

    this._changed = {};
  }

  save() {
    // so some sync

    this._changed = {};
  }
}
