'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Profile() {
 const router = useRouter();
 const [showSaved, setShowSaved] = useState(false);
  const [profile, setProfile] = useState({
   name: '',
   age: '',
   jobRole: '',
   skills: '',
   languages: '',
   experience: '',
   projects: ''
  });

 useEffect(() => {
   const savedProfile = localStorage.getItem('placementProfile');
   if (savedProfile) {
     setProfile(JSON.parse(savedProfile));
   }
 }, []);

 const handleChange = (e) => {
   setProfile({...profile, [e.target.name]: e.target.value});
 };

 const handleSave = (e) => {
  e.preventDefault();
  localStorage.setItem('placementProfile', JSON.stringify(profile));
  setShowSaved(true);
  setTimeout(() => setShowSaved(false), 3000);
 };

 const goToAnalysis = () => {
   localStorage.setItem('placementProfile', JSON.stringify(profile));
   router.push('/analysis');
 };

 return (
   <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center p-4">
     <div className="w-full max-w-2xl">
       <div className="bg-[#EEEEEE] rounded-3xl shadow-2xl p-8">
         <h1 className="text-3xl font-bold text-center mb-2 text-[#222831]">
            Your Profile
         </h1>
         <p className="text-center text-[#393E46] mb-6">
           Enter your details to get personalized placement advice
         </p>
         {showSaved && (
           <div className="mb-4 p-3 bg-[#00ADB5] text-[#EEEEEE] rounded-lg text-center">
             ✓ Profile saved successfully!
           </div>
         )}
         <form onSubmit={handleSave} className="space-y-4">
           <div>
             <div className="text-sm font-medium text-[#222831] mb-1">
               Name <span className="text-[#00ADB5]">*</span>
             </div>
             <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Your full name" required className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white" />
           </div>
           <div>
            <div className="text-sm font-medium text-[#222831] mb-1">
              Age <span className="text-[#00ADB5]">*</span>
            </div>
            <input type="number" name="age" value={profile.age} onChange={handleChange} placeholder="Your age" required className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white" />
           </div>

           <div>
             <div className="text-sm font-medium text-[#222831] mb-1">
               Job Role Trying For <span className="text-[#00ADB5]">*</span>
             </div>
             <input type="text" name="jobRole"
               value={profile.jobRole}
               onChange={handleChange}
               placeholder="e.g., Software Developer, Data Analyst" required
               className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white"
             />
           </div>
           <div>
            <div className="text-sm font-medium text-[#222831] mb-1">
              Skills <span className="text-[#00ADB5]">*</span>
            </div>
            <textarea name="skills" value={profile.skills}
              onChange={handleChange}
              placeholder="e.g., Python, JavaScript, React, Problem Solving"
              required rows="3"
              className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none resize-none bg-white"
            />
           </div>

           <div>
            <div className="text-sm font-medium text-[#222831] mb-1">
              Languages Known <span className="text-[#00ADB5]">*</span>
            </div>
            <input type="text"
              name="languages"
              value={profile.languages}
              onChange={handleChange}
              placeholder="e.g., English, Hindi, Spanish" required
              className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white"
            />
           </div>
           <div>
             <div className="text-sm font-medium text-[#222831] mb-1">
               Experience <span className="text-[#00ADB5]">*</span>
             </div>
             <textarea name="experience"
               value={profile.experience}
               onChange={handleChange} placeholder="Describe your work experience, internships, or academic projects"
               required rows="3"
               className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none resize-none bg-white"
             />
           </div>

           <div>
            <div className="text-sm font-medium text-[#222831] mb-1">
              Projects <span className="text-[#00ADB5]">*</span>
            </div>
            <textarea name="projects"
              value={profile.projects} onChange={handleChange}
              placeholder="Describe your key projects and achievements"
              required
              rows="3"
              className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none resize-none bg-white"
            />
           </div>
           <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-[#00ADB5] text-[#EEEEEE] py-3 rounded-lg font-semibold hover:bg-[#393E46] transition-colors">
              Save Profile
            </button>
            <button type="button" onClick={() => router.push('/quiz')} className="flex-1 bg-[#00ADB5] text-[#EEEEEE] py-3 rounded-lg font-semibold hover:bg-[#393E46] transition-colors">
              Take Quiz
            </button>
            <button type="button" onClick={goToAnalysis} className="flex-1 bg-[#222831] text-[#EEEEEE] py-3 rounded-lg font-semibold hover:bg-[#393E46] transition-colors">
              Get Analysis →
            </button>
           </div>
         </form>
       </div>
     </div>
   </div>
 );
}

export default Profile;