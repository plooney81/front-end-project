// We need to find a way to get the users address from the search bar
// we also need to find a way to get the radius the user would like to see results for
// but for now lets go ahead and hard code in the lat and long from the Cannon here in Houston
let addressLat;
let addressLong;
let restaurantObject = {};
let regex = new RegExp('(dog|pet|animal|friendly)');
let dogFriendly = {};

const googleApiKey = 'AIzaSyCrK3yusa4V5Evj1A2cwdxkb_iUR-WLCVk'; // Key for the multiple google apis we will be pulling from.
const userAddress = '1334 Brittmoore Rd, Houston, TX'; //This will eventually change.
const searchRadius = 2500; // this needs to be in meters for the Google places api, we can convert from the user giving in miles.
const urlEncodedUserAddress = encodeURIComponent(userAddress); // encodes the users address into an URI by replacing each instance of certain characters with %

const googleGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?'; // our geocode api starting URL, we will add onto it in the axios request
const googlePlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'; // our google places api starting URL, we add onto it in the second axios request
const googlePlacesDetails = 'https://maps.googleapis.com/maps/api/place/details/json?';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

axios.get(`${googleGeocode}address=${urlEncodedUserAddress}&key=${googleApiKey}`)
    .then((response)=>{
        // console.log(response.data);
        addressLat = response.data.results[0].geometry.location.lat;
        addressLong = response.data.results[0].geometry.location.lng;
        axios.get(proxyUrl + `${googlePlaces}location=${addressLat},${addressLong}&radius=${searchRadius}&type=restaurant&key=${googleApiKey}`)
            .then((response) =>{
                // console.log(response.data);
                restaurantObject = response.data.results;
                const restArray = restaurantObject.map((currentResturaunt)=>{
                    return currentResturaunt.place_id; //only returns the place_id from the restaurant data, when then loop over the ID's to get the details api information.
                })
                console.log(restArray);
                // const placeDetailsArray = restArray.map((currentId)=>{
                //     console.log(currentId);
                //     axios.get(proxyUrl + `${googlePlacesDetails}place_id=${currentId}=name,rating,review,formatted_phone_number&key=${googleApiKey}`)
                //         .then((response)=>{
                //             console.log(response.data);
                //         })
                // })

                for (let index = 0; index < restArray.length; index++){
                    axios.get(proxyUrl + `${googlePlacesDetails}place_id=${restArray[index]}=name,rating,review,formatted_phone_number&key=${googleApiKey}`)
                    .then((response)=>{
                        console.log(response.data);
                        dogFriendly = regex.exec(response.data.reviews.text);//So It will basically loop over the reviews array and hopefully will find the reviews with dog/pet/animal friendly in them...fingers crossed.
                    })
                }
            })
    })
