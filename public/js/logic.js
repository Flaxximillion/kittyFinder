function submitForm(route){
    event.preventDefault();

    let formData = $('form').serialize();
    console.log(formData);
    console.log(route);

    axios.post(`/${route}/submit`, formData)
        .then(function(response){
            console.log(response);
            let catData = response.data;
            $('#modal').modal();

            $('#name').text(catData.name);
            $('#description').text(catData.description);
            $('#image').attr('src', catData.image);
            $('#modal').modal('open');
        }).catch(function(err){
            console.log(err);
    });
}
