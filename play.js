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


function renderPark(parkList) {

  var renderedPark = parkList.map(currentPark => {
      return `<div id="${currentPark.name}" class="card">
              <img style="card-img-top" src="${currentPark.pic}" alt="A photo of ${currentPark.name}">
              <div class="card-body"> 
              <h3 class="card title">${currentPark.name}</h3>
              <h3 class="card rate">${currentPark.rate}</h3>
              <p>At ${currentPark.address}</p>
              <a class="btn btn-primary" href="${currentPark.url}">Explore this park!</a>
              <button class="btn btn-success yes-button" onclick="yesParkList()">A+ Park!</button>
              <button class="btn btn-danger no-button" onclick="noParkList()">Delete From Favorites</button>
              </div>`            
  });
  return renderedPark.join('');
}

function yesParkList(parkName) {
    const park = actualParks[parkName];
    let yesParkJSON = localStorage.getItem('yesParkList');
    let yesPark = JSON.parse(yesParkJSON); 

    if(yesPark == null) {
        yesPark = [];
    }
    
    yesPark.push(park);
    yesParkJSON = JSON.stringify(yesPark);
    localStorage.setItem('yesParkList', yesParkJSON);
}

function noParkList(parkName) {
    const park = actualParks[parkName];
    let noParkJSON = localStorage.getItem('noParkList');
    let noPark = JSON.parse(noParkJSON);

    if(noPark == null) {
        noPark = [];
    }
    noPark.push(park);
    noParkJSON = JSON.stringify(noPark);
    localStorage.setItem('noParkList', noParkJSON);

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
            let actualParks = [];
            Object.keys(dogParkObject).forEach((key) => {
                actualParks.push(dogParkObject[key]);
            });
            
            console.log(actualParks)
            const starthere = document.querySelector('#starthere');
            starthere.innerHTML = renderPark(actualParks);
        });

    })
}
