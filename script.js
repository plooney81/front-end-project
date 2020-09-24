// We need to find a way to get the users address from the search bar
// we also need to find a way to get the radius the user would like to see results for
// but for now lets go ahead and hard code in the lat and long from the Cannon here in Houston
let addressLat;
let addressLong;
let restaurantObject = {};
let regex = new RegExp('(?:dog|pet|animal)');
let dogFriendlyRestaurants = {};

const googleApiKey = 'AIzaSyCrK3yusa4V5Evj1A2cwdxkb_iUR-WLCVk'; // Key for the multiple google apis we will be pulling from.
const userAddress = 'Houston'; //This will eventually change.
const searchRadius = 5000; // this needs to be in meters for the Google places api, we can convert from the user giving in miles.
const urlEncodedUserAddress = encodeURIComponent(userAddress); // encodes the users address into an URI by replacing each instance of certain characters with %

const googleGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?'; // our geocode api starting URL, we will add onto it in the axios request
const googlePlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'; // our google places api starting URL, we add onto it in the second axios request
const googlePlacesDetails = 'https://maps.googleapis.com/maps/api/place/details/json?';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

//THIS BEGINS KATE'S CODE AND ENDS PETE'S CODE
function renderRestaurants(friendlyRs) {
    var renderedRestaurants = friendlyRs.map(individualrestaurant => {
        
        //calculates the confidence % that each restaurant is dog-friendly based on user ratings
        var confidencerating = (individualrestaurant.frequency*5) + 50.5; 

        //the onclick attribute in the button class executes the yes or noList functions
        return `<div style="background-color: cornsilk; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
                <h4 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h4>
                <p style="padding: 0%; margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">According to <strong>user reviews</strong>, this is a....</p>
                <h5 style="margin:2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${individualrestaurant.rating}-Star Restaurant, and is </h5>
                <h5 style="margin: 2px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">${confidencerating}% Likely to Be Dog-Friendly</h5>
                <button class="btn btn-success" style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" onclick="yesList('${individualrestaurant.restaurantName}')">Pawsitively Friendly!</button>
                <button class="btn btn-danger delete" style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" onclick="noList('${individualrestaurant.restaurantName}')">Doesn't Accept Dogs</button> 
                </div>`            
    });
    return renderedRestaurants.join('');
}

function yesList(restaurantName) {
    const restaurant = dogFriendlyRestaurants[restaurantName];
    let yesListJSON = localStorage.getItem('yesList');
    let yesList = JSON.parse(yesListJSON); 

    //if the yeslist doesn't yet exist, make it
    if(yesList == null) {
        yesList = [];
    }
    
    yesList.push(restaurant);
    yesListJSON = JSON.stringify(yesList);
    localStorage.setItem('yesList', yesListJSON);
}

function noList(restaurantName) {
    const restaurant = dogFriendlyRestaurants[restaurantName];
    let noListJSON = localStorage.getItem('noList');
    let noList = JSON.parse(noListJSON);

    if(noList == null) {
        noList = [];
    }
    noList.push(restaurant);
    noListJSON = JSON.stringify(noList);
    localStorage.setItem('noList', noListJSON);

}


//THIS ENDS KATE'S CODE AND STARTS PETE'S CODE


axios.get(`${googleGeocode}address=${urlEncodedUserAddress}&key=${googleApiKey}`)
    .then((response)=>{
        console.log(response.data);
        addressLat = response.data.results[0].geometry.location.lat;
        addressLong = response.data.results[0].geometry.location.lng;
        let loc = new google.maps.LatLng(addressLat, addressLong);
        let map = new google.maps.Map(document.createElement('div'), {
            center: loc,
            zoom: 15
            });
        
        let service = new google.maps.places.PlacesService(map);
        
        
        let request = {
            location: loc,
            radius: `${searchRadius}`,
            query: 'restaurant'
        };
        service.textSearch(request, (results, status)=>{
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                restaurantObject = results;
                // console.log(restaurantObject);
                const restArray = restaurantObject.map((currentRestaurant)=>{
                    return currentRestaurant.place_id; //only returns the place_id from the restaurant data, when then loop over the ID's to get the details api information.
                })
                // console.log(restArray);
                const placeDetailsArray = restArray.map((currentId)=>{
                    let request2 = {
                        placeId: currentId,
                        fields: ['name', 'rating', 'geometry', 'reviews']
                    };
                    service.getDetails(request2, (place, status)=>{
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            // console.log(place);
                            const reviewsArray = place.reviews;
                            
                            reviewsArray.forEach((currentReview)=>{
                                // console.log(regex.test(currentReview.text));
                                if(regex.test(currentReview.text)){//So It will basically loop over the reviews array and hopefully will find the reviews with dog/pet/animal friendly in them...fingers crossed.
                                    if (dogFriendlyRestaurants[place.name]){
                                        dogFriendlyRestaurants[place.name].frequency += 1;
                                    }else{
                                        dogFriendlyRestaurants[place.name] = {'restaurantName' : place.name, 'frequency': 1, 'rating': place.rating, 'reviews': place.reviews}
                                    }
                                }
                            })
                            console.log(dogFriendlyRestaurants);
                            //KATE HAS ADDED HERE
                            let dogFriendly = [];

                            Object.keys(dogFriendlyRestaurants).forEach((key) => {
                                dogFriendly.push(dogFriendlyRestaurants[key]);
                            });

                                console.log(dogFriendly)
                                const starthere = document.querySelector('#starthere');
                                starthere.innerHTML = renderRestaurants(dogFriendly);
                            
                        }
                    });
                    
                })

            }
        });
        
    });
