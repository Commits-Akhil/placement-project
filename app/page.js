import Link from 'next/link';

function Home() {
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
       <div className="space-x-4">
         <Link href="/profile" className="inline-block bg-[#EEEEEE] text-[#222831] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00ADB5] hover:text-[#EEEEEE] transition-colors">
           Enter Profile
         </Link>
         <Link href="/analysis" className="inline-block bg-[#393E46] text-[#EEEEEE] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#222831] transition-colors">
           View Analysis
         </Link>
       </div>
     </div>
   </div>
 );
}

export default Home;
