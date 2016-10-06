describe('Router', function() {
  let router;

  beforeEach(function() {
    router = new Router();
  });

  afterEach(function() {
    router = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(router).to.be.an('object');
    });
  });
});
