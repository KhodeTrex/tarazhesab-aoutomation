import React, { useState } from 'react';
import { Project } from '../types';

interface NewProjectPageProps {
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const NewProjectPage: React.FC<NewProjectPageProps> = ({ onCreateProject, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    identifier: '',
    isPublic: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [id]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };
  
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, identifier: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.identifier) {
      alert('لطفاً نام پروژه و شناسه را وارد کنید.');
      return;
    }
    onCreateProject(formData);
    onCancel();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in-fast max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">پروژه جدید</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
          <textarea 
            id="description" 
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">شناسه <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="identifier" 
            value={formData.identifier}
            onChange={handleIdentifierChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm font-mono"
            required
          />
           <p className="text-xs text-gray-500 mt-1">فقط حروف کوچک انگلیسی (a-z)، اعداد و خط تیره مجاز است.</p>
        </div>
        <div className="flex items-center">
            <input 
                id="isPublic" 
                type="checkbox" 
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
            <label htmlFor="isPublic" className="mr-2 text-sm font-medium text-gray-700">عمومی</label>
            <p className="text-xs text-gray-500 mr-4">این پروژه برای همه کاربران قابل مشاهده خواهد بود.</p>
        </div>
        <div className="flex justify-start gap-4 pt-4">
          <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
              ساخت
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">
              انصراف
          </button>
        </div>
      </form>
    </div>
  );
};