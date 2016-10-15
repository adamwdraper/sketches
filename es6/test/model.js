describe('Model', function() {
  class Musician extends Model {
    fullName() {
      return `${this.name.first} ${this.name.last}`;
    }
  }
  let adam;

  beforeEach(function() {
    adam = new Musician({
      id: '1',
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

  describe('statuses', function() {
    it('should have status', function() {
      expect(adam.is.new).to.be.true;
      expect(adam.is.changed).to.be.false;

      adam.instrument = 'Synth';

      expect(adam.is.changed).to.be.true;
      expect(adam.is.saved).to.be.false;

      adam.save();

      expect(adam.is.saved).to.be.true;
      expect(adam.is.new).to.be.false;
    });
  });

  describe('properties', function() {
    it('should have ids', function() {
      expect(adam.uid).to.not.be.undefined;
      expect(adam.id).to.equal('1');
    });

    it('should get attributes', function() {
      expect(adam.name.first).to.equal('Adam');
      expect(adam.instrument).to.equal('Guitar');
      expect(adam.gear.length).to.be.above(0);
    });

    it('should set attributes', function() {
      adam.name = {
        first: 'Justin',
        last: 'Chancellor'
      };
      adam.instrument = 'Bass';

      expect(adam.name.first).to.equal('Justin');
      expect(adam.instrument).to.equal('Bass');
    });
  });

  describe('methods', function() {
    it('should set properties with object', function() {
      adam.set({
        name: {
          first: 'Justin',
          last: 'Chancellor'
        },
        instrument: 'Bass'
      });

      expect(adam.name.first).to.equal('Justin');
      expect(adam.instrument).to.equal('Bass');
    });

    it('should undo changes', function() {
      adam.name = 'Danny';
      adam.instrument = 'drums';

      adam.cancel();

      expect(adam.name.first).to.equal('Adam');
      expect(adam.instrument).to.equal('Guitar');
    });
  });
});
