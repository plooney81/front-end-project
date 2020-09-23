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
                        }
                    })
                })

            }
        });
    })