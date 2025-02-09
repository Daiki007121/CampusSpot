# CampusSpot (Study Spot Review System)

A web application that helps students discover and share study spots on campus.

## Project Objective

This application allows students to:
- Share their favorite study locations on campus
- Find study spots with specific amenities (like power outlets)
- Read and write reviews about study locations

## Features

- Add new study spots with details (building, floor, amenities)
- Browse existing study spots
- Write and read reviews
- Filter spots by various criteria

## Design Mockups

### Main Page Layout

Header
- CampusSpot logo/title at the top center  
- Clean, minimalist design  

Main Content

Add New Study Spot Section
- Form at the top of the page**
  - Input fields:**
    - Spot Name (text input)
    - Building (text input)
    - Floor (text input)
    - Power Outlets (checkbox)
    - Noise Level(dropdown)
  - Submit button below form

Study Spots List Section
- Grid layout of spot cards
- Each card contains:
  - Spot name as header
  - Building and floor info
  - Power outlet availability
  - Noise level indicator**
  - Show Reviews button



## Technologies Used

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Development Tools: ESLint, Prettier

## Setup Instructions

1. Clone the repository
```bash
git clone [your-repository-url]
cd campus-spot
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Run the application
```bash
npm run dev
```

## Project Structure
```
campus-spot/
├── public/          # Static files
├── src/             # Server-side code
│   ├── db/         # Database connection
│   └── routes/     # API routes
└── package.json
```

## Author
Daiki Koike 

## Class Link
https://johnguerra.co/classes/webDevelopment_spring_2025/

## License
This project is licensed under the MIT License - see the LICENSE file for details.
