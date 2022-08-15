import React, { useState } from 'react'
import {Link} from 'react-router-dom';


function Temp() {
  return (
    <Link to={'/myPage/'+ 1}><button>마이페이지</button></Link>
  )
}

export default Temp
