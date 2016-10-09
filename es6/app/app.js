(function(){
  class App extends Router {
    one() {
      console.log('one');
    }

    two() {
      console.log('two');
    }

    three() {
      console.log('three');
    }
  }

  const app = new App({
    root: '/index',
    routes: {
      '/one': 'one',
      '/two': 'two',
      '/three': 'three'
    }
  });

  $(document).on('click', '[data-go]', function(event) {
    event.preventDefault();

    app.go($(this).data('go'));
  });

  app.start();
}());
