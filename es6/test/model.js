describe('Model', function() {
  let model;

  beforeEach(function() {
    model = new Model({
      name: 'Model',
      greeting: 'Hey',
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
      expect(model.name).to.equal('Model');
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
        greeting: 'Hello'
      });

      expect(model.name).to.equal('Elizabeth');
      expect(model.greeting).to.equal('Hello');
    });

    it('should undo changes', function() {
      model.set('name', 'John');

      expect(model.name).to.equal('John');

      model.undo();

      expect(model.name).to.equal('Model');
    });
  });
});
