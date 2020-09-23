window.addEventListener('DOMContentLoaded', function(){

    fetch('./about-us.txt')
    .then(function(response){
        return response.text();
    })
    .then(function(response){
        document.querySelector('#aboutus').innerHTML = response;
    });

    var enteredFile = document.getElementById('enterFile')
    var buff = document.getElementById('buff');
    var output = document.getElementById('output')
    var reader = new FileReader();
    
    enteredFile.addEventListener('change', function(event) {
        event.preventDefault();
        var file = enteredFile.files[0];
        var isitImage = /image.*/;

        if(file.type.match(isitImage)) {
            reader.addEventListener('load', function(){
                //this gets the file that the user inputted and turns the result into something that can be displayed as an image
                let dogpic = reader.result;
                buff.innerHTML = buff.innerHTML+ `<img src=${dogpic}></img>`
                
            })
        reader.readAsDataURL(file);
        }
        else {
            output.innerHTML = 'File type not supported; please enter an image of your doggo!'
        }

        
        })
    const aboutYouButton = document.querySelector('#submit-you');   
    const inputHere = document.querySelector('#about-you');
    const userInput = document.querySelector('#userInput');
        
    aboutYouButton.addEventListener('click', function(event){
        event.preventDefault(); 
        inputHere.innerHTML = userInput.value;
    })


    //FileReader only works for uploaded files
    //you're going to want a fetch request

});


