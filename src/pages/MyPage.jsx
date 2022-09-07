import { useState, useEffect, useContext, useRef } from 'react'
import {BrowserRouter, Routes, Route, useParams, Link, useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import ContextAPI from "../ContextAPI";

function MyPage() {

  const navigate = useNavigate();
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType);
  // ======= 사용 end

  //context.memberId = 1;

  const { id } = useParams();

  const [myInfo, setMyInfo] = useState({
    memberId : "",
    name : "",
    email : "",
    phone : "",
    ecoPoint : "3000"
   })

  const [myAddress, setMyAddress] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const [myDisposal, setMyDisposal] = useState([]);

//   useEffect(() => {
//     //axios.get('http://localhost:8080/mypages/'+id).then((res) => {
//     //axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/mypages/'+id).then((res) => {
//     axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/members/memberId/'+id).then((res) => {
//       console.log(res);
//       setMyInfo({memberId: res.data.id,
//                 name: res.data.name,
//                 email: res.data.email,
//                 //phone: res.data.phone,
//                 phone: res.data.phoneNumber,
//                 //ecoPoint: res.data.ecoPoint
//               });
//       //setMyAddress(res.data.myAddressList);
//       setMyOrder(res.data.myOrderDto);
//       setMyDisposal(res.data.myDisposalDto);
//    })

// //    axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/mypages/'+id).then((res1) => {
// //     console.log(res1);
// //     setMyAddress(res1.data.myAddressList);
// //     setMyOrder(res1.data.myOrderDto);
// //     setMyDisposal(res1.data.myDisposalDto);
// //  })
// },[]);

useEffect(() => {
     axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/members/memberId/'+context.memberId).then((res) => {
       console.log(res);
       setMyInfo({memberId: res.data.id,
                 name: res.data.name,
                 email: res.data.email,
                 //phone: res.data.phone,
                 phone: res.data.phoneNumber,
                 //ecoPoint: res.data.ecoPoint
                 ecoPoint: '3,000'
               });
//       //setMyAddress(res.data.myAddressList);
//       setMyOrder(res.data.myOrderDto);
//       setMyDisposal(res.data.myDisposalDto);
    })

    axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/deliveryAddresses/search/findByMemberId?memberId='+context.memberId+'&projection=with-address').then((res) => {
      console.log(res);
      setMyAddress(res.data._embedded.deliveryAddresses);
    });


  axios.get('http://k8s-ecomarke-ecomarke-58be675e99-1138815434.ap-northeast-2.elb.amazonaws.com/mypages/'+context.memberId).then((res) => {
  console.log(res);
  // setMyInfo({memberId: res.data.id,
  //           name: res.data.name,
  //           email: res.data.email,
  //           phone: res.data.phone,
  //           phone: res.data.phoneNumber,
  //           ecoPoint: res.data.ecoPoint
  //         });
  //setMyAddress(res.data.myAddressList);
  setMyOrder(res.data.myOrderDto);
  setMyDisposal(res.data.myDisposalDto);
})
},[]);

  console.log(myInfo);
  console.log(myInfo.memberId);
  console.log(myAddress);
  console.log(myOrder);
  console.log(myDisposal);

  const myAddressComponent = myAddress.map((item, index) => (
    <tr key={index}>
      {/* <th>{item.addressType}</th>
      <td>{item.basAddr} {item.dtlAddr}</td> */}
      <th>{item.deliveryPlace}</th>
      <td>{item.basAddr} {item.dtlAddr}</td>
    </tr>
  ));

  function Welcome(item, item2) {
    console.log(item2);
    console.log(item2.orderItemId);
    console.log(item2.reviewId);
    if(item.deliveryStatus==="배송완료")
    return <Link to={'/review/'+item2.orderItemId}><button>리뷰등록</button></Link>;
  };

  const myOrderComponent = myOrder.map((item, index) => (
    item.orderItems.map((item2, index2) => (
      <tr key={index2}>
        <td>{item.orderDate}</td>
        <td>{item2.itemName}</td>
        <td>{item2.price}</td>
        <td>{item2.qty}</td>
        <td>{item.deliveryStatus} <br></br> {Welcome(item, item2)}</td>
      </tr>
    ))
  ));

  const myDisposalComponent = myDisposal.map((item, index) => (
    item.disposalItems.map((item2, index2) => (
      <tr key={index2}>
        <td>{item.disposalDate}</td>
        <td>{item2.recycleItemName}</td>
        <td>{item2.point}P</td>
        <td>{item2.qty}</td>
        <td>{item.branchName}</td>
      </tr>
    ))
  ));

  function updateMember(value){
     navigate('/SaveMember', {state:{value: value}})
  };

  function updateAddress(){
    navigate('/deliveryAddress')
 };

  return (
    <div class="card">
      <div class="card-header">
        <h3 style={{float:"left"}}>나의 Eco Market </h3>
        <h3 style={{float:"right"}}>사용가능 EcoPoint : {myInfo.ecoPoint} </h3>
      </div>
      <div class="card-body">
          <div style={{float:"left", width:"100%"}}>
          <div style={{float:"left", width:"49%"}}>
            <p style={{float:"left"}}><strong>회원정보</strong></p><button style={{float:"right"}} onClick={()=>updateMember(context.memberId)}>정보수정</button>
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
            <p style={{float:"left"}}><strong>배송지주소</strong></p><button style={{float:"right"}} onClick={()=>updateAddress()}>정보수정</button>
            <table class="table table-bordered text-center">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">주소</th>
                </tr>
              </thead>
              <tbody>
                {myAddressComponent}
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
              </tbody>
              </table>
        </div>
      </div>

    </div>
  )
}

export default MyPage
