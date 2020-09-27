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

var dogpic;
//Pete's function, copied in and experimented with by Kate
function returnRandomDogPicture(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(function(response){ 
        dogpic = response.message;
        console.log(dogpic);
        return dogpic
    })
    .then(function(dogpic){
        console.log(dogpic);
        window.localStorage.setItem('dogkey', dogpic);
    })
}

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
                dogpic = reader.result

                window.localStorage.setItem('dogkey', dogpic);
                
                buff.innerHTML = `<img src=${dogpic}></img>`
                replaceDog();

            })
        reader.readAsDataURL(file);
        }
        else {
            alert("The file type you entered was not supported.\nSo the Fetch Team has assigned you a heckin' random pic!");
            buff.innerHTML =  `<img src=${dogpic}></img>`
            replaceDog();
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


