function OfficeForm(config) {
  const container = config.id

  var lis = config.offices.map(function(office, index){

    return `<li class="list-group-item">
      ${office.name} <br>
      lat : ${office.lat} <br>
      lng : ${office.lng} <br>
      <label class='label label-default'>${office.users.length} user</label>
      <button data-id=${office.id} class="btn btn-warning pull-right">delete</button>
      <br clear="both"/>
      </li>`
  })

  const template = `
    <ul class='list-group'>
      ${ lis.join('') }
    </ul>`

  $(container).empty();
  $(container).append(template)

  config.loc.addListener('place_changed', function() {
    var place = config.loc.getPlace();

    if (place.geometry) {
      let obj = {
        name : place.formatted_address,
        lat : place.geometry.location.lat(),
        lng : place.geometry.location.lng()
      }
      $.post('/offices', obj)
      .then(()=> {
        renderOffice()
        renderUser()
      })
    }
  })

  $(container).on('click', 'button', function() {
    console.log('im clicked')
    config.removeOffice($(this).data('id'))
  })


}
