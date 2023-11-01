import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';
import { GameContextProvider } from './context/GameContext';
import { SearchingContextProvider } from './context/SearchingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UserContextProvider>
        <GameContextProvider>
          <SearchingContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </SearchingContextProvider>
        </GameContextProvider>
      </UserContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);