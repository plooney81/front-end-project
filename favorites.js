function renderFavorites(favelist) {
    var renderedFavorites = favelist.map(individualrestaurant => {
        
        //the onclick attribute in the button class executes the yes or noList functions
        
        return `<div style="background-color: green; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
        <h5 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h5>
        <p style="padding: 0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is a....</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${individualrestaurant.rating}-Star Restaurant, and is </h4>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"><strong>100%</strong> Likely to Be Dog-Friendly</h4>
        <button class="yes-delete btn btn-danger delete">Remove from My List</button>
        </div></div>`            
    });
    return renderedFavorites.join('');
}


function renderUnfriendly(hatelist) {
    var renderedUnfriendly = hatelist.map(individualrestaurant => {

        return `<div style="background-color: red; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
        <h5 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h5>
        <p style="padding: 0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is a....</p>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${individualrestaurant.rating}-Star Restaurant, and is </h4>
        <h4 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"><strong>0%</strong> Likely to Be Dog-Friendly</h4>
        <button class="no-delete btn btn-danger delete">Remove from My List</button>
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
});