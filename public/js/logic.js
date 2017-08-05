function submitForm(){
    event.preventDefault();

    let formData = $('form').serialize();
    console.log(formData);

    axios.post('/survey/submit', formData, function(result){
        console.log(result);
        $('#modal').modal('open');
    });
}