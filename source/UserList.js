function UserList(config) {
  const container = config.id

  var lis = config.users.map(function(user, index){

    const optionList =
      config.offices.map(function(office, index){
        if (user.office && office.id == user.office.id) {
          return `<option selected="selected" value='${office.id}'> ${office.name} </option>`
        }
        else {
          return `<option value='${office.id}'> ${office.name} </option>`;
        }
      }).join('')

    const noneOption = '<option value="0"> -- none -- </option>'

    const html = `
      <li class='list-group-item' value='${user.id}'>
        ${user.name}
      <select class='form-control'>
      ${noneOption} ${optionList}
      </select>
      <br>
      <div class='form-group'>
        <button class='btn btn-warning'>Remove</button>
      </div>
    </li>
    `
    return html
  });

  var template = `
  <ul class='list-group'>
    ${ lis.join('') }
  </ul>
  `;

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
