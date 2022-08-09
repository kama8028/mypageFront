import React from 'react'
import ReactDOM from 'react-dom/client'
import MyPage from './pages/MyPage'
import Temp from './pages/Temp'
import Review from './pages/Review'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/myPage/:id" element={<MyPage />} />
        <Route path="/review/" element={<Review />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
