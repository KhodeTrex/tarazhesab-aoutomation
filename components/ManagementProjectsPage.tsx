import React, { useState } from 'react';
import { Project, View } from '../types';

// Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const PublicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 15v6m-6.055-11H5.945a2 2 0 00-1.788 1.03l-1.11 2.22a1 1 0 00.894 1.455h1.266a1 1 0 01.894 1.455l-1.11 2.22a2 2 0 001.788 1.03h1.09M18.055 11h-1.945a2 2 0 00-2 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2H6.055m12 0a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>;
const PrivateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const SearchIcon = ({className = "h-5 w-5 text-gray-400"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);


interface ManagementProjectsPageProps {
    projects: Project[];
    setActiveView: (view: View) => void;
}

export const ManagementProjectsPage: React.FC<ManagementProjectsPageProps> = ({ projects, setActiveView }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.identifier.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
            <div className="p-4 border-b flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-xl font-bold text-gray-800">مدیریت پروژه‌ها</h2>
                <div className="flex items-center gap-4">
                     <div className="relative">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="جستجو..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                    </div>
                    <button 
                        onClick={() => setActiveView(View.ManagementNewProject)} 
                        className="flex items-center gap-1 px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors text-sm"
                    >
                        <PlusIcon />
                        <span>پروژه جدید</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 font-semibold text-gray-600">نام پروژه</th>
                            <th className="p-3 font-semibold text-gray-600">توضیحات</th>
                            <th className="p-3 font-semibold text-gray-600">شناسه</th>
                            <th className="p-3 font-semibold text-gray-600">ایجاد شده در</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredProjects.map(project => (
                            <tr key={project.id} className="hover:bg-gray-50">
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        {project.isPublic ? <PublicIcon /> : <PrivateIcon />}
                                        <a href="#" className="text-sky-600 hover:underline font-semibold">{project.name}</a>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-600">{project.description}</td>
                                <td className="p-3 text-gray-500 font-mono">{project.identifier}</td>
                                <td className="p-3 text-gray-500">{project.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="p-4 text-xs text-gray-500 border-t">
                نمایش ۱ - {filteredProjects.length} از {filteredProjects.length}
            </div>
        </div>
    );
};