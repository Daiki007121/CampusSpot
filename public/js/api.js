// API endpoints handler
export const api = {
  async getAllSpots() {
    const response = await fetch('/api/spots');
    if (!response.ok) throw new Error('Failed to fetch spots');
    return response.json();
  },

  async createSpot(spotData) {
    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData),
    });
    if (!response.ok) throw new Error('Failed to create spot');
    return response.json();
  },

  async getReviewsBySpotId(spotId) {
    const response = await fetch(`/api/reviews/spot/${spotId}`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  async createReview(reviewData) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  }
};
