document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var place = document.getElementById('place').value;
    var review = document.getElementById('review').value;
    var rating = document.getElementById('rating').value;

    var reviewList = document.getElementById('places');

    var newReview = document.createElement('div');
    newReview.textContent = 'Lugar: ' + place + ', Reseña: ' + review + ', Puntuación: ' + rating;

    reviewList.appendChild(newReview);
});

document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var place = document.getElementById('place').value;
    var review = document.getElementById('review').value;
    var rating = document.getElementById('rating').value;

    var reviewList = document.getElementById('local-list');

    var newReview = document.createElement('div');
    newReviewnewReview.textContent = 'Lugar: ' + place + ', Reseña: ' + review + ', Puntuación: ' + rating;
    newReview.classList.add("local");

    reviewList.appendChild(newReview);
});

document.getElementById('search-button').addEventListener('click', function() {
    var searchBar = document.getElementById('search-bar');
    var searchValue = searchBar.value.toLowerCase();
    var locals = document.getElementsByClassName('local');

    for (var i = 0; i < locals.length; i++) {
        var local = locals[i];
        var localName = local.getElementsByTagName('h2')[0].textContent;

        if (localName.toLowerCase().indexOf(searchValue) > -1) {
            local.style.display = "";
        } else {
            local.style.display = "none";
        }
    }
});