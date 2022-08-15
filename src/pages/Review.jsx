import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom';

const Review = () => {

  const { orderItemId } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8080/mypages/orderItem/'+orderItemId).then((res) => {
      console.log(res);
      setOrderItem({
          orderItemId: res.data.orderItemId,
          itemId: res.data.itemId,
          itemName: res.data.itemName
      })
   })
   },[]);

  const [satisfaction, setSatisfaction] = useState("GOOD");

  const [orderItem, setOrderItem] = useState({
      orderItemId: "",
      itemId: "",
      itemName: ""
  });

  const [review, setReview] = useState({
    memberId : "",
    orderItem : "",
    reviewDescription : "",
    satisfactionType : "",
    reviewDate : ""
  });

  const navigate = useNavigate();

  function handleUseNavigate() {
    navigate('/myPage/'+review.memberId);
  }

  //console.log(orderItem);

  const radioClick = (param) => {
    setSatisfaction(param);
    console.log(satisfaction)
  }

  const Save = () => {
    //params.satisfactionType = document.getElementById("satisfaction").value;
    //params.satisfactionType = satisfaction;

    setReview({
        memberId: "1",
        orderItem: orderItem,
        reviewDescription: document.getElementById("reviewDescription").value,
        satisfactionType: satisfaction,
        reviewDate: new Date()
      })

   console.log(review);

  }

  const SavePost = () => {

    axios
    .post('http://localhost:8081/reviews', review)
    .then((res) => {
      console.log(res.data);
    });

  }

  return (
    <>
      <div style={{width:"800px",height:"1000px"}}>
      <br></br>
      <h5><strong>상품 리뷰 작성</strong></h5>
      <hr></hr>
      <div class="form-floating">
        <textarea class="form-control" type="textarea"></textarea>
        <label class="form-control" id="orderItemName"><h5><strong>상품명 : {orderItem.itemName}</strong></h5></label>
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
        <textarea class="form-control" placeholder="Leave a comment here" id="reviewDescription"  onChange={() => {Save(); }}></textarea>
      </div>
      <br></br>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary me-md-2" type="button" onClick={() => {SavePost(); handleUseNavigate();}}>저장</button>
      </div>
      </div>
    </>
  );
};

export default Review;
