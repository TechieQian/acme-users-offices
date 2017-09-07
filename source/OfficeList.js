function OfficeList(config) {
  const container = config.id

  var lis = config.offices.map(function(office, index){
    return `
      <li class="list-group-item">
        ${office.name} <br>
        lat : ${office.lat} <br>
        lng : ${office.lng} <br>
        <label class='label label-default'>${office.users.length} user</label>
        <button data-id=${office.id} class="btn btn-warning pull-right">delete</button>
        <br clear="both"/>
      </li>
      `
  })

  const template = `
    <ul class='list-group'>
      ${ lis.join('') }
    </ul>`

  $(container).empty();
  $(container).append(template)

  $(container).on('click', 'button', function() {
    config.removeOffice($(this).data('id'))
  })

}
