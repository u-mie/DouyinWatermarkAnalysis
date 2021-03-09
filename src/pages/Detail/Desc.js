import React, { useContext } from 'react'
import { DescContext } from './Detail'
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
function Desc () {
  const desc = useContext(DescContext)
  if (desc) {
    return (
      <Texty className="desc">{desc}</Texty>
    )
  }
  return null
}

export default Desc