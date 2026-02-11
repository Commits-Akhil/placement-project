'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function Home() {
 const router = useRouter();
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const bgStyle = "min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4";
 
 useEffect(() => {
   const auth = localStorage.getItem('isAuthenticated');
   setIsAuthenticated(auth === 'true');
 }, []);

 const handleLogout = () => {
   localStorage.removeItem('isAuthenticated');
   localStorage.removeItem('placementProfile');
   setIsAuthenticated(false);
   window.dispatchEvent(new Event('storage'));
 };

  return (
   <div className={bgStyle}>
     <div className="text-center">
       <h1 className="text-5xl font-bold text-[#EEEEEE] mb-8">
         Placement Preparation Advisor
       </h1>
        <p className="text-xl text-[#EEEEEE] mb-12">
         Get personalized advice powered by Gemini AI
        </p>
       <div className="flex flex-wrap justify-center gap-4">
         <button onClick={() => router.push('/opportunities')} className="bg-[#EEEEEE] text-[#222831] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] transition-colors">
           Jobs
         </button>
         <button onClick={() => router.push('/quiz')} className="bg-[#EEEEEE] text-[#222831] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] transition-colors">
           Quiz
         </button>
         <button onClick={() => router.push('/profile')} className="bg-[#EEEEEE] text-[#222831] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] transition-colors">
           Profile
         </button>
         {isAuthenticated ? (
           <button onClick={handleLogout} className="bg-[#00ADB5] text-[#EEEEEE] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#393E46] transition-colors">
             Logout
           </button>
         ) : (
           <button onClick={() => router.push('/Login')} className="bg-[#00ADB5] text-[#EEEEEE] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#393E46] transition-colors">
             Login
           </button>
         )}
       </div>
     </div>
   </div>
 );
}

export default Home;
