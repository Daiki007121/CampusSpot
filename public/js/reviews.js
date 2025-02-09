import { api } from './api.js';

window.showReviews = async (spotId) => {
  try {
    const reviews = await api.getReviewsBySpotId(spotId);
    // Implement review display logic
    console.log(reviews);
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
};
