const _ = {
  isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }
};

class Framework {
  constructor() {
    this.initCount = 0;

    this.reserved = {
      model: new Set([
        'uid',
        'setup',
        'set',
        'cancel',
        'save'
      ])
    };
  }

  // internal functions

  // api
  getUid(type) {
    this.initCount++;

    return `${type}-${this.initCount}`;
  }
}

const a = new Framework();
