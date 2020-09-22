window.addEventListener('DOMContentLoaded', function(){
    
    const reader = new FileReader();
    //FileReader only works for uploaded files
    //you're going to want a fetch request

    fetch('./about-us.txt')
    .then(function(response){
        return response.text();
    })
    .then(function(response){
        document.querySelector('#aboutus').innerHTML = response;
    });
});


