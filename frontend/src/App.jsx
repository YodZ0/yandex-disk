import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './OAuthContext.jsx';
import OAuth from './pages/OAuth/OAuth.jsx';
import Content from './pages/Content/Content.jsx';

import './index.css';

function ProtectedRoute({ children }) {
  const { isLogged } = useAuth(); // Здесь мы используем контекст, так как компонент уже обернут в провайдер

  return isLogged ? children : <Navigate to="/" />;
}

export default function App() {

  return (
    <AuthProvider>
      <main>
        <header className='header'>Yandex Disk - FastAPI</header>
        <div className='container'>
          <Routes>
            <Route path="/" element={<OAuth />} />
            <Route
              path="/content"
              element={
                <ProtectedRoute>
                  <Content />
                </ProtectedRoute>}
            />
          </Routes>
        </div>
      </main>
    </AuthProvider>
  );
};
