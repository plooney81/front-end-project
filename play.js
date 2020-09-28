function replaceDog() {
    let gotDog = window.localStorage.getItem('dogkey');
    if (gotDog) {
        let dogicon = document.querySelector('.navbar img');
        if (!dogicon) {
            dogicon = document.createElement('img');
        }

        dogicon.setAttribute('src', gotDog);
        dogicon.setAttribute('height', '20px');
        placeDog = document.querySelector('.fas.fa-dog');
        placeDog.parentNode.insertBefore(dogicon, placeDog.nextSibling);
        placeDog.style.display = "none";
    }
}

window.addEventListener('DOMContentLoaded', replaceDog());


function renderPark(currentPark) {

        return `<div id="${currentPark.name}" class="card">
              <div class="d-flex justify-content-center align-items-center">
                <img class="card-img-top" src="${currentPark.pic}" alt="A random picture of a dog" style="height: auto; width: 30vw;">
              </div>
              <div class="card-body"> 
              <h3 class="card title">${currentPark.name}</h3>
              <h3 class="card rate">Rating: ${currentPark.rating}</h3>
              <p>At ${currentPark.address}</p>
              <a class="btn btn-primary" href="${currentPark.url}">Explore this park!</a>
              <button class="btn btn-success yes-button" onclick="yesParkList()">A+ Park!</button>
              <button class="btn btn-danger no-button" onclick="noParkList()">Delete From Favorites</button>
              </div></div>`

}

function yesParkList(parkName) {
    const park = actualParks[parkName];
    let yesParkJSON = localStorage.getItem('yesParkList');
    let yesPark = JSON.parse(yesParkJSON);

    if (yesPark == null) {
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

    if (noPark == null) {
        noPark = [];
    }
    noPark.push(park);
    noParkJSON = JSON.stringify(noPark);
    localStorage.setItem('noParkList', noParkJSON);
}

// Pete added a function that grabs a picture from the dog picture API.button
// Kate has copied this function over to the about-us page to streamline current design
async function returnRandomDogPicture(){
    return axios.get('https://dog.ceo/api/breeds/image/random')
        .then((response)=>{
            return response.data.message
        })
}


// We need to find a way to get the users address from the search bar
// we also need to find a way to get the radius the user would like to see results for
// but for now lets go ahead and hard code in the lat and long from the Cannon here in Houston
let addressLat;
let addressLong;
// let dogParkObject = {};
// let dogParkArray = [];
// let actualParks = [];

const googleApiKey = 'AIzaSyCrK3yusa4V5Evj1A2cwdxkb_iUR-WLCVk'; // Key for the multiple google apis we will be pulling from.
//const searchRadius = 5000; // this needs to be in meters for the Google places api, we can convert from the user giving in miles.
//const urlEncodedUserAddress = encodeURIComponent(userAddress); // encodes the users address into an URI by replacing each instance of certain characters with %

const googleGeocode = 'https://maps.googleapis.com/maps/api/geocode/json?'; // our geocode api starting URL, we will add onto it in the axios request

// BEGINS SEARCH SEQUENCE CODED BY KATE

window.addEventListener('DOMContentLoaded', function () {
    const $starthere = $('#starthere');
    $starthere.empty();
    var dropdown = document.querySelector('#searchRadius-dropdown');
    dropdown.addEventListener('change', function () {
        localStorage.setItem('searchradius', dropdown.value);
    });
    let userAddress;

    var searchcontent = document.querySelector('#search-bar');
    searchcontent.addEventListener('change', function () {
        userAddress = searchcontent.value;
        userAddress = encodeURIComponent(userAddress);
    });

    var searchButton = document.querySelector('#search-Btn');
    searchButton.addEventListener('click', function (event) {
        $starthere.empty();
        event.preventDefault();

        axios.get(`${googleGeocode}address=${userAddress}&key=${googleApiKey}`)
            .then((response) => {
                console.log(response.data);

                //kills process if no results
                if(!response.data.results.length){
                return
                 
                }
                
                const addressLat = response.data.results[0].geometry.location.lat;
                const addressLong = response.data.results[0].geometry.location.lng;

                let loc = new google.maps.LatLng(addressLat, addressLong);

                let map = new google.maps.Map(document.createElement('div'), {
                    center: loc,
                    zoom: 15
                });

                let service = new google.maps.places.PlacesService(map);
                
                let request = {
                    location: loc,
                    radius: localStorage.getItem('searchradius') || 1000,
                    query: 'dog park'
                }
                
                service.textSearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let parkSearchResults = results;
                        console.log(parkSearchResults);
                        parkSearchResults.forEach(async (currentPark) => {
                            let dogParkObject;
                            console.log(currentPark)
                            dogParkObject = {
                                'name': currentPark.name,
                                'address': currentPark.formatted_address,
                                'rating': currentPark.rating
                            };
                            await returnRandomDogPicture().then((randomPic)=>{
                                dogParkObject['pic'] = randomPic;
                                // dogParkArray.push(dogParkObject);
                                // console.log(dogParkArray);
                                // const starthere = document.querySelector('#starthere');
                                // dogParkArray.forEach((park)=>{
                                // starthere.innerHTML += renderPark(park);
                                // })
                            });
                            const starthere = document.querySelector('#starthere');
                            starthere.innerHTML += renderPark(dogParkObject);
                        });
                        
                        
                        // Object.keys(dogParkObject).forEach((key) => {
                        //     console.log(dogParkObject[key])
                        //     actualParks.push(dogParkObject[key]);
                        // });
                        // console.log(actualParks)

                    }
                });
            })
    });
})
