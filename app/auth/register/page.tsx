// import CardWrapper from '@/components/auth/CardWrapper'
import CardWrapper from '@/components/auth/cardwrapper'
import Loginform from '@/components/auth/loginform'
import RegisterForm from '@/components/auth/registerform'
// import RegisterForm from '@/components/auth/registerform'
import React from 'react'

const page = () => {
  return (
    <CardWrapper 
    redirectLabel="هل لديك حساب"
    redirectHref="/auth/login"
    headerLabel="مرحبا بك في إنشاء حساب"
    >
        <RegisterForm/>
    </CardWrapper>
  )
}

export default page