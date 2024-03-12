import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MainProvider } from './context/MainContext.tsx';

import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MainProvider>
  </React.StrictMode>
);
