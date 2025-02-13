import { api } from './api.js';

window.showReviews = async (spotId) => {
  try {
    const reviews = await api.getReviewsBySpotId(spotId);
    const spotCard = document.querySelector(`[data-spot-id="${spotId}"]`);
    const reviewsDiv = spotCard.querySelector('.reviews-section') || document.createElement('div');
    reviewsDiv.className = 'reviews-section';
    
    reviewsDiv.innerHTML = `
      <h4>Reviews</h4>
      <div class="review-form">
        <div class="star-rating">
          ${Array(5).fill().map((_, i) => 
            `<span class="star" data-rating="${i + 1}">★</span>`
          ).join('')}
        </div>
        <textarea placeholder="Write your review..." maxlength="500"></textarea>
        <button onclick="submitReview('${spotId}')">Submit Review</button>
      </div>
      <div class="reviews-list">
        ${reviews.map(review => `
          <div class="review-card">
            <div class="stars">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <p>${review.comment}</p>
            <small>${new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        `).join('') || '<p>No reviews yet</p>'}
      </div>
    `;

    // Add star rating functionality
    const stars = reviewsDiv.querySelectorAll('.star-rating .star');
    let currentRating = 0;
    
    stars.forEach(star => {
      star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        updateStars(stars, rating);
      });
      
      star.addEventListener('click', function() {
        currentRating = this.dataset.rating;
        updateStars(stars, currentRating);
      });
    });

    reviewsDiv.querySelector('.star-rating').addEventListener('mouseout', () => {
      updateStars(stars, currentRating);
    });

    if (!spotCard.querySelector('.reviews-section')) {
      spotCard.appendChild(reviewsDiv);
    }
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
};

function updateStars(stars, rating) {
  stars.forEach(star => {
    star.classList.toggle('active', star.dataset.rating <= rating);
  });
}

window.submitReview = async (spotId) => {
  const spotCard = document.querySelector(`[data-spot-id="${spotId}"]`);
  const reviewsSection = spotCard.querySelector('.reviews-section');
  const rating = reviewsSection.querySelectorAll('.star.active').length;
  const comment = reviewsSection.querySelector('textarea').value.trim();

  if (!rating) {
    alert('Please select a rating');
    return;
  }

  try {
    await api.createReview({
      spotId,
      rating,
      comment,
    });
    
    // Refresh reviews
    showReviews(spotId);
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
