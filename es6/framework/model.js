class Model {
  constructor(data = {}) {
    this._data = {};
    this._changed = {};
    this._reserved = a.reserved.model;
    this._statuses = a.statuses.model;
    this._status = 'new';

    this.uid = a.getUid('model');
    this.is = {};

    for (let status of this._statuses) {
      this._addIs(status);
    }

    this.set(data, {
      init: true
    });

    this.setup();
  }

  // internal functions
  _addAttribute(name) {
    if (!this._reserved.has(name)) {
      if (!this[name]) {
        Object.defineProperty(this, name, {
          get: function() {
            return this._data[name];
          },
          set: function(value) {
            this.set({
              [name]: value
            });
          }
        });
      } else {
        throw new Error(`'${name}' is already a property on this model.`);
      }
    } else {
      throw new Error(`'${name}' is reserved property on this model.`);
    }
  }

  _addIs(status) {
    Object.defineProperty(this.is, status, {
      get: () => {
        return this._status === status;
      }
    });
  }

  // api
  setup() {

  }

  set(data = {}, options = {}) {
    for (let property in data) {
      if (!(property in this._data)) {
        this._addAttribute(property);
      }

      if (this._data[property] !== data[property]) {
        if (!this._changed[property]) {
          this._changed[property] = this._data[property];

          if (options.init !== true) {
            this._status = 'changed';
          }
        }

        this._data[property] = data[property];
      }
    }
  }

  cancel() {
    if (Object.keys(this._changed).length) {
      this.set(this._changed);
    }

    this._changed = {};
  }

  save() {
    // so some sync

    this._changed = {};

    this._status = 'saved';
  }

  is() {
    return
  }
}
