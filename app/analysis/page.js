'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Analysis() {
 const router = useRouter();
 const [profile, setProfile] = useState(null);
 const [result, setResult] = useState('');
 const [waiting, setWaiting] = useState(false);
 const [error, setError] = useState('');
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   // Check authentication
   const isAuth = localStorage.getItem('isAuthenticated');
   if (!isAuth || isAuth !== 'true') {
     router.push('/Login');
     return;
   }
   setIsLoading(false);
   
   const savedProfile = localStorage.getItem('placementProfile');
   if (savedProfile) {
     setProfile(JSON.parse(savedProfile));
   } else {
     setError('No profile data found. Please fill your profile first.');
   }
 }, [router]);

 const getAdvice = async () => {
   if (!profile) return;

   setWaiting(true);
   setError('');
   setResult('');

   const response = await fetch('/api/placement-advice', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(profile),
   });

   const data = await response.json();
   
   if (response.ok) {
     setResult(data.advice);
   } else {
     setError(`Error: ${data.error}`);
   }
   
   setWaiting(false);
 };

 useEffect(() => {
   if (profile && !result && !waiting) {
     getAdvice();
   }
 }, [profile]);

 if (!profile && !error && !isLoading) {
   return (
     <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4">
       <div className="text-[#EEEEEE] text-xl">Loading...</div>
     </div>
   );
 }

 if (isLoading) {
   return (
     <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4">
       <div className="text-[#EEEEEE] text-xl">Loading...</div>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] p-4 py-8">
     <div className="max-w-4xl mx-auto">
       <div className="bg-[#EEEEEE] rounded-3xl shadow-2xl p-8">

         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold text-[#222831]">
              Placement Analysis
           </h1>
           <button onClick={() => router.push('/profile')} className="bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#393E46] transition-colors text-sm">
             ← Edit Profile
           </button>
         </div>

         {error && (
           <div className="mb-6 p-4 bg-[#00ADB5] text-[#EEEEEE] rounded-lg">
             {error}
             <div className="mt-3">
               <button onClick={() => router.push('/profile')} className="inline-block bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-lg hover:bg-[#393E46] transition-colors text-sm">
                 Go to Profile
               </button>
             </div>
           </div>
         )}
         {profile && (
           <div className="mb-6 p-4 bg-white rounded-lg border border-[#393E46]">
             <h2 className="font-semibold text-[#222831] mb-2">Your Profile Summary:</h2>
             <div className="grid grid-cols-2 gap-2 text-sm text-[#393E46]">
               <div><strong>Name:</strong> {profile.name}</div>
               <div><strong>Age:</strong> {profile.age}</div>
               <div><strong>Target Role:</strong> {profile.jobRole}</div>
               <div><strong>Languages:</strong> {profile.languages}</div>
             </div>
           </div>
         )}

         {result && (
           <div className="mt-6 p-6 bg-white rounded-lg border border-[#00ADB5]">
             <h2 className="text-2xl font-semibold text-[#222831] mb-4">
               Your Personalized Placement Advice:
             </h2>
             <div className="text-[#393E46] whitespace-pre-wrap leading-relaxed">
               {result}
             </div>
           </div>
         )}

         {!waiting && !result && !error && (
           <div className="text-center py-8">
             <button onClick={getAdvice} className="bg-[#222831] text-[#EEEEEE] px-8 py-3 rounded-lg font-semibold hover:bg-[#393E46] transition-colors">
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
