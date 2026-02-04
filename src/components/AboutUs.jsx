import React from "react";
// import { assets } from '../assets/assets'
// import about from "../assets/About.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 pb-3">
    <div className="mx-4 sm:mx-[10%] ">
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">Us</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-90 h-120" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHdvcmt8ZW58MHx8MHx8fDA%3D" alt="" />

        {/* right side */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            At <b>HireLink</b>, we're transforming the way job seekers connect with their dream careers
            and how employers find the perfect talent. Our mission is to make job hunting
            faster, smarter, and more efficient by providing a seamless platform that bridges
            the gap between qualified professionals and top companies.
             {/* We believe that finding
            the right job or the right candidate shouldn't be complicated. */}
          </p>

          <p>
            Built with cutting edge technology and an intuitive user interface,
            HireLink helps companies streamline their recruitment process, reduce hiring time,
            and focus on what truly matters finding candidates with the right skills, experience,
            {/* and cultural fit. For job seekers, we provide a comprehensive job search platform
            with advanced filters, personalized recommendations, and direct application features
            that make landing your next role easier than ever. */}
          </p>

          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision is to revolutionize the recruitment industry by creating a global
            platform where opportunities meet talent seamlessly. We aim to empower job seekers
            with the tools they need to showcase their skills and connect with employers who
            value their expertise. At the same time, we're committed to helping businesses
            of all sizes discover exceptional talent quickly and efficiently.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold"> CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamline your job search or hiring process with smart filters, instant applications,
            and realtime job matching that connects the right talent with the right opportunities.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Browse thousands of job listings, apply with one click, and track your applications
            all in one place anytime, anywhere, from any device.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Get personalized job recommendations based on your skills, experience, and preferences.
            Receive tailored insights to help you stand out and land your dream job faster.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;