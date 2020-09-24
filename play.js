// We need to find a way to get the users address from the search bar
// we also need to find a way to get the radius the user would like to see results for
// but for now lets go ahead and hard code in the lat and long from the Cannon here in Houston
let addressLat;
let addressLong;
let dogParkObject = {};

const googleApiKey = 'AIzaSyCrK3yusa4V5Evj1A2cwdxkb_iUR-WLCVk'; // Key for the multiple google apis we will be pulling from.
const userAddress = 'Houston'; //This will eventually change.
const searchRadius = 5000; // this needs to be in meters for the Google places api, we can convert from the user giving in miles.
const urlEncodedUserAddress = encodeURIComponent(userAddress); // encodes the users address into an URI by replacing each instance of certain characters with %

const googleGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?'; // our geocode api starting URL, we will add onto it in the axios request

// Render Function Code for dog parks
function renderParks(parksArray) {
    var renderedRestaurants = parksArray.map(individualPark => {
        return `<div id="${individualPark.name} class="card">
                <div class="card-body"> 
                <h5 class="card title">${individualPark.name}</h5>
                <h2>Park Rating: ${individualPark.rating}</h2>
                <h4>Address:</h4>
                <h5>${individualPark.address}</h5>
                <a class="btn btn-primary" href="${individualPark.restaurantName}">Make a Reservation</a>
                </div></div>`            
    });
    return renderedRestaurants.join('');
}

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
            query: 'dog park'
        };
        service.textSearch(request, (results, status)=>{
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let parkSearchResults = results;
                console.log(parkSearchResults);
                const parkArray = parkSearchResults.map((currentPark)=>{
                    // if(currentPark.photos[0]){
                    //     console.log(currentPark.photos[0].html_attributions[0])
                    // }
                    let tempObject = {
                        'name' : currentPark.name,
                        'address' : currentPark.formatted_address,
                        'rating' : currentPark.rating
                    };
                    return tempObject;
                })
                dogParkObject = parkArray;
            }

            // render function call
            let parksKeys = [];
            Object.keys(dogParkObject).forEach((key) => {
                parksKeys.push(dogParkObject[key]);
            });
            
            console.log(parksKeys)
            const starthere = document.querySelector('#starthere');
            starthere.innerHTML = renderParks(parksKeys);
        });
    })