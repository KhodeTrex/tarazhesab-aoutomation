import React from 'react';
import { Role } from '../types';

// Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const UpDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18" /></svg>;

interface RolesListPageProps {
    roles: Role[];
    onNewRole: () => void;
    onBack: () => void;
    onEditRole: (role: Role) => void;
}

export const RolesListPage: React.FC<RolesListPageProps> = ({ roles, onNewRole, onBack, onEditRole }) => {

    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast max-w-5xl mx-auto">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                    <nav className="text-sm" aria-label="Breadcrumb">
                      <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                          <button onClick={onBack} className="text-sky-600 hover:underline">راه بری</button>
                        </li>
                        <li>
                          <span className="mx-2 text-gray-400">&gt;</span>
                        </li>
                        <li className="text-gray-500" aria-current="page">
                           نقش ها و دسترسی ها
                        </li>
                      </ol>
                    </nav>
                     <div className="relative w-full sm:w-64 max-w-xs">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"> <SearchIcon /> </span>
                        <input type="text" placeholder="جستجو..." className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                </div>
                 <div className="flex justify-start items-center gap-2">
                    <button onClick={onNewRole} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-200 border border-gray-300">
                        <PlusIcon />
                        <span>نقش جدید</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-200 border border-gray-300">
                        <CopyIcon />
                        <span>گزارش دسترسی‌ها</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-[#e0f2f1] text-teal-800 font-semibold">
                        <tr>
                            <th className="p-3">نقش</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {roles.map((role) => (
                             <tr key={role.id} className="hover:bg-gray-50">
                                <td className="p-3">
                                    <button onClick={() => onEditRole(role)} className="text-sky-600 hover:underline">
                                        {role.name}
                                    </button>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center justify-end gap-3 text-xs text-gray-500">
                                        <button className="hover:text-gray-800 flex items-center"><CopyIcon /> رونوشت</button>
                                        <button className="hover:text-red-600 flex items-center"><TrashIcon /> حذف</button>
                                        <button className="hover:text-gray-800 flex items-center"><UpDownIcon /></button>
                                    </div>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};