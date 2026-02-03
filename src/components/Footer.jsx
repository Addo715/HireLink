import React from 'react';
// import logo from '../assets/samslist_logo_nov2024.avif'; 

const Footer = () => {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      
        * {
          font-family: "Poppins", sans-serif;
        }
      `}</style>

      <footer className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-7xl mx-auto'>

          <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

            {/* Brand */}
            <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
              {/* <img src={logo} alt="footer logo" width="100" height="100" /> */}

              <div className='w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>

              <p className='text-sm text-white/60 mt-6 max-w-sm leading-relaxed'>
                HireLink is a modern job marketplace connecting talented professionals with trusted companies across multiple career paths.
              </p>
            </div>

            {/* Company */}
            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Company</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>About HireLink</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Careers</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Contact Us</a>
              </div>
            </div>

            {/* Legal */}
            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Legal</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Terms of Use</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
              </div>
            </div>

            {/* Job Categories */}
            <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className='text-sm text-white font-medium'>Jobs</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Tech Jobs</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Design Jobs</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Finance Jobs</a>
                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Remote Jobs</a>
              </div>
            </div>

          </div>

          <div className='w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black'></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className='text-xs text-white/60'>© 2025 HireLink</p>
            <p className='text-xs text-white/60 max-w-2xl text-center md:text-right'>
              HireLink is a hiring platform. We do not guarantee employment or job placement. Employers are responsible for their listings and hiring decisions.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
