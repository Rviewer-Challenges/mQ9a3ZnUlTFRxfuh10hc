import React, { FC } from 'react'

type modalProp = {
    children: React.ReactNode
}

const ModalLayout: FC<modalProp> = ({children}) => {
  return (
    <div className='absolute w-full right-0 left-0 h-screen inset-0 backdrop-blur-sm flex items-center'>
      <div className='bg-white max-w-4xl mx-auto rounded-lg shadow-lg flex-1 px-6 lg:px-8 lg:py-7 py-5'>
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
