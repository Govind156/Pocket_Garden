import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Plantcatalog from './components/Plantcatalog';
import Addplant from './components/Addplant';
import Plantdetail from './components/Plantdetail';
import './App.css';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color for plants
    },
    secondary: {
      main: '#8bc34a', // Light green
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Toaster position="top-right" reverseOrder={false} />
          <main style={{ padding: '20px', minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<Plantcatalog />} />
              <Route path="/add-plant" element={<Addplant />} />
              <Route path="/plant/:id" element={<Plantdetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 