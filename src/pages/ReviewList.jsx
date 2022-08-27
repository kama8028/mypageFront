import { useState, useEffect, useRef } from 'react'
import {BrowserRouter, Routes, Route, useParams, Link} from 'react-router-dom';
import axios from 'axios';

function ReviewList() {

  const { itemId } = useParams();
  const [reviewCnt, setreviewCnt] = useState();
  const [reviewItem, setReviewItem] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/reviews/reviewItem/'+itemId).then((res) => {
      console.log(res);
      console.log(res.data.length);
      setReviewItem(res.data);
      setreviewCnt(res.data.length);
   })
   },[]);

  const reviewItemComponent = reviewItem.map((item, index) => (
    <>
    <hr></hr>
    <div key={index} class="card-body">
      <p>작성일 : {item.reviewDate} </p>
      <p>상품명 : {item.orderItem.itemName}</p>
      <p>만족도 : {item.satisfactionType}</p>
      <p>리뷰 : {item.reviewDescription} </p>
    </div>
    </>
  ));

  return (
    <>
    <div class="card">
      <div class="card-header">
        <h3>전체 리뷰 : {reviewCnt}건</h3>
      </div>
      {reviewItemComponent}
    </div>
    </>
  )
}

export default ReviewList
