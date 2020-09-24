function renderPark(parkList) {
  var renderPark = parkList.map(currentPark => {
      return `<div id="${currentpark.name} class="card">
              <img style="card-img-top" src=${currentPark.pic} alt="A photo of ${park.name}">
              <div class="card-body"> 
              <h3 class="card title">${currentPark.name}</h3>
              <h3 class="card rate">${currentPark.rate}<h3>
              <a class="btn btn-primary" href="${currentPark.url}">Make a Reservation</a>
              <button class="btn btn-danger delete">Delete From Favorites</button>
              </div></div>`            
  });
  return renderedFavorites.join('');