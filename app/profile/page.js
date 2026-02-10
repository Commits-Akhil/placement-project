'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Profile() {
 const router = useRouter();
 const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
   name: '',
   age: '',
   jobRole: '',
   skills: '',
   languages: '',
   experience: '',
   projects: ''
  });

 useEffect(() => {
   const data = localStorage.getItem('placementProfile');
   if (data) {
     try {
       setFormData(JSON.parse(data));
     } catch (err) {
       console.error('Failed to load profile:', err);
     }
   }
 }, []);

 const updateField = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value});
 };

 const saveProfile = (e) => {
  e.preventDefault();
  localStorage.setItem('placementProfile', JSON.stringify(formData));
  setSaved(true);
  setTimeout(() => setSaved(false), 3000);
 };

 const goToAnalysis = () => {
   localStorage.setItem('placementProfile', JSON.stringify(formData));
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
         {saved && (
           <div className="mb-4 p-3 bg-[#00ADB5] text-[#EEEEEE] rounded-lg text-center">
             ✓ Profile saved successfully!
           </div>
         )}
         <form onSubmit={saveProfile} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-[#222831] mb-1">
               Name <span className="text-[#00ADB5]">*</span>
             </label>
             <input type="text" name="name" value={formData.name} onChange={updateField} placeholder="Your full name" required className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white" />
           </div>
           <div>
            <label className="block text-sm font-medium text-[#222831] mb-1">
              Age <span className="text-[#00ADB5]">*</span>
            </label>
            <input type="number" name="age" value={formData.age} onChange={updateField} placeholder="Your age" required className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white" />
           </div>

           <div>
             <label className="block text-sm font-medium text-[#222831] mb-1">
               Job Role Trying For <span className="text-[#00ADB5]">*</span>
             </label>
             <input type="text" name="jobRole"
               value={formData.jobRole}
               onChange={updateField}
               placeholder="e.g., Software Developer, Data Analyst" required
               className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white"
             />
           </div>
           <div>
            <label className="block text-sm font-medium text-[#222831] mb-1">
              Skills <span className="text-[#00ADB5]">*</span>
            </label>
            <textarea name="skills" value={formData.skills}
              onChange={updateField}
              placeholder="e.g., Python, JavaScript, React, Problem Solving"
              required rows="3"
              className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none resize-none bg-white"
            />
           </div>

           <div>
            <label className="block text-sm font-medium text-[#222831] mb-1">
              Languages Known <span className="text-[#00ADB5]">*</span>
            </label>
            <input type="text"
              name="languages"
              value={formData.languages}
              onChange={updateField}
              placeholder="e.g., English, Hindi, Spanish" required
              className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none bg-white"
            />
           </div>
           <div>
             <label className="block text-sm font-medium text-[#222831] mb-1">
               Experience <span className="text-[#00ADB5]">*</span>
             </label>
             <textarea name="experience"
               value={formData.experience}
               onChange={updateField} placeholder="Describe your work experience, internships, or academic projects"
               required rows="3"
               className="w-full px-4 py-2 border border-[#393E46] rounded-lg focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent outline-none resize-none bg-white"
             />
           </div>

           <div>
            <label className="block text-sm font-medium text-[#222831] mb-1">
              Projects <span className="text-[#00ADB5]">*</span>
            </label>
            <textarea name="projects"
              value={formData.projects} onChange={updateField}
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