$('#addUser').on('click', function(){
  let node = $(this).siblings('input')
  console.log('value is', node.val())
  $.post('/users', { name : node.val() })
  .then(()=> {
    console.log('addUser complete')
    node.val('')
    renderUser()
  })
})
