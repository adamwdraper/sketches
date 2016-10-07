describe('Model', function() {
  class Musician extends Model {
    fullName() {
      return `${this.name.first} ${this.name.last}`;
    }
  }
  let adam;

  beforeEach(function() {
    adam = new Musician({
      name: {
        first: 'Adam',
        last: 'Jones'
      },
      instrument: 'Guitar',
      gear: [
        'Diezel VH4',
        'Gibson Les Paul Silverburst'
      ]
    });
  });

  afterEach(function() {
    adam = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(adam).to.be.an('object');
    });
  });

  describe('extension', function() {
    it('should extend', function() {
      expect(adam.fullName()).to.equal('Adam Jones');
    });
  });

  describe('properties', function() {
    it('should have a uid', function() {
      expect(adam.uid).to.not.be.undefined;
    });

    it('should get attributes', function() {
      expect(adam.name.first).to.equal('Adam');
      expect(adam.instrument).to.equal('Guitar');
      expect(adam.gear.length).to.be.above(0);
    });
  });

  describe('methods', function() {
    it('should set properties with name and value', function() {
      adam.set('instrument', 'Synth');

      expect(adam.instrument).to.equal('Synth');
    });

    it('should set properties with object', function() {
      adam.set({
        name: {
          first: 'Justin',
          last: 'Chancelor'
        },
        instrument: 'Bass'
      });

      expect(adam.name.first).to.equal('Justin');
      expect(adam.instrument).to.equal('Bass');
    });

    it('should undo changes', function() {
      adam.set('name', 'Danny');
      adam.set('instrument', 'drums');

      adam.undo();

      expect(adam.name.first).to.equal('Adam');
      expect(adam.instrument).to.equal('Guitar');
    });
  });
});
