import { api } from '/js/api.js';

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
    <div class="spot-card" data-spot-id="${spot._id}">
      <div class="spot-content">
        <h3>${spot.name}</h3>
        <p>Building: ${spot.building}</p>
        <p>Floor: ${spot.floor}</p>
        <p>Power Outlets: ${spot.hasOutlet ? 'Yes' : 'No'}</p>
        <p>Noise Level: ${spot.noiseLevel}</p>
        <button class="review-button" onclick="showReviews('${spot._id}')">Show Reviews</button>
        <div class="spot-actions">
          <button onclick="editSpot('${spot._id}')">Edit</button>
          <button onclick="deleteSpot('${spot._id}')" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setupSpotForm() {
  const form = document.getElementById('add-spot-form');
  form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = {
    name: form.name.value,
    building: form.building.value,
    floor: form.floor.value,
    hasOutlet: form.hasOutlet.checked,
    noiseLevel: form.noiseLevel.value
  };

  const spotId = form.dataset.editingSpotId;

  try {
    if (spotId) {
      await api.updateSpot(spotId, formData);
      form.removeAttribute('data-editing-spot-id');
      form.querySelector('button[type="submit"]').textContent = 'Add Spot';
    } else {
      await api.createSpot(formData);
    }
    form.reset();
    loadSpots();
  } catch (error) {
    console.error('Error saving spot:', error);
  }
}

window.editSpot = async (spotId) => {
  const form = document.getElementById('add-spot-form');
  const spotCard = document.querySelector(`[data-spot-id="${spotId}"]`);
  const spotContent = spotCard.querySelector('.spot-content');
  
  form.name.value = spotContent.querySelector('h3').textContent;
  form.building.value = spotContent.querySelector('p:nth-child(2)').textContent.replace('Building: ', '');
  form.floor.value = spotContent.querySelector('p:nth-child(3)').textContent.replace('Floor: ', '');
  form.hasOutlet.checked = spotContent.querySelector('p:nth-child(4)').textContent.includes('Yes');
  form.noiseLevel.value = spotContent.querySelector('p:nth-child(5)').textContent.replace('Noise Level: ', '').toLowerCase();
  
  form.dataset.editingSpotId = spotId;
  form.querySelector('button[type="submit"]').textContent = 'Update Spot';
};

window.deleteSpot = async (spotId) => {
  if (confirm('Are you sure you want to delete this spot?')) {
    try {
      await api.deleteSpot(spotId);
      loadSpots();
    } catch (error) {
      console.error('Error deleting spot:', error);
    }
  }
};
