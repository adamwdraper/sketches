(function() {
  class TodoRouter extends a.Router {
    todo() {
      console.log('todo');
    }
  }

  class TodoData extends a.Data {}

  $(document).on('click', '[data-go]', function(event) {
    event.preventDefault();

    todo.go($(this).data('go'));
  });

  const data = new TodoData();
  const router = new TodoRouter({
    root: '/todo',
    routes: {
      '*': 'todo'
    }
  });

  a.router.start();
}());
