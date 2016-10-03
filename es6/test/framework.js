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
      const uId = a.getUid();
      const uId2 = a.getUid();

      expect(uId).to.equal('a1');
      expect(uId2).to.equal('a2');
    });
  });
});
