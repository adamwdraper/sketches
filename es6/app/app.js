(function(){
  class App extends Router {
    setup() {
      super.start();
    }

    one() {
      console.log('one');
    }

    two(id) {
      console.log('two', id ? id : '');
    }

    three() {
      console.log('three');
    }

    four() {
      console.log('four');
    }

    notFound() {
      console.log('not found');
    }
  }

  $(document).on('click', '[data-go]', function(event) {
    event.preventDefault();

    app.go($(this).data('go'));
  });

  const app = new App({
    root: '/index',
    routes: {
      '/one': 'one',
      '/two(/:id)': 'two',
      '/three': 'three',
      '/^\/f/': 'four',
      '*': 'notFound'
    }
  });

}());
