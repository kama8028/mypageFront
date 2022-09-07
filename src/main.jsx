import React from 'react'
import ReactDOM from 'react-dom/client'
import MyPage from './pages/MyPage'
import Temp from './pages/Temp'
import Review from './pages/Review'
import ReviewList from './pages/ReviewList'
import SaveMember from './pages/SaveMember'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//<Route path="/review/:orderId/:orderItemId" element={<Review />} />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/myPage/:id" element={<MyPage />} />
        <Route path="/review/:orderItemId" element={<Review />} />
        <Route path="/reviewList/:itemId" element={<ReviewList />} />
        <Route path="/SaveMember" element={<SaveMember />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
