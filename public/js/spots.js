import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  loadSpots();
  setupSpotForm();
});

async function loadSpots() {
  try {
    const spots = await api.getAllSpots();
    displaySpots(spots);
  } catch (error) {
    console.error('Error loading spots:', error);
  }
}

function displaySpots(spots) {
  const container = document.getElementById('spots-container');
  container.innerHTML = spots.map(spot => `
    <div class="spot-card">
      <h3>${spot.name}</h3>
      <p>Building: ${spot.building}</p>
      <p>Floor: ${spot.floor}</p>
      <p>Power Outlets: ${spot.hasOutlet ? 'Yes' : 'No'}</p>
      <p>Noise Level: ${spot.noiseLevel}</p>
      <button onclick="showReviews('${spot._id}')">Show Reviews</button>
    </div>
  `).join('');
}

function setupSpotForm() {
  const form = document.getElementById('add-spot-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.name.value,
      building: form.building.value,
      floor: form.floor.value,
      hasOutlet: form.hasOutlet.checked,
      noiseLevel: form.noiseLevel.value
    };

    try {
      await api.createSpot(formData);
      form.reset();
      loadSpots();
    } catch (error) {
      console.error('Error creating spot:', error);
    }
  });
}
