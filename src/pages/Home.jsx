import React from 'react'
import Hero from '../components/Hero'
import TrustedBrand from '../components/TrustedBrand'
import QuickApply from '../components/QuickApply'
import MatchCard from '../components/MatchCard'
import FAQ from '../components/FAQ'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonial'

const Home = () => {
  return (
    <div>
        <Hero/>
        <TrustedBrand/>
        <QuickApply/>
        <MatchCard/>
        <Testimonials/>
        {/* <FAQ/> */}
        <NewsLetter/>
      
      
    </div>
  )
}

export default Home
