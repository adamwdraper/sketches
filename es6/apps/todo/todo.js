(function() {
  class Todo extends Router {
    todo() {
      
    }
  }

  $(document).on('click', '[data-go]', function(event) {
    event.preventDefault();

    todo.go($(this).data('go'));
  });

  const todo = new Todo({
    root: '/todo',
    routes: {
      '*': 'todo'
    }
  });

  todo.start();
}());
