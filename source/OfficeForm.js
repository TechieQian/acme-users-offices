function OfficeForm(config) {
  config.loc.addListener('place_changed', function() {
    var place = config.loc.getPlace();
    if (place.geometry) {
      let obj = {
        name : place.formatted_address,
        lat : place.geometry.location.lat(),
        lng : place.geometry.location.lng()
      }
      $.post('/offices', obj)
        .then(()=> { renderLists() })
    }
  })

}
