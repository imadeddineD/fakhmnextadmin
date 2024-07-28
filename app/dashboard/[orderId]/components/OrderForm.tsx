import CardWrapper from '@/components/auth/cardwrapper'
import CustumCardWrapper from '@/components/ui/CustumCardWrapper'
import React from 'react'

const OrderForm = ({
    initialData
} : any) => {
  return (
    <CustumCardWrapper
    redirectLabel="إضغط هنا للعودة إلى اللوحة"
    redirectHref="/dashboard"
    headerLabel="عرض الطلب"
    >
        <div className=' flex flex-col gap-5 justify-center items-center'>
            <div className=' flex flex-col gap-2'>
                <p className=' text-[22px] font-bold '>إسم الزبون:</p>
                <p className='text-[18px] '>{initialData.name}</p>
            </div>
            <div>
              <p className=' text-[22px] font-bold '>رقم الزبون:</p>
              <p className=' text-[18px]  '>{initialData.number}</p>
            </div>
            <div>
              <p className=' text-[22px] font-bold '>طلب الزبون:</p>
              <p className=' text-[18px]  '>{initialData.message}</p>    
            </div>
        </div>
    </CustumCardWrapper>
  )
}

export default OrderForm