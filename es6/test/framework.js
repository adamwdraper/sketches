describe('Framework', function() {
  describe('_', function() {
    it('should check for Object', function() {
      const o = {
        name: 'o'
      };
      const s = '';

      expect(_.isObject(o)).to.be.true;
      expect(_.isObject(s)).to.be.false;
    });
  });

  describe('methods', function() {
    it('should be an object', function() {
      expect(_.isObject(a)).to.be.true;
    });

    it('should generate unique ids', function() {
      const uId = a.getUid('model');
      const uId2 = a.getUid('model');

      expect(uId).to.equal('model-1');
      expect(uId2).to.equal('model-2');
    });
  });
});
