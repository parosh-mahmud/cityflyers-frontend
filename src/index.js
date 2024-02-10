import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './components/auth/AuthContext';

// Create a theme object
const theme = createTheme();

// Use ReactDOM.render instead of createRoot
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap your App component inside ThemeProvider and pass the theme object */}
      <ThemeProvider theme={theme}>
        <Router>
          <Provider store={store}>
            <AuthProvider>
            <App />
            </AuthProvider>
          </Provider>
        </Router>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
