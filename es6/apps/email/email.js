(function() {
  class EmailRouter extends a.Router {
    email() {
      console.log('email');
    }
  }

  $(document).on('click', '[data-go]', function(event) {
    event.preventDefault();

    email.go($(this).data('go'));
  });

  const data = new Data();
  const router = new EmailRouter({
    root: '/email',
    routes: {
      '*': 'email'
    }
  });

  a.router.start();
}());
