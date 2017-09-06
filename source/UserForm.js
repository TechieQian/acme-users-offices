$('#addUser').on('click', function(){
  let node = $(this).siblings('input')
  $.post('/users', { name : node.val() })
  .then(()=> {
    node.val('')
    renderUser()
  })
})
