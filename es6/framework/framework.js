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

    return `a${this.initCount}`;
  }
};
