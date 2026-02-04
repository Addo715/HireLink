import React from 'react'
import Hero from '../components/Hero'
import TrustedBrand from '../components/TrustedBrand'
import QuickApply from '../components/QuickApply'
import MatchCard from '../components/MatchCard'
import FAQ from '../components/FAQ'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonial'
import CallToAction from '../components/CallToAction'
import AboutUs from '../components/AboutUs'

const Home = () => {
  return (
    <div>
        <Hero/>
        <TrustedBrand/>
        <AboutUs/>
        <QuickApply/>
        <MatchCard/>
        <Testimonials/>
        <CallToAction/>
        {/* <FAQ/> */}
        <NewsLetter/>
      
      
    </div>
  )
}

export default Home
