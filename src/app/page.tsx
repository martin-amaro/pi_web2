import React from 'react'
import Hero from './ui/home/Hero'
import Partners from './ui/home/Partners'
import HeroFeature from './ui/home/HeroFeature'
import FeatureCards from './ui/home/FeatureCards'
import MainTestimonial from './ui/home/MainTestimonial'
import Categories from './ui/home/Categories'
import Testimonials from './ui/home/Testimonials'
import FAQ from './ui/home/FAQ'
import LastHook from './ui/home/LastHook'

export default function page() {
  return (
    <>
      <Hero />
      <Partners />
      <HeroFeature />
      <FeatureCards />
      <MainTestimonial />
      <Categories />
      <Testimonials />
      <FAQ />
      <LastHook />
    </>
  )
}
