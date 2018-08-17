let imagenUrl = '';

$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'jfloresd', api_key: '478752194199842'});

    // Upload button
    let uploadButton = $('#btnSeleccionarImagen');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'jfloresd', upload_preset: 'lpay1pqj', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            
            imagenUrl = processImage(id);
            console.log(imagenUrl);
            document.querySelector('#foto').value = imagenUrl;
            document.querySelector('#currentFoto').src= imagenUrl;
            return imagenUrl;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}

$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'jfloresd', api_key: '478752194199842'});

    // Upload button
    let editButton = $('#btnEditarImagen');

    // Upload button event
    editButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'jfloresd', upload_preset: 'lpay1pqj', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            
            imagenUrl = processImage(id);
            console.log(imagenUrl);
            document.querySelector('#editFoto').value = imagenUrl;
            document.querySelector('#editFotoShow').src= imagenUrl;
            return imagenUrl;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}