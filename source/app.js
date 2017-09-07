$.get('/', ()=> {
  renderLists()

  //Render OfficeForm.
  const input = document.getElementById('googleSearch');
  const autocomplete = new google.maps.places.Autocomplete(input);
  OfficeForm( { loc : autocomplete })
})

const removeUser = function(id) {
  $.ajax({
    type : "DELETE",
    url : `/users/${id}`
  })
  .then(()=> {
    renderLists()
  })
}

const removeOffice = function(id) {
  $.ajax({
    type : "DELETE",
    url : `/offices/${id}`
  })
  .then(()=> {
    renderLists()
  })
}

const updateUser = function(userId, officeId) {
  $.ajax({
    type : "PUT",
    url : `/users/${userId}`,
    data : { officeId : officeId }
  })
  .then(()=> {
    renderLists()
  })
}

const renderOfficeList = function() {
  $.ajax({
    type : "GET",
    url : '/offices'
  })
  .then((offices)=> {
    let config = {
      id : '#officeList',
      offices : offices,
      removeOffice
    }
    OfficeList(config)
  })
}

const renderUserList = function() {
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

function renderLists() {
  renderUserList()
  renderOfficeList()
}
