// import CardWrapper from '@/components/auth/CardWrapper'
import CardWrapper from '@/components/auth/cardwrapper'
import Loginform from '@/components/auth/loginform'
import React from 'react'

const page = () => {
  return (
    <CardWrapper
    redirectLabel="إذا لم يكن لديك حساب اضغط هنا"
    redirectHref="/auth/register"
    headerLabel="مرحبًا بعودتك"
    >
        <Loginform/>
    </CardWrapper>
  )
}

export default page