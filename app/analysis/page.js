'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Analysis() {
 const router = useRouter();
 const [profileData, setProfileData] = useState(null);
 const [aiAdvice, setAiAdvice] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 useEffect(() => {
   const data = localStorage.getItem('placementProfile');
   if (data) {
     setProfileData(JSON.parse(data));
   } else {
     setErrorMsg('No profile data found. Please fill your profile first.');
   }
 }, []);

 const fetchAdvice = async () => {
   if (!profileData) return;

   setIsLoading(true);
   setErrorMsg('');
   setAiAdvice('');

   try {
     const res = await fetch('/api/placement-advice', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(profileData),
     });

     const result = await res.json();
     
     if (res.ok) {
       setAiAdvice(result.advice);
     } else {
       setErrorMsg(`Error: ${result.error}`);
     }
   } catch (err) {
     setErrorMsg(`Error: ${err.message}`);
   }
   
   setIsLoading(false);
 };

 useEffect(() => {
   if (profileData && !aiAdvice && !isLoading) {
     fetchAdvice();
   }
 }, [profileData]);

 if (!profileData && !errorMsg) {
   return (
     <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4">
       <div className="text-[#EEEEEE] text-xl">Loading...</div>
     </div>
   );
 }

 const bgClass = "min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] p-4 py-8";
 return (
   <div className={bgClass}>
     <div className="max-w-4xl mx-auto">
       <div className="bg-[#EEEEEE] rounded-3xl shadow-2xl p-8">

         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold text-[#222831]">
              Placement Analysis
           </h1>
           <Link href="/profile" className="bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#393E46] transition-colors text-sm">
             ← Edit Profile
           </Link>
         </div>

         {errorMsg && (
           <div className="mb-6 p-4 bg-[#00ADB5] text-[#EEEEEE] rounded-lg">
             {errorMsg}
             <div className="mt-3">
               <Link href="/profile" className="inline-block bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-lg hover:bg-[#393E46] transition-colors text-sm">
                 Go to Profile
               </Link>
             </div>
           </div>
         )}
         {profileData && (
           <div className="mb-6 p-4 bg-white rounded-lg border border-[#393E46]">
             <h2 className="font-semibold text-[#222831] mb-2">Your Profile Summary:</h2>
             <div className="grid grid-cols-2 gap-2 text-sm text-[#393E46]">
               <div><strong>Name:</strong> {profileData.name}</div>
               <div><strong>Age:</strong> {profileData.age}</div>
               <div><strong>Target Role:</strong> {profileData.jobRole}</div>
               <div><strong>Languages:</strong> {profileData.languages}</div>
             </div>
           </div>
         )}

         {isLoading && (
           <div className="flex flex-col items-center justify-center py-12">
             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ADB5] mb-4"></div>
             <p className="text-[#222831] text-lg">Generating your personalized advice...</p>
             <p className="text-[#393E46] text-sm mt-2">This may take a few moments</p>
           </div>
         )}
         {aiAdvice && (
           <div className="mt-6 p-6 bg-white rounded-lg border border-[#00ADB5]">
             <h2 className="text-2xl font-semibold text-[#222831] mb-4">
               Your Personalized Placement Advice:
             </h2>
             <div className="text-[#393E46] whitespace-pre-wrap leading-relaxed">
               {aiAdvice}
             </div>
           </div>
         )}

         {!isLoading && !aiAdvice && !errorMsg && (
           <div className="text-center py-8">
             <button onClick={fetchAdvice} className="bg-[#222831] text-[#EEEEEE] px-8 py-3 rounded-lg font-semibold hover:bg-[#393E46] transition-colors">
               Generate Advice
             </button>
           </div>
         )}
       </div>
     </div>
   </div>
 );
}

export default Analysis;
