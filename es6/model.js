const _ = {
  isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }
};

const a = {
  initCount: 0,
  getUid() {
    this.initCount++;

    return `a-${this.initCount}`;
  }
};

class Version {
  constructor() {
    this._version = 1;

    Object.defineProperty(this, 'version', {
      get: function() {
        return this._version;
      }
    });
  }

  increment(type = 'minor') {
    this._version++;
  }

  revert() {
    return this._version > 1 ? this._version-- : undefined;
  }
}

class Model {
  constructor(options) {
    this._data = {};
    this._state = {
      hasChanges: false
    };
    this._history = {};
    this._version = new Version();

    this.uid = a.getUid();

    Object.defineProperty(this, 'version', {
      get: function() {
        return this._version.version;
      }
    });

    for (let name in options) {
      if (!_.isObject(options[name])) {
        this.addAttribute(name, options[name]);

        this._data[name] = options[name];
      } else {
        this[name] = options[name];
      }
    }

    this.saveHistory();
  }

  addAttribute(name, value) {
    Object.defineProperty(this, name, {
      get: function() {
        return this._data[name];
      }
    });
  }

  saveHistory() {
    this._history[this.version] = this._data;
  }

  undo() {
    const previous = this._version.revert();

    if (previous) {
      this.set(this._history[previous]);

      delete this._history[previous];
    }
  }

  set(name, value) {
    const attributes = _.isObject(name) ? name : {
      name: value
    };
    let hasChanges = false;

    this.saveHistory();

    for (let property in attributes) {
      if (property in this._data) {
        if (this._data[property] !== name[property]) {
          this._data[property] = name[property];

          hasChanges = true;
        }
      } else {
        // throw an error
      }
    }

    if (hasChanges) {
      this._state.hasChanges = hasChanges;

      this._version.increment();
    }
  }
}

const hey = "hey";
const model = new Model({
  hey,
  me: '2',
  myNumber() {
    return this.me;
  }
});

console.log(model);
