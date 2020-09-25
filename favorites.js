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


function renderFavorites(favelist) {
    var renderedFavorites = favelist.map(individualrestaurant => {
        
        //the onclick attribute in the button class executes the yes or noList functions
        
        return `<div style="background-color: green; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
        <h5 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h5>
        <p style="padding: 0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is a....</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${individualrestaurant.rating}-Star Restaurant, and is </h4>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"><strong>100%</strong> Likely to Be Dog-Friendly</h4>
        <button class="yes-delete btn btn-danger delete">Remove from My List</button>
        </div>`            
    });
    return renderedFavorites.join('');
}

function renderFavePark(faveparklist) {
    var renderedFaveParks = faveparklist.map(currentpark => {
        return `<div style="background-color:lightgreen; border-radius:20px; border: 4px solid white; margin-botton:40px; margin-left:40px">
        <h5 style="text-align: center; color: antiquewhite; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid white">${currentpark.name}</h5>
        <p style="padding:0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is...</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${currentpark.rating}-Star Dog Park</h4>
        <button class="yes-delete btn btn-danger delete"> Remove from My List</button>
        </div>`

});
return renderedFaveParks.join('');
}

function renderUnfriendly(hatelist) {
    var renderedUnfriendly = hatelist.map(individualrestaurant => {

        return `<div style="background-color: red; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
        <h5 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h5>
        <p style="padding: 0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is a....</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${individualrestaurant.rating}-Star Restaurant, and is </h4>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"><strong>0%</strong> Likely to Be Dog-Friendly</h4>
        <button class="yespark-delete btn btn-danger delete">Remove from My List</button>
        </div>`            
    });
    return renderedUnfriendly.join('');

}


function renderHatePark(hateparklist) {
    var renderedHateParks = hateparklist.map(currentpark => {
        return `<div style="background-color:lightgreen; border-radius:20px; border: 4px solid white; margin-botton:40px; margin-left:40px">
        <h5 style="text-align: center; color: antiquewhite; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid white">${currentpark.name}</h5>
        <p style="padding:0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>you</strong>, this is...</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">$ZERO-Star Dog Park</h4>
        <button class="nopark-delete btn btn-danger delete"> Remove from My List</button>
        </div>`

});
return renderedHateParks.join('');
}
window.addEventListener('DOMContentLoaded', function() {

    var favesHere = document.querySelector('#faves');

    //does JSON magic to the favelist that should be pushed to from the main page(fave button? hate button?)
    var faveslistJSON = localStorage.getItem('yesList');
    var faveslist = JSON.parse(faveslistJSON);

    var faveparklistJSON = localStorage.getItem('yesParkList');
    var faveparklist = JSON.parse(faveparklistJSON);

    var faveParksHere=document.querySelector('#favespark');

    //puts the JSON magic into the HTML as HTML
    favesHere.innerHTML = renderFavorites(faveslist);
    faveParksHere.innerHTML = renderedFaveParks(faveparklist);
    
    //does JSON magic to the hatelist for the same stuff as before(ie, take from push and render)
    var hatelistJSON = localStorage.getItem('noList');
    var hatelist = JSON.parse(hatelistJSON);

    var hateparklistJSON = localStorage.getItem('noParkList');
    var hatesparklist = JSON.parse(hateparklistJSON);

    var unfriendlyParksHere=document.querySelector('#unfavespark');
    var unfriendlyHere = document.querySelector('#unfaves');

    // + sign there in case of accidental overwrite of fave list
    unfriendlyHere.innerHTML = renderUnfriendly(hatelist);
    unfriendlyParksHere.innerHTML = renderedHateParks(hatesparklist);

    //
    const deleteButtons = document.querySelectorAll('.yes-delete');

    for(let x = 0; x<deleteButtons.length; x++) {
        deleteButtons[x].addEventListener('click', function(event){
            event.preventDefault();
            faveslist.splice(x, 1);
            localStorage.setItem('yesList', JSON.stringify(faveslist));
            event.target.parentNode.remove();
        });
    }

    const deleteButton2 = document.querySelectorAll('.no-delete');
    for(let x =0; x<deleteButton2.length; x++){
        deleteButton2[x].addEventListener('click', function(event){
            event.preventDefault();
            hatelist.splice(x, 1);
            localStorage.setItem('noList', JSON.stringify(hatelist));
            event.target.parentNode.remove();
        })
    }
    
    const deleteButton3 = document.querySelectorAll('.yespark-delete');
    for(let x = 0; x<deleteButton3.length; x++){
        deleteButton3[x].addEventListener('click', function(event)
        {
            event.preventDefault();
            favesparklist.splice(x, 1);
            localStorage.setItem('yesParkList', JSON.stringify(favesparklist));
            event.target.parentNode.remove();
        })
    }

    const deleteButton4 = document.querySelectorAll('.nopark-delete');
    for(let x=0; x<deleteButton4.length; x++) {
        deleteButton4[x].addEventListener('click', function(event){
            event.preventDefault();
            hatesparklist.splice(x, 1);
            localStorage.setItem('noParkList', JSON.stringify(hatesparklist));
            event.target.parentNode.remove();
        })
    }
    replaceDog();
});

