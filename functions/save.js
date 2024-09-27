const star = document.querySelector('.favStar');
const saveBtn = document.querySelector('#saveBtn');
const searchSave1 = document.querySelector('.searchSave1');
const searchSave2 = document.querySelector('.searchSave2');
const searchSave3 = document.querySelector('.searchSave3');

//star style function

star.addEventListener('click', function() {
  event.preventDefault();

    if (star.classList.contains('active')) {
        star.classList.remove('active');
        star.innerHTML = '&#9734;'; // Empty star
    } else {
        star.classList.add('active');
        star.innerHTML = '&#9733;'; // Filled star
    }
});


// function saveSearch(searchData) {
//     let savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    
//     if (!savedSearches[0]) {
//         savedSearches[0] = searchData;
//         searchSave1.innerHTML = searchData.locationName
//     }
// }


