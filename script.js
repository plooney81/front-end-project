// We need to find a way to get the users address from the search bar
// we also need to find a way to get the radius the user would like to see results for
// but for now lets go ahead and hard code in the lat and long from the Cannon here in Houston


const googleApiKey = 'AIzaSyCrK3yusa4V5Evj1A2cwdxkb_iUR-WLCVk'; // Key for the multiple google apis we will be pulling from.


const googleGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?'; // our geocode api starting URL, we will add onto it in the axios request

//THIS BEGINS KATE'S CODE AND ENDS PETE'S CODE
function renderRestaurants(friendlyRs) {
    var renderedRestaurants = friendlyRs.map(individualrestaurant => {
        
        //calculates the confidence % that each restaurant is dog-friendly based on user ratings
        var confidencerating = (individualrestaurant.frequency*5) + 50.5; 

        //the onclick attribute in the button class executes the yes or noList functions
        return `<div style="background-color: cornsilk; border-radius: 20px; border: 4px solid black; margin-bottom: 40px; margin-left:40px">
                <h4 style="text-align: center; color: cornflowerblue; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; border-radius:20px; border: 9px solid aquamarine;">${individualrestaurant.restaurantName}</h4>
                <div class="d-flex justify-content-center align-items-center">
                    <img src="${individualrestaurant.pic}" alt="A picture pulled from a FourSquare user of the ${individualrestaurant.restaurantName}" style="margin: 0 auto;">
                </div>
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
window.addEventListener('DOMContentLoaded', replaceDog());

//THIS ENDS KATE'S CODE AND STARTS PETE'S CODE

// Pete added on here
async function returnFourSquarePicture(restName, lat, long, searchDistance){
    let fourSquareRestId;
    const fourUrl = 'https://api.foursquare.com/v2/venues/';
    const fourKey = 'client_id=XLIUJFK3AC0GVEAG1MOA5RMJQTD2YA4JEVDOX0JA0T5LH0YB&client_secret=ZYDJHE4KNUFCC321PKTU520B4KU1CJA2ZBTINIWWY1IZTH5E&v=20200924';
    restName = encodeURIComponent(restName);
    // another axios for foursquare to get pictures of the restaurants
    return await axios.get(`${fourUrl}search?ll=${lat},${long}&radius=${searchDistance}&query=${restName}&categoryId=4d4b7105d754a06374d81259&limit=1&${fourKey}`)
        .then(async (res)=>{
            fourSquareRestId = res.data.response.venues[0].id;
            // another axios on four using the restaurants foursquare ID so we can get pictures and URLS for the place.
        return await axios.get(`${fourUrl}${fourSquareRestId}/photos?${fourKey}`)
            .then((secondResponse)=>{
                if(secondResponse.data.response.photos.items[0]){
                    // console.log(`${secondResponse.data.response.photos.items[0].prefix}150x200${secondResponse.data.response.photos.items[0].suffix}`)
                    return `${secondResponse.data.response.photos.items[0].prefix}150x200${secondResponse.data.response.photos.items[0].suffix}`  
                }else{

                    if(secondResponse.data.response.photos.items[0]){
                        // console.log(`${secondResponse.data.response.photos.items[0].prefix}150x200${secondResponse.data.response.photos.items[0].suffix}`)
                        return `${secondResponse.data.response.photos.items[0].prefix}150x200${secondResponse.data.response.photos.items[0].suffix}`
                    }else{
                        return '#';
                    }

                }
                
            })
        })
}
// End of Petes addition


// PETE ADDED BELOW
// Jquery code below ---> so if I go back to master branch and change the hard coded userAddress everything works fine...but for some reason this is breaking it
$(document).ready(()=>{
    let addressLat;
    let addressLong;
    let regex = new RegExp('(?:dog|pet|animal)');
    let userAddress = 'Dallas'; //This will eventually change.
    let searchRadius = 5000; // this needs to be in meters for the Google places api, we can convert from the user giving in miles.
    const $search = $('#search-bar');
    const $searchButton = $('#search-Btn');
    const $dropDown = $('#searchRadius-dropdown')
    const $starthere = $('#starthere');
    $starthere.empty();
                                
    $searchButton.click(()=>{
        let dogFriendlyRestaurants = {};
        $starthere.empty();
        // grabs the value from the search radius dropdown 
        if($dropDown.val()){
            searchRadius = $dropDown.val();
        }

        // grabs the value from the input text box.
        if($search.val()){
            userAddress = $search.val();
            // console.log(userAddress);
        }

        let urlEncodedUserAddress = encodeURIComponent(userAddress); // encodes the users address into an URI by replacing each instance of certain characters with %
        axios.get(`${googleGeocode}address=${urlEncodedUserAddress}&key=${googleApiKey}`)
            .then((response)=>{
                // console.log(response.data);
                addressLat = response.data.results[0].geometry.location.lat;
                addressLong = response.data.results[0].geometry.location.lng;
                console.log(addressLat, addressLong);
                let loc = new google.maps.LatLng(addressLat, addressLong);
                let map = new google.maps.Map(document.createElement('div'), { // May have to do with this div!
                    center: loc,
                    zoom: 15
                    });
                
                let service = new google.maps.places.PlacesService(map);
                
                let request = {
                    location: loc,
                    radius: `${searchRadius}`,
                    query: 'restaurant',
                    
                };
                service.textSearch(request, (results, status)=>{
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        let restaurantObject = results;
                        console.log(restaurantObject);
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
                                    
                                    reviewsArray.forEach(async(currentReview)=>{
                                        // console.log(regex.test(currentReview.text));
                                        if(regex.test(currentReview.text)){//So It will basically loop over the reviews array and hopefully will find the reviews with dog/pet/animal friendly in them...fingers crossed.
                                            if (dogFriendlyRestaurants[place.name]){
                                                dogFriendlyRestaurants[place.name].frequency += 1;
                                            }else{
                                                dogFriendlyRestaurants[place.name] = {
                                                    'restaurantName' : place.name, 
                                                    'frequency': 1, 
                                                    'rating': place.rating, 
                                                    'reviews': place.reviews,
                                                    'pic': '#'
                                                };
                                                // Pete - added in a call for each place to get a FourSquare picture
                                                await returnFourSquarePicture(place.name, addressLat, addressLong, searchRadius).then((actualUrl=>{
                                                    console.log(actualUrl);
                                                    dogFriendlyRestaurants[place.name].pic = actualUrl;
                                                }))
                                            }
                                        }
                                    })
        
                                // console.log(dogFriendlyRestaurants);
                                //KATE HAS ADDED HERE
                                let dogFriendly = [];
                                            
                                Object.keys(dogFriendlyRestaurants).forEach((key) => {
                                    dogFriendly.push(dogFriendlyRestaurants[key]);
                                });
                                // console.log(dogFriendly)
                                $starthere.empty();
                                $starthere.append(renderRestaurants(dogFriendly));
                                    
                                }

                            });
                            
                        })
        
                    }
                });
                
            });
    })

})