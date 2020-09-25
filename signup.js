window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', event => {
    alert('Yo thanks for Submitting!');
    //console.log(event);
  });
});
