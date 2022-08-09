import React from 'react'
import ReactDOM from 'react-dom/client'
import MyPage from './pages/MyPage'
import Temp from './pages/Temp'
import Review from './pages/Review'
import Review2 from './pages/Review2'
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
        <Route path="/review2/" element={<Review2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
