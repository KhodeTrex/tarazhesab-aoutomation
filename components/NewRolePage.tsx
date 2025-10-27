import React, { useState } from 'react';
import { Role } from '../types';

interface NewRolePageProps {
  onBack: () => void;
  onCreateRole: (roleName: string) => void;
}

export const NewRolePage: React.FC<NewRolePageProps> = ({ onBack, onCreateRole }) => {
  const [roleName, setRoleName] = useState('');

  const handleCreate = (continueAfter: boolean) => {
    if (!roleName.trim()) {
      alert('لطفاً نام نقش را وارد کنید.');
      return;
    }
    onCreateRole(roleName.trim());
    
    if (continueAfter) {
      setRoleName(''); // Clear input for the next entry
    } else {
      onBack(); // Go back to the list
    }
  };

  return (
    <div className="animate-fade-in-fast max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        <button onClick={onBack} className="text-sky-600 hover:underline">نقش ها و دسترسی ها</button>
        <span className="mx-2 text-gray-400">&raquo;</span>
        <span>نقش جدید</span>
      </h2>

      <div className="bg-white border border-gray-200 rounded-lg p-10 mt-2">
         <div className="flex flex-row-reverse items-center justify-start ml-20">
            <label htmlFor="roleName" className="text-sm font-medium text-gray-700 text-right shrink-0 ml-4">
              نام <span className="text-red-500">*</span>
            </label>
            <div className="w-1/2">
              <input 
                type="text" 
                id="roleName" 
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
      </div>
      
      <div className="mt-6 flex justify-start items-center gap-4">
        <button 
          type="button" 
          onClick={() => handleCreate(true)} 
          className="px-8 py-2 bg-[#4db6ac] text-white font-semibold rounded-md hover:bg-teal-500 transition-colors"
        >
            ساخت و ادامه
        </button>
        <button 
          type="button" 
          onClick={() => handleCreate(false)} 
          className="px-8 py-2 bg-[#4db6ac] text-white font-semibold rounded-md hover:bg-teal-500 transition-colors"
        >
            ساخت
        </button>
      </div>
    </div>
  );
};