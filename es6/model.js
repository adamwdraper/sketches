const _ = {
  isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }
};

class Model {
  constructor (options) {
    this.data = {};

    for (let property in options) {
      if (!_.isObject(options[property])) {
        Object.defineProperty(this, property, {
          get: function() {
            return this.data[property];
          },
          set: function (value) {
            // do some change stuff
            console.log(`change:${property}`);

            this.data[property] = value;
          }
        });
      }

      this[property] = options[property];
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



model.hey = 'cool';

console.log(model.data.hey);

console.log(model.myNumber());
