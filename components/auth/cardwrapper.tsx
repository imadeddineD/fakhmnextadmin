import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Header from './header';
import BackButton from './backbutton';

const CardWrapper = ({
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
    <Card className=' max-w-[400px] w-[90%] bg-white rounded-[10px]'>
         <CardHeader>
           <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
            <BackButton href={redirectHref} label={redirectLabel}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper