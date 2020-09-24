function replaceDog(){
    let gotDog = window.localStorage.getItem('dogkey');
    if(gotDog) {
        let dogicon = document.querySelector('.navbar img'); 
        if(!dogicon){
            dogicon = document.createElement('img');
        }
        
        dogicon.setAttribute('src', gotDog);
        dogicon.setAttribute('height', '20px');
        placeDog = document.querySelector('.fas.fa-dog');
        placeDog.parentNode.insertBefore(dogicon, placeDog.nextSibling);
        placeDog.style.display="none";
    }
}
margin
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

    replaceDog();

    enteredFile.addEventListener('change', function(event) {
        event.preventDefault();
        var file = enteredFile.files[0];
        var isitImage = /image.*/;

        if(file.type.match(isitImage)) {
            reader.addEventListener('load', function(){
                //this gets the file that the user inputted and turns the result into something that can be displayed as an image
                let dogpic = reader.result

                let thisDog = window.localStorage.setItem('dogkey', dogpic);
                
                buff.innerHTML = buff.innerHTML + `<img src=${dogpic}></img>`
                replaceDog();

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


