import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { GameContextProvider } from './context/GameContext';
import { TileContextProvider } from './context/TileContext';
import { PaladinContextProvider } from './context/PaldinContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <GameContextProvider>
        <TileContextProvider>
          <PaladinContextProvider>
            <React.StrictMode>
              <App/>
            </React.StrictMode>
          </PaladinContextProvider>
        </TileContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);