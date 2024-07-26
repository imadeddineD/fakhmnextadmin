import React from 'react'


const layout = ({children} : {children : React.ReactNode}) => {
    
  return (
    <div className=" flex h-full flex-col justify-center items-center gradient-box drop-shadow-md">
        {children}
    </div>
  )
}

export default layout