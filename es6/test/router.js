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
    // router.go('/');

    router = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(router).to.be.an('object');
    });
  });

  // describe('routes', function() {
  //   it('should route to function', function() {
  //     router.start();
  //   });
  // });

  describe('fragments', function() {
    it('should generate fragment path', function() {
      router.root = '/';

      expect(router._createFragment('/')).to.equal('/');
      expect(router._createFragment('path')).to.equal('/path');
      expect(router._createFragment('/path')).to.equal('/path');

      router.root = '/root';

      expect(router._createFragment('/')).to.equal('/root');
      expect(router._createFragment('path')).to.equal('/root/path');
      expect(router._createFragment('/path')).to.equal('/root/path');
    });
  });
});
