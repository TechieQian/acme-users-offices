$('#addUser').on('click', function(){
  let node = $(this).siblings('input')
  $.post('/users', { name : node.val() })
    .then((res)=> {
      if (res.err) {
        console.log('caught my err...lets do stuff with it')
      }
      else {
        node.val('')
        renderUserList()
      }
    })
})
