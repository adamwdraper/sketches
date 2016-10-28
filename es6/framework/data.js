class Data {
  constructor(options = {}) {
    this._register();
    
    this.setup();
  }

  // internal functions
  _register() {
    if (a.data) {
      throw new Error('Only one data can be registered.');
    } else {
      a.data = this;
    }
  }

  // api
  setup() {

  }
}

// attach to framework
a.Data = Data;
