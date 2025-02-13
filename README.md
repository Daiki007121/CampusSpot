# CampusSpot

A web application for discovering and sharing study spots on campus.

## Author
Daiki Koike

## Class Link
[Web Development Spring 2025](https://johnguerra.co/classes/webDevelopment_spring_2025/)

## Project Demo
[Live Demo](https://campus-spot-x.vercel.app)

## Project Objective
CampusSpot helps students find and share the best study spots on campus. Users can:

- Discover study locations
- View spot details (power outlets, noise level, etc.)
- Share their experiences through reviews and ratings
- Browse other students' recommendations
- Sort spots by newest first

## Screenshots
![CampusSpot Main Interface](./docs/images/campus-spot-main.png)
Main interface showing the spot submission form and list of available study spots.

![CampusSpot Reviews](./docs/images/campus-spot-reviews.png)
Review system with 5-star rating and comments.

## Technologies Used
- Frontend: Vanilla JavaScript, HTML5, CSS3
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: Vercel
- Development Tools: 
  - ESLint
  - Prettier
  - Claude 3.5 Sonnet (AI assistance for development and documentation)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account
- npm or yarn
- Git

### Installation
1. Clone the repository:
```bash
git clone [your-repo-url]
cd campus-spot-x
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your MongoDB connection string
   - Update other environment variables as needed
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Start production server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure
```
campus-spot-x/
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
├── server/
│   ├── routes/
│   ├── db/
│   └── server.js
└── docs/
    └── images/
```

## API Documentation
The application provides the following API endpoints:

### Spots
- GET `/api/spots` - Get all study spots (sorted by newest first)
- POST `/api/spots` - Create a new study spot
- PUT `/api/spots/:id` - Update a study spot
- DELETE `/api/spots/:id` - Delete a study spot
- GET `/api/spots/:id` - Get specific spot details

### Reviews
- GET `/api/reviews/spot/:spotId` - Get reviews for a specific spot
- POST `/api/reviews` - Create a new review

## Development
This project was developed using:
- ESLint for code quality
- Prettier for code formatting
- Claude 3.5 Sonnet for AI-assisted development and documentation
- Modular CSS organization
- Vanilla JavaScript for client-side rendering

## License
This project is licensed under the MIT License - see the LICENSE file for details.
