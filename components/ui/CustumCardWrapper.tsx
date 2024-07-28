import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from '../auth/backbutton';
import CustumHeader from './CustumHeader';

const CustumCardWrapper = ({
    children , 
    redirectHref , 
    redirectLabel , 
    headerLabel
} : {
    children : React.ReactNode; 
    redirectHref : string , 
    redirectLabel : string,
    headerLabel : string,
}) => {
  return (
    <Card className=' sm:w-[400px] w-[90%] bg-white rounded-[10px]'>
         <CardHeader>
           <CustumHeader label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
            <BackButton href={redirectHref} label={redirectLabel}/>
        </CardFooter>
    </Card>
  )
}

export default CustumCardWrapper