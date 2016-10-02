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
    this._version = '';
    this.major = 1;
    this.minor = 0;

    Object.defineProperty(this, 'version', {
      get: function() {
        return this._version;
      }
    });

    this.setVersion();
  }

  setVersion() {
    this._version = `${this.major}.${this.minor}`;
  }

  increment(type = 'minor') {
    this[type]++;

    if (type === 'major') {
      this.minor = 0;
    }

    this.setVersion();
  }


}

class Model {
  constructor(options) {
    this._data = {};
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

  set(name, value) {
    this.saveHistory();

    this._data[name] = value;

    this._version.increment();
  }

  save() {
    this._version.increment('major');

    // add some sync functionality
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



model.hey = 'cool';

console.log(model.hey);

console.log(model);
