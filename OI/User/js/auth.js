// setup materialize components
document.addEventListener('DOMContentLoaded', function(){
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

})
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    //var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  })