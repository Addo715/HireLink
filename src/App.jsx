import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProfessionalDetails from './pages/ProfessionalDetails'
import ApplicationForm from './pages/ApplicationForm'



const App = () => {
  return (
    <div>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path="/:slug" element={<ProfessionalDetails />} />
       
            <Route path="/apply/:slug" element={<ApplicationForm />} />
            
      
        

      </Routes>
    </div>
  )
}

export default App

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MatchCard from './components/MatchCard';
// // import ProfessionalDetails from './components/ProfessionalDetails';
// import Footer from './components/Footer';
// import ProfessionalDetails from './components/Professionaldetails';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<MatchCard />} />
//         <Route path="/professional/:slug" element={<ProfessionalDetails />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;
