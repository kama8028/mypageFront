import { useState, useEffect, useRef } from 'react'
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import axios from 'axios';

function MyPage() {

  const { id } = useParams();

  const [myInfo, setMyInfo] = useState({
    memberId : "",
    name : "",
    email : "",
    phone : "",
    ecoPoint : ""
   })

  const [myAddress, setMyAddress] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const [myDisposal, setMyDisposal] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/mypages/'+id).then((res) => {
      console.log(res);
      setMyInfo({memberId: res.data.memberId,
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                ecoPoint: res.data.ecoPoint});
      setMyAddress(res.data.myAddressList);
      setMyOrder(res.data.myOrderDto);
      setMyDisposal(res.data.myDisposalDto);
   })
   },[]);

  console.log(myInfo);
  console.log(myAddress);
  console.log(myOrder);
  console.log(myDisposal);

  const myAddressComponent = myAddress.map((item, index) => (
    <tr key={index}>
      <th>{item.addressType}</th>
      <td>{item.basAddr} {item.dtlAddr}</td>
    </tr>
  ));

  function Welcome(props) {
    if(props==="배송완료")
    return <button>리뷰버튼</button>;
  }
  
  const myOrderComponent = myOrder.map((item, index) => (
    item.orderItems.map((item2, index2) => (
      <tr key={index2}>
        <td>{item.orderDate}</td>
        <td>{item2.orderItemName}</td>
        <td>{item2.price}</td>
        <td>{item2.qty}</td>
        <td>{item2.deliveryStatus} <br></br> {Welcome(item2.deliveryStatus)}</td>
      </tr>
    ))
  ));

  const myDisposalComponent = myDisposal.map((item, index) => (
    item.disposalItems.map((item2, index2) => (
      <tr key={index2}>
        <td>{item.disposalDate}</td>
        <td>{item2.disposalItemName}</td>
        <td>{item2.point}P</td>
        <td>{item2.qty}</td>
        <td>{item.branchName}</td>
      </tr>
    ))
  ));

  return (
    <div class="card">
      <div class="card-header">
        <h3 style={{float:"left"}}>나의 Eco Market </h3>
        <h3 style={{float:"right"}}>사용가능 EcoPoint : {myInfo.ecoPoint} </h3>
      </div>
      <div class="card-body">
          <div style={{float:"left", width:"100%"}}>
          <div style={{float:"left", width:"49%"}}>
            <p style={{float:"left"}}><strong>회원정보</strong></p><button style={{float:"right"}}>정보수정</button>
            <table class="table table-bordered text-center">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>{myInfo.name}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{myInfo.email}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{myInfo.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{float:"right", width:"49%"}}>
            <p style={{float:"left"}}><strong>배송지주소</strong></p><button style={{float:"right"}}>정보수정</button>
            <table class="table table-bordered text-center">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">주소</th>
                </tr>
              </thead>
              <tbody>
                {myAddressComponent}
                {/* <tr>
                  <th>기본1</th>
                  <td>경기도 성남시 분당구 백현로 206, Eco 아파트 101동 101호</td>
                </tr>
                <tr>
                  <th>기본2</th>
                  <td>경기도 수원시 팔달구 Eco로 111, 환경아파트 101동 101호</td>
                </tr>
                <tr>
                  <th>직장</th>
                  <td>경기도 성남시 분당구 수내로 101, 지웰푸르지오 5층</td>
                </tr> */}
              </tbody>
            </table>
          </div>
          </div>
          <div>
              <p style={{float:"left"}}><strong>배송 상품 주문 정보</strong></p>
              <table class="table table-bordered text-center">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">주문일자</th>
                  <th scope="col">주문상품정보</th>
                  <th scope="col">결제금액</th>
                  <th scope="col">수량(개)</th>
                  <th scope="col">주문상태</th>
                </tr>
              </thead>
              <tbody>
                {myOrderComponent}
                {/* <tr>
                  <td>2022-06-17</td>
                  <td>친환경노트</td>
                  <td>5,000원</td>
                  <td>1</td>
                  <td>배송중</td>
                </tr>
                <tr>
                  <td>2022-05-23</td>
                  <td>폐타이어가방</td>
                  <td>70,000원</td>
                  <td>1</td>
                  <td>배송완료</td>
                </tr>
                <tr>
                  <td>2022-05-23</td>
                  <td>친환경비닐봉투</td>
                  <td>5,000원</td>
                  <td>1</td>
                  <td>배송완료</td>
                </tr> */}
              </tbody>
              </table>
            </div>
            <div>
              <p style={{float:"left"}}><strong>Eco 포인트 적립 이력</strong></p>
              <table class="table table-bordered text-center">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">배출일자</th>
                  <th scope="col">배출상품</th>
                  <th scope="col">적립포인트</th>
                  <th scope="col">수량(개) or 무게(kg)</th>
                  <th scope="col">배출지점</th>
                </tr>
              </thead>
              <tbody>
                {myDisposalComponent}
                {/* <tr>
                  <td>2022-05-12</td>
                  <td>페트병</td>
                  <td>2,000P</td>
                  <td>20개</td>
                  <td>판교지점</td>
                </tr>
                <tr>
                  <td>2022-05-12</td>
                  <td>유리병</td>
                  <td>1,000P</td>
                  <td>5개</td>
                  <td>판교지점</td>
                </tr>
                <tr>
                  <td>2022-04-30</td>
                  <td>종이</td>
                  <td>1,000P</td>
                  <td>1kg</td>
                  <td>야탑지점</td>
                </tr>
                <tr>
                  <td>2022-04-30</td>
                  <td>캔</td>
                  <td>1,000P</td>
                  <td>10개</td>
                  <td>야탑지점</td>
                </tr>
                <tr>
                  <td>2022-04-30</td>
                  <td>유리병</td>
                  <td>1,000P</td>
                  <td>10개</td>
                  <td>수내지점</td>
                </tr> */}
              </tbody>
              </table>
        </div>
      </div>

    </div>
  )
}

export default MyPage
