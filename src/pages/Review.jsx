import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom';

const Save = (params, e) => {
  params.satisfactionType = document.getElementById("satisfaction").value
  params.reviewDescription = document.getElementById("reviewDescription").value
  params.orderItem.orderItemId = "1"
  params.orderItem.orderItemName = "친환경노트"

  //console.log(params)

  axios
  .post('http://localhost:8080/reviews', params)
  .then((res) => {
    console.log(res.data);
  });

}

const Review = () => {
  const { order } = useParams();

  console.log(order);

  let orderItemName = "친환경노트";
  const [satisfaction, setSatisfaction] = useState("GOOD");
  const [orderItem, setorderItem] = useState({
    orderItemId:  "1",
    orderItemName: "친환경노트"
  })

  const params = {
    memberId : "1",
    orderItem : {orderItem},
    reviewDescription : "",
    satisfactionType : "",
    reviewDate : new Date()
  };

  const radioClick = (params) => {
    //console.log(params)
    setSatisfaction(params)
    //console.log(satisfaction)
  }

  return (
    <>
      <div style={{width:"800px",height:"1000px"}}>
      <br></br>
      <h5><strong>상품 리뷰 작성</strong></h5>
      <hr></hr>
      <div class="form-floating">
        <textarea class="form-control" type="textarea"></textarea>
        <label class="form-control" id="orderItemName"><h5><strong>상품명 : {orderItemName}</strong></h5></label>
      </div>
      <br></br>
      <div>
        <strong>상품만족도</strong>&nbsp;&nbsp;
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" value="GOOD" onClick={() => radioClick("GOOD")}/>&nbsp;좋음&nbsp;</label>
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" value="NORMAL" onClick={() => radioClick("NORMAL")}/>&nbsp;보통&nbsp;</label>
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" value="BAD" onClick={() => radioClick("BAD")}/>&nbsp;나쁨&nbsp;</label>
      </div>
      <br></br>
      <strong>리뷰 작성란</strong>&nbsp;&nbsp;
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="reviewDescription"></textarea>
      </div>
      <br></br>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary me-md-2" type="button" onClick={() => Save(params)}>저장</button>
      </div>
      </div>
    </>
  );
};

export default Review;
