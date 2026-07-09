import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.tsx';
import ProfileProvider from './context/ProfileContext.tsx';
import MealSuggestionProvider from './context/MealSuggestionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <MealSuggestionProvider>
            <App />
          </MealSuggestionProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
