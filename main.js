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