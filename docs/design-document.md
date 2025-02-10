# CampusSpot Design Document

## Project Description
CampusSpot is a web application that helps students find and share study spots on campus. The application focuses on providing detailed information about each study location, including essential features like power outlet availability and noise levels. Students can browse existing spots and contribute new locations to help build a comprehensive database of campus study spaces.

## User Personas

### 1. The Solo Studier
- **Name**: Maya Tanaka
- **Age**: 19
- **Role**: First-year University Student
- **Goals**: 
  - Find quiet places to focus on individual study
  - Access to power outlets for laptop use
  - Prefers learning about noise levels before visiting
- **Pain Points**:
  - Difficulty finding quiet spots during peak hours
  - Wastes time looking for spots with power outlets
  - Often unsure about the study environment before arriving

### 2. The Library Regular
- **Name**: James Wilson
- **Age**: 21
- **Role**: Third-year Student
- **Goals**:
  - Share knowledge about the best library spots
  - Help others find good study locations
  - Track different spots across campus buildings
- **Pain Points**:
  - No easy way to share favorite spots
  - Difficulty remembering which floors have the best spots
  - Wants to help others but lacks a platform

## User Stories

1. As a new student, I want to see a list of study spots in the library so that I can find a suitable place to study.

2. As a regular campus user, I want to add new study spots to the system so that I can share my discoveries with others.

3. As a student with a laptop, I want to know if a study spot has power outlets so that I can study for extended periods.

4. As a focused learner, I want to filter study spots by noise level so that I can find a quiet place to concentrate.

5. As a helpful student, I want to leave reviews for study spots so that others can benefit from my experience.

## Features and Requirements

### Core Features (Implemented)
1. Study Spot Listing
   - View all available study spots
   - Display spot name and location details
   - Show building and floor information
   - Indicate power outlet availability
   - Display noise level information

2. Spot Submission
   - Add new study spots
   - Input form with essential details:
     - Spot name
     - Building
     - Floor
     - Power outlet availability
     - Noise level selection

### Technical Implementation
1. Frontend
   - Vanilla JavaScript for client-side rendering
   - Modular CSS organization
   - Responsive design
   - Form validation

2. Backend
   - Node.js with Express
   - MongoDB for data storage
   - RESTful API endpoints:
     - GET /api/spots
     - POST /api/spots
     - GET /api/reviews/spot/:spotId
     - POST /api/reviews

3. Data Models
   - Spots Collection:
     ```json
     {
       "name": "String",
       "building": "String",
       "floor": "String",
       "hasOutlet": "Boolean",
       "noiseLevel": "String"
     }
     ```
   - Reviews Collection:
     ```json
     {
       "spotId": "ObjectId",
       "rating": "Number",
       "comment": "String",
       "createdAt": "Date"
     }
     ```

## Design Mockups
Current implementation matches the following design elements:

1. Main Page Layout
   - Header with application name
   - Study spot submission form
   - List of study spots in card format

2. Spot Submission Form
   - Organized input fields
   - Clear labels
   - Submission button
   - Validation feedback

3. Spot Display Cards
   - Consistent card layout
   - Essential information display
   - Review access button

## Future Enhancements
1. User Authentication
   - Allow users to create accounts
   - Track spot submissions by user
   - Enable user-specific features

2. Advanced Filtering
   - Filter by building
   - Sort by rating
   - Search functionality

3. Enhanced Reviews
   - Rating system
   - Photo uploads
   - More detailed review criteria

4. Social Features
   - Favorite spots
   - Share spots
   - Comment on reviews
