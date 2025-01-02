import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Forever was born out a position for innovation and a desire to revolutionize the way people shop online . Our journy began with a simple idea : to provide a platform where customer can discover , explore , and purchase a wide range of product from the comfort of there home.</p>
            <p>Since our incepection , we've worked tirelessly to create a diverse selection of high quality product that cater to every taste and performance . from fashon and beauty to electronic and home essentials , we offer an extensive collection sourced from trusted brand and suppliers.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>"Our mission is to innovate, empower, and sustain—creating solutions that inspire progress and shape a brighter future."</p>
          </div>
        </div>

        <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>"Committed to excellence, we ensure top-quality standards through rigorous testing, continuous improvement, and reliable results."</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>"Designed for ease, we provide seamless solutions to save you time and simplify your experience.we aim to save you time and effort, ensuring ultimate convenience in every interaction."</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>"Dedicated to excellence, we deliver personalized support to ensure your satisfaction at every step."</p>
          </div>
        </div>
        <NewsLetterBox/>
    </div>
  )
}

export default About