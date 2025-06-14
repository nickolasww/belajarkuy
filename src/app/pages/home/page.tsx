import React from 'react'
import Navbar from '@/app/components/navbar/navbar'
import Jumbotron from '@/app/pages/home/partials/jumbotron'
import BestSell from '@/app/pages/home/partials/bestsell'
import Quiz from '@/app/pages/home/partials/quiz'
import How from '@/app/pages/home/partials/how'
import Footer from '@/app/components/footer/footer'

const page = () => {
  return (
    <div>
        <Navbar/>
        <Jumbotron/>
        <BestSell/>
        <Quiz/>
        <How/> 
        <Footer/>
    </div>
  )
}

export default page
