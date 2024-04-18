import React from 'react'
import { Rings } from 'react-loader-spinner'

const Spinner = ({ size }) => {
  return (
    <div>
      <Rings
        height={size || '80'}
        width='80'
        color='#1d4ed8'
        radius='6'
        wrapperStyle={{}}
        wrapperClass=''
        visible
        ariaLabel='rings-loading'
      />
    </div>
  )
}

export default Spinner
