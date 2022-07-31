import { useState } from 'react'
import Modal from 'react-modal'

function MyPage() {
  return (
    <div class="card">
      <div class="card-header">
        <h3 style={{float:"left"}}>나의 Eco Market </h3>
        <h3 style={{float:"right"}}>사용가능 EcoPoint : 3,000P </h3>
      </div>
      <div class="card-body">
        <div>
          <p style={{float:"left"}}>회원정보</p><button style={{float:"right"}}>정보수정</button>
          <table class="table table-bordered">
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
      </div>
    </div>
  )
}

export default MyPage
