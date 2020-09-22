window.addEventListener('DOMContentLoaded', function(){
    
    const reader = new FileReader();
    const aboutUs = document.querySelector('#aboutus');

    reader.addEventListener('load', function() {
        aboutUs.appendChild(reader.readAsText('help'))
    });

    console.log(reader.readAsText('./about-us.txt'))



    aboutUs.innerHTML = reader.readAsText('./about-us.txt');
    aboutUs.appendChild(reader.readAsText('./about-us.txt'));
});


