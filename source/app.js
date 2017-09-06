$.get('/', ()=> {
  console.log('rendering whole view')
  renderUser()
  renderOffice()
})

var initMap = function() {
  // google.maps.event.addDomListener(window, 'load', ()=>{
  //   console.log('running maps')
  var input = document.getElementById('googleSearch');
  var autocomplete = new google.maps.places.Autocomplete(input);
  // });
  return autocomplete
}

var removeUser = function(id) {
  console.log('removing user id', id)
  $.ajax({
    type : "DELETE",
    url : `/users/${id}`
  })
  .then(()=> {
    console.log('finished deleting')
    renderUser()
  })
}

var updateUser = function(userId, officeId) {
  console.log('updating', userId, officeId)
  $.ajax({
    type : "PUT",
    url : `/users/${userId}`,
    data : { officeId : officeId }
  })
  .then(()=> {
    console.log('update success')
    renderUser()
  })
}

function renderOffice() {
  $.ajax({
    type : "GET",
    url : '/offices'
  })
  .then((offices)=> {
    let map = initMap()
    let config = {
      id : '#officeList',
      offices : offices,
      loc : map
    }
    console.log(typeof OfficeForm)
    OfficeForm(config)
  })
}

function renderUser() {
  $.when (
    $.ajax({
      type : "GET",
      url : `/users`
    }),
    $.ajax({
      type : "GET",
      url : `/offices`
    })
  )
  .done((users,offices)=> {
    let config = {
      id : '#userList',
      users : users[0],
      offices : offices[0],
      removeUser,
      updateUser
    }
    UserList(config)
  })
}
