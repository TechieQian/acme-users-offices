function UserList(config) {
  const container = config.id

  var lis = config.users.map(function(user, index){

    const hasOffice =  config.offices.map(function(office, index){
                  if (user.office && office.id == user.office.id) {
                    return `<option selected="selected" value='${office.id}'> ${office.name} </option>`
                  }
                  else {
                    return `
                      <option value='${office.id}'> ${office.name} </option>
                    `;
                  }
                })
    hasOffice.unshift('<option value="0"> -- none -- </option>')

    const html1 = ` <li class='list-group-item' value='${user.id}'>
            ${user.name}
            <select class='form-control'>`

    const html2 = `</select>
      <br>
      <div class='form-group'>
        <button class='btn btn-warning'>Remove</button>
      </div>
    </li>`

    const whole = html1 + hasOffice.join('') + html2
    return  whole
  });

  var template = `
  <ul class='list-group'>
    ${ lis.join('') }
  </ul>
  `;

  //User list
  $(container).empty();
  $(container).append(template)

  $(container).on('click', 'button', function() {
    let snode = $(this).closest('li')[0]
    config.removeUser(snode.value)
  })

  $(container).find('select').change(function() {
    let snode = $(this).closest('li')[0]
    const myVal = $(this).val()
    const value = myVal == "0" ? null : myVal
    config.updateUser(snode.value, value)
  });


}
