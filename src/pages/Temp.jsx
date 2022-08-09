import { useState } from 'react'
import {Link} from 'react-router-dom';

const MyPageButton = (e) => {
  return (
    window.location.href = "/myPage/"

  )
}

function Temp() {
  return (
    //<Link to={'/myPage'+1}><button onClick={() => MyPageButton()}>마이페이지</button></Link>
    <Link to={'/myPage/'+ 1}><button>마이페이지</button></Link>
  )
}

export default Temp
