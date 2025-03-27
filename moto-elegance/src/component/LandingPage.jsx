// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import video from './Video/porsche-911-in-darkness.3840x2160.mp4'; // Corrected import statement

// const LandingPage = () => {
//     const [counter, setCounter] = useState(0);
//     const navigate = useNavigate();

//     // Function to generate a random number between 0 and 7
//     const getRandomNumber = () => Math.floor(Math.random() * 8); // 0 to 7

//     useEffect(() => {
//         // Set interval to update counter every 100ms for a faster counter
//         const interval = setInterval(() => {
//             if (counter < 100) {
//                 const randomNumber = getRandomNumber();
//                 const newCounter = counter + randomNumber <= 100 ? counter + randomNumber : 100; // Ensure we don't exceed 100
//                 setCounter(newCounter);
//             } else {
//                 // If the counter reaches 100, navigate to the home page
//                 clearInterval(interval); // Clear the interval when done
//                 navigate('/home');
//             }
//         }, 50); // Update every 100ms for faster speed

//         return () => clearInterval(interval); // Cleanup on component unmount
//     }, [counter, navigate]); // Dependencies: re-run when counter changes

//     return (
//         <div 
//             className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat backdrop-blur-md"
//         >
//             <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
//                 <source src={video} type="video/mp4" />
//             </video>
//             <div className="text-[30rem] text-white font-bold z-10 font-Kumar">
//                 {counter}
//             </div>
//         </div>
//     );
// };

// export default LandingPage;
