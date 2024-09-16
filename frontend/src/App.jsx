import React from 'react';
import { Routes, Route } from 'react-router-dom';

import OAuth from './pages/OAuth/OAuth.jsx';
import Content from './pages/Content/Content.jsx';

import './index.css';

export default function App() {

  return (
    <main>
      <header className='header'>Yandex Disk - FastAPI</header>
      <div className='container'>
        <Routes>
          <Route path="/" element={<OAuth />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </div>
    </main>
  );
};
