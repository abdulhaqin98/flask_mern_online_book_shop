import React, { useEffect } from 'react'

const Imgcontainer = ({ imgUrl }) => {

  useEffect(() => {
    console.log('imgcontainer imageurl' + imgUrl);
  },[])

  return (
    <div>
        <img src={imgUrl} width="100%" />
    </div>
  )
}

export default Imgcontainer