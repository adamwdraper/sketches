describe('Version', function() {
  let version;

  beforeEach(function() {
    version = new Version();
  });

  afterEach(function() {
    version = null;
  });

  describe('properties', function() {
    it('should have a version', function() {
      expect(version.version).to.equal('1');
    });
  });

  describe('methods', function() {
    it('should increment version', function() {
      version.increment();

      expect(version.version).to.equal('2');
    });

    it('should revert version', function() {
      version.increment();

      expect(version.revert()).to.equal('1');
      expect(version.revert()).to.be.false;
    });
  });
});
