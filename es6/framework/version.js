class Version {
  constructor() {
    this._version = 1;

    Object.defineProperty(this, 'version', {
      get: function() {
        return String(this._version);
      }
    });
  }

  increment() {
    this._version++;
  }

  revert() {
    const next = this._version > 1 ? this._version-- : false;

    return next ? this.version : false;
  }
}
