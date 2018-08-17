let geocoder= new google.maps.Geocoder();;
let map;
let marker=new google.maps.Marker();

let btnMapa = document.querySelector('#btnMapa');

let ubicacion= document.querySelector('#search_location');

btnMapa.addEventListener('click',buscarDirecion)


function buscarDirecion(){
    /*
     * autocomplete location search
     */
    let PostCodeid = '#search_location';
    $(function () {
        PostCodeid=function () {
                geocoder.geocode({
                    'address': ubicacion.value
                }, function () {
                   $.map( function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            lat: item.geometry.location.lat(),
                            lon: item.geometry.location.lng()
                        };
                    });
                });
            }
    });
    
    /*
     * Point location on google map
     */
    $('.get_map').click(function (e) {
        let address = $(PostCodeid).val();
        geocoder.geocode({
            'address': address,
            componentRestrictions: {country: "cr"}
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                marker.setPosition(results[0].geometry.location);
                document.querySelector('#latitude').value=marker.getPosition().lat();
                document.querySelector('#longitude').value=marker.getPosition().lng();
                mapa(marker.getPosition().lat(),marker.getPosition().lng());
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        e.preventDefault();
    });
}