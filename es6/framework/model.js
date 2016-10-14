class Model {
  constructor(data = {}) {
    this._data = {};
    this._changed = {};
    this._reserved = a.reserved.model;

    this.uid = a.getUid('model');

    // add options
    for (let name in data) {
      this._addAttribute(name, data[name]);

      this._data[name] = data[name];
    }

    this.setup();
  }

  // internal functions
  _addAttribute(name, value) {
    if (!this._reserved.has(name)) {
      if (!this[name]) {
        Object.defineProperty(this, name, {
          get: function() {
            return this._data[name];
          }
        });
      } else {
        throw new Error(`'${name}' is already a property on this model.`);
      }
    } else {
      throw new Error(`'${name}' is reserved property on this model.`);
    }
  }

  // api
  setup() {

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
        throw new Error(`'${property}' is not an attribute of this model.`);
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
