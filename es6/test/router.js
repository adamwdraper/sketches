describe('Router', function() {
  class App extends Router {
    action() {
      console.log('action called');
    }
  }
  let router;

  beforeEach(function() {
    router = new App({

    });

    sinon.stub(router.prototype, 'action');
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
      const paths = {
        '/': '/',
        'path': '/path',
        '/path': '/path',
        '/path/path2': '/path/path2'
      };
      const rootPaths = {
        '/': '/root',
        'path': '/root/path',
        '/path': '/root/path',
        '/path/path2': '/root/path/path2'
      };

      // test with / as root
      router.root = '/';
      for (let path in paths) {
        expect(router._createFragment(path)).to.equal(paths[path]);
      }

      // test with a root
      router.root = '/root';
      for (let path in rootPaths) {
        expect(router._createFragment(path)).to.equal(rootPaths[path]);
      }
    });
  });
});
