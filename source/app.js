$.get('/', ()=> {
  renderUser()
  renderOffice()
})

var initMap = function() {
  var input = document.getElementById('googleSearch');
  var autocomplete = new google.maps.places.Autocomplete(input);
  return autocomplete
}

var removeUser = function(id) {
  $.ajax({
    type : "DELETE",
    url : `/users/${id}`
  })
  .then(()=> {
    renderOffice()
    renderUser()
  })
}

var removeOffice = function(id) {
  $.ajax({
    type : "DELETE",
    url : `/offices/${id}`
  })
  .then(()=> {
    renderOffice()
    renderUser()
  })
}

var updateUser = function(userId, officeId) {
  $.ajax({
    type : "PUT",
    url : `/users/${userId}`,
    data : { officeId : officeId }
  })
  .then(()=> {
    renderOffice()
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
      loc : map,
      removeOffice
    }
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
