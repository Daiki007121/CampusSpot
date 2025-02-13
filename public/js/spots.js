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
        <button onclick="showReviews('${spot._id}')">Show Reviews</button>
      </div>
      <div class="spot-actions">
        <button onclick="editSpot('${spot._id}')">Edit</button>
        <button onclick="deleteSpot('${spot._id}')" class="delete-btn">Delete</button>
      </div>
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

// Edit spot function
window.editSpot = async (spotId) => {
  const spotCard = document.querySelector(`[data-spot-id="${spotId}"]`);
  const spotContent = spotCard.querySelector('.spot-content');
  const name = spotContent.querySelector('h3').textContent;
  const building = spotContent.querySelector('p:nth-child(2)').textContent.replace('Building: ', '');
  const floor = spotContent.querySelector('p:nth-child(3)').textContent.replace('Floor: ', '');
  const hasOutlet = spotContent.querySelector('p:nth-child(4)').textContent.includes('Yes');
  const noiseLevel = spotContent.querySelector('p:nth-child(5)').textContent.replace('Noise Level: ', '');

  const form = document.getElementById('add-spot-form');
  form.name.value = name;
  form.building.value = building;
  form.floor.value = floor;
  form.hasOutlet.checked = hasOutlet;
  form.noiseLevel.value = noiseLevel.toLowerCase();

  // Change form submit handler temporarily
  const originalSubmitHandler = form.onsubmit;
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.name.value,
      building: form.building.value,
      floor: form.floor.value,
      hasOutlet: form.hasOutlet.checked,
      noiseLevel: form.noiseLevel.value
    };

    try {
      await api.updateSpot(spotId, formData);
      form.reset();
      loadSpots();
      form.onsubmit = originalSubmitHandler;
    } catch (error) {
      console.error('Error updating spot:', error);
    }
  };
};

// Delete spot function
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
