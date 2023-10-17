import React, { FC } from 'react'

type modalProp = {
    children: React.ReactNode
}

const ModalLayout: FC<modalProp> = ({children}) => {
  return (
    <div className='absolute w-full right-0 top-0 left-0 h-screen bg-black bg-opacity-75 lg:px-0 px-6 flex items-center'>
      <div className='bg-white max-w-2xl mx-auto rounded-lg shadow-lg flex-1 px-6 lg:px-8 lg:py-7 py-5'>
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
