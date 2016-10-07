describe('Router', function() {
  class App extends Router {
    action() {
      console.log('action called');
    }
  }
  let router;

  beforeEach(function() {
    router = new App();
  });

  afterEach(function() {
    router = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(router).to.be.an('object');
    });
  });

  describe('routes', function() {
    it('should route to function', function() {
      router.start();
    });
  });
});
