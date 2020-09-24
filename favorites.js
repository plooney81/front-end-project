function renderFavorites(favelist) {
    var renderedFavorites = favelist.map(individualrestaurant => {
        
        //the onclick attribute in the button class executes the yes or noList functions
        return `<div id="${individualrestaurant.restaurantName}" class="card">
                <div class="card-body"> 
                <h4 class="card title">${individualrestaurant.restaurantName}</h4>
                <p>According to <strong>YOU</strong>, this is a....</p>
                <h5>${individualrestaurant.rating}-Star Restaurant, and is </h5>
                <h5><strong>100%</strong> Likely to Be Dog-Friendly</h5>
                <button class="btn btn-danger delete">Remove from My List</button>
                </div></div>`            
    });
    return renderedFavorites.join('');
}


function renderUnfriendly(hatelist) {
    var renderedUnfriendly = hatelist.map(individualrestaurant => {
        return `<div id="${individualrestaurant.restaurantName}" class="card">
                <div class="card-body"> 
                <h4 class="card title">${individualrestaurant.restaurantName}</h4>
                <p>According to <strong>YOU</strong>, this is a....</p>
                <h5>${individualrestaurant.rating}-Star Restaurant, but is </h5>
                <h5><strong>0%</strong> Likely to Be Dog-Friendly</h5>
                <button class="btn btn-danger delete">Remove from My List</button>
                </div></div>`                  
    });
    return renderedUnfriendly.join('');

}
window.addEventListener('DOMContentLoaded', function() {

    var favesHere = document.querySelector('#faves');

    //does JSON magic to the favelist that should be pushed to from the main page(fave button? hate button?)
    var faveslistJSON = localStorage.getItem('yesList');
    var faveslist = JSON.parse(faveslistJSON);

    //puts the JSON magic into the HTML as HTML
    favesHere.innerHTML = renderFavorites(faveslist);

    //does JSON magic to the hatelist for the same stuff as before(ie, take from push and render)
    var hatelistJSON = localStorage.getItem('noList');
    var hatelist = JSON.parse(hatelistJSON);

    var unfriendlyHere = document.querySelector('#unfaves');

    // + sign there in case of accidental overwrite of fave list
    unfriendlyHere.innerHTML = renderUnfriendly(hatelist);

    //
    const deleteButton = document.querySelectorAll('.delete');
    
    deleteButton.addEventListener('click', function(event){
        event.preventDefault();
        event.target.remove(); 
    });

});