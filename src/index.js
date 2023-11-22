import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { GameContextProvider } from './context/GameContext';
import { TileContextProvider } from './context/TileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <GameContextProvider>
        <TileContextProvider>
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        </TileContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);