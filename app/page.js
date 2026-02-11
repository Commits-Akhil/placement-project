'use client';
import { useRouter } from 'next/navigation';

function Home() {
 const router = useRouter();
 const bgStyle = "min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4";

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
       </div>
     </div>
   </div>
 );
}

export default Home;
