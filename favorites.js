function renderFavorites(favelist) {
    var renderedFavorites = favelist.map(currentrestaurant => {
        return `<div id="${currentrestaurant.name} class="card">
                <img style="card-img-top" src=${currentrestaurant.pic} alt="A photo of ${restaurant.name}">
                <div class="card-body"> 
                <h5 class="card title">${currentrestaurant.name}</h5>
                <a class="btn btn-primary" href="${currentrestaurant.url}">Make a Reservation</a>
                </div></div>`            
    });
    return renderedFavorites.join('');
}

function renderHated(hatelist) {
    var renderedHated = hatelist.map(currentrestaurant => {
        return `<div id="${currentrestaurant.name}" class = "card>
        <img style = "card-img-top" src=${currentrestaurant.pic} alt="A photo of ${restaurant.name}>
        <div class = "card-body">
        <h5 class="card title">${currentrestaurant.name}></h5>
        <a class="btn btn-primary" href = "${currentrestaurant.url}">
        </div></div>`
    });
    return renderedHated.join('');
}
window.addEventListener('DOMContentLoaded', function() {

    var divWhereWeStickRestaurants = document.querySelector('#westoredmovieshere');

    //does JSON magic to the favelist that should be pushed to from the main page(fave button? hate button?)
    var faveslistJSON = localStorage.getItem('favoriteList');
    var faveslist = JSON.parse(faveslistJSON);

    //puts the JSON magic into the HTML as HTML
    divWhereWeStickRestaurants.innerHTML = renderFavorites(faveslist);

    //does JSON magic to the hatelist for the same stuff as before(ie, take from push and render)
    var hatelistJSON = localStorage.getItem('hateList');
    var hatelist = JSON.parse(hatelistJSON);

    // + sign there in case of accidental overwrite of fave list
    divWhereWeStickRestaurants.innerHTML = divWhereWeStickRestaurants.innerHTML + renderHated(hatelist);

});