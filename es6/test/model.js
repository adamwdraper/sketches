describe('Model', function() {
  let model;

  beforeEach(function() {
    model = new Model({
      name: 'model',
      greeting: 'hey',
      myMethod: function() {
        return true;
      }
    });
  });

  afterEach(function() {
    model = null;
  });

  describe('properties', function() {
    it('should have a uid', function() {
      expect(model.uid).to.not.be.undefined;
    });

    it('should have a name', function() {
      expect(model.name).to.equal('model');
    });
  });

  describe('methods', function() {
    it('should set properties', function() {
      // set with name and value
      model.set('name', 'John');

      expect(model.name).to.equal('John');

      // set with object
      model.set({
        name: 'Elizabeth',
        greeting: 'hello'
      });

      expect(model.name).to.equal('Elizabeth');
      expect(model.greeting).to.equal('hello');
    });
  });
});
