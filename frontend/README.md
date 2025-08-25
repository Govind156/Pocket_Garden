# Plant Store Frontend

A React-based frontend for the Mini Plant Store application with Material-UI components.

## Features

- **Plant Catalog**: Grid view of all plants with search and filter functionality
- **Search & Filter**: Search by name/category, filter by category, sort by various fields
- **Add Plant**: Admin form to add new plants with validation
- **Plant Details**: Detailed view of individual plants
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Material-UI components with custom theme

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure the backend server is running on `http://localhost:5000`

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── PlantCatalog.js    # Main catalog with search/filter
│   ├── AddPlant.js        # Form to add new plants
│   └── PlantDetail.js     # Detailed plant view
├── App.js                 # Main app component with routing
└── index.js               # App entry point
```

## Features Breakdown

### Plant Catalog
- Grid layout of plant cards
- Search functionality (name and category)
- Category filtering
- Sorting by name, price, care level
- Responsive design for all screen sizes

### Add Plant Form
- Input validation for all fields
- Multiple category selection
- Care level, water needs, and light needs selection
- Stock and availability management
- Form submission with error handling

### Plant Details
- Large plant image display
- Comprehensive plant information
- Care instructions and requirements
- Navigation back to catalog

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Material-UI** - UI component library
- **Axios** - HTTP client for API calls
- **CSS-in-JS** - Styled components with Material-UI

## API Integration

The frontend communicates with the backend API endpoints:
- `GET /api/plants` - Fetch all plants
- `GET /api/plants/:id` - Fetch specific plant
- `POST /api/plants` - Add new plant
- `GET /api/categories` - Fetch all categories
- `GET /api/categories/count` - Fetch total count of each categories

## Responsive Design

- Mobile-first approach
- Grid system that adapts to screen size
- Touch-friendly interface elements
- Optimized layouts for different devices

## Customization

The app uses a custom Material-UI theme with:
- Green color scheme for plant theme
- Custom typography settings
- Consistent spacing and elevation
- Responsive breakpoints 