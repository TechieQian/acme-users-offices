function OfficeForm(config) {
  const container = config.id


  var lis = config.offices.map(function(office, index){
    return `<li class="list-group-item">
      ${office.name} <br>
      lat : ${office.lat} <br>
      lng : ${office.lng} <br>
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

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    else {
      let obj = {
        name : place.formatted_address,
        lat : place.geometry.location.lat(),
        lng : place.geometry.location.lng()
      }
      $.post('/offices', obj)
      .then(()=> {
        console.log('add place complete')
        renderOffice()
        renderUser()
      })

    }
  })


}
