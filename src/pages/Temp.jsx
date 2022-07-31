import { useState } from 'react'

const MyPageButton = (e) => {
  return (
    window.location.href = "/myPage"
  )
}


function Temp() {
  return (
    <button onClick={() => MyPageButton()}>마이페이지</button>
  )
}

export default Temp
