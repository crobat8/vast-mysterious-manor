import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { GameContextProvider } from './context/GameContext';
import { TileContextProvider } from './context/TileContext';
import { PaladinContextProvider } from './context/PaldinContext';
import { SkeletonContextProvider } from './context/SkeletonContext';
import { SpiderContextProvider } from './context/SpiderContext';
import { ManorContextProvider } from './context/ManorContext';
import { ActionContextProvider } from './context/ActionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <GameContextProvider>
        <TileContextProvider>
          <PaladinContextProvider>
            <SkeletonContextProvider>
              <SpiderContextProvider>
                <ManorContextProvider>
                  <ActionContextProvider>
                    <React.StrictMode>
                      <App/>
                    </React.StrictMode>
                  </ActionContextProvider>
                </ManorContextProvider>
              </SpiderContextProvider>
            </SkeletonContextProvider>
          </PaladinContextProvider>
        </TileContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);