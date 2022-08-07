import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

function MyPage() {

  let id = 1;

   const [myInfo, setMyInfo] = useState({
     memberId : "",
     name : "",
     email : "",
     phone : "",
     ecoPoint : ""
   })

   const [myAddress, setMyAddress] = useState([{
      addressId : "",
      memberId : "",
      addressType : "",
      basAddr : "",
      dtlAddr : ""
   }])

  // useEffect(() => {
  //   axios.get('http://localhost:8080/mypages/'+id).then((res) => {
  //     console.log(res);
  //     setData(res.data._embedded.people);
  //   });
  // }, [a]);

  useEffect(() => {
    axios.get('http://localhost:8080/mypages/'+id).then((res) => {
      // console.log(res);
      // // setMyInfo({memberId: res.data.memberId,
      // //           name: res.data.name,
      // //           email: res.data.email,
      // //           phone: res.data.phone,
      // //           ecoPoint: res.data.ecoPoint});
      //  setMyAddress({addressId: res.data.myAddressList[0].addressId,
      //                memberId: res.data.myAddressList[0].memberId,
      //                addressType: res.data.myAddressList[0].addressType,
      //                basAddr: res.data.myAddressList[0].basAddr,
      //                dtlAddr: res.data.myAddressList[0].dtlAddr});
        setMyAddress(...myAddress, res.data.myAddressList);

    })
      // console.log(myInfo);
      //console.log(myAddress);
      //setMyData(myData, res);
      //console.log(myData);
    },[]);

    console.log(myAddress);

    //console.log(myData);

  return (
    <div class="card">
      <div class="card-header">
        <h3 style={{float:"left"}}>나의 Eco Market </h3>
        <h3 style={{float:"right"}}>사용가능 EcoPoint : 3,000P </h3>
      </div>
      <div class="card-body">
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
                  <td>한용선</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>kama8028@naver.com</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>010-3847-4206</td>
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
                <tr>
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
                </tr>
              </tbody>
            </table>
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
                <tr>
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
                </tr>
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
                <tr>
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
                </tr>
              </tbody>
              </table>
        </div>
      </div>

    </div>
  )
}

export default MyPage
