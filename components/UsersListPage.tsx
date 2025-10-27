import React, { useState } from 'react';
import { User } from '../types';

// Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const EllipsisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>;
const ChevronDownIcon = ({className = "h-5 w-5 text-gray-500"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const SortIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const WorldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 15v6m-6.055-11H5.945a2 2 0 00-1.788 1.03l-1.11 2.22a1 1 0 00.894 1.455h1.266a1 1 0 01.894 1.455l-1.11 2.22a2 2 0 001.788 1.03h1.09M18.055 11h-1.945a2 2 0 00-2 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2H6.055m12 0a2 2 0 011.788 1.03l1.11 2.22a1 1 0 01-.894 1.455h-1.266a1 1 0 00-.894 1.455l1.11 2.22a2 2 0 01-1.788 1.03h-1.09m-6.055 0a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>;

interface UsersListPageProps {
    onNewUser: () => void;
    users: User[];
}

export const UsersListPage: React.FC<UsersListPageProps> = ({ onNewUser, users }) => {
    const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(new Set(users.map(u => u.id)));
        } else {
            setSelectedUsers(new Set());
        }
    };

    const handleSelectUser = (id: number) => {
        setSelectedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };
    
    const showActionBar = selectedUsers.size > 0;

    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
            {/* Header */}
            <div className="p-4 border-b">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">کاربران</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={onNewUser} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-200 border border-gray-300">
                            <PlusIcon />
                            <span>کاربر جدید</span>
                        </button>
                         <button className="p-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 border border-gray-300">
                           <EllipsisIcon />
                        </button>
                    </div>
                </div>
                 <div className="p-2 bg-lime-100 border border-lime-300 rounded-md text-sm text-lime-800 mb-4">
                    تعداد کاربران مجاز: ۵۰ / تعداد کاربران فعال: {users.length}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <a href="#" className="text-sky-600 hover:underline">غیرفعال‌ها</a>
                     <div className="flex items-center gap-2">
                        <label>وضعیت:</label>
                        <select className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm w-32">
                            <option>فعال ({users.length})</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label>گروه:</label>
                         <select className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm w-32">
                           <option></option>
                        </select>
                    </div>
                     <div className="flex items-center gap-2">
                        <label>کاربر:</label>
                         <input type="text" className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm w-32" />
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            {showActionBar && (
                 <div className="p-2 bg-yellow-50 border-y flex items-center gap-4 text-sm">
                    <select className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm">
                        <option>---</option>
                        <option>حذف</option>
                        <option>قفل کردن</option>
                        <option>باز کردن قفل</option>
                    </select>
                    <button className="px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300">انجام</button>
                    <button onClick={() => setSelectedUsers(new Set())} className="text-red-500 text-xs">x پاک</button>
                 </div>
            )}


            {/* Users Table */}
             <div className="overflow-x-auto">
                 <table className="min-w-full text-sm text-right">
                    <thead className="bg-[#f2f2f2] text-gray-700 font-semibold">
                        <tr>
                            <th className="p-3 w-4">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-400 rounded focus:ring-sky-500"
                                    onChange={handleSelectAll}
                                    checked={selectedUsers.size === users.length && users.length > 0}
                                    />
                            </th>
                            <th className="p-3">نام کاربری <SortIcon /></th>
                            <th className="p-3">نام کوچک</th>
                            <th className="p-3">نام خانوادگی</th>
                            <th className="p-3">رایانامه</th>
                            <th className="p-3 text-center">راهبر</th>
                            <th className="p-3">ساخته شده در</th>
                            <th className="p-3">آخرین ورود</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                             <tr key={user.id} className={`hover:bg-gray-50 ${selectedUsers.has(user.id) ? 'bg-yellow-50' : ''}`}>
                                <td className="p-3">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-400 rounded focus:ring-sky-500"
                                        checked={selectedUsers.has(user.id)}
                                        onChange={() => handleSelectUser(user.id)}
                                    />
                                </td>
                                <td className="p-3 text-sky-600 hover:underline cursor-pointer flex items-center gap-1">
                                    <WorldIcon />
                                    {user.username}
                                </td>
                                <td className="p-3">{user.firstName}</td>
                                <td className="p-3">{user.lastName}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 text-center">{user.isAdmin && <CheckIcon />}</td>
                                <td className="p-3 text-gray-500">{user.createdAt}</td>
                                <td className="p-3 text-gray-500">{user.lastLogin}</td>
                                 <td className="p-3">
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <button className="hover:text-gray-800 flex items-center"><LockIcon /> قفل کردن</button>
                                        <button className="hover:text-red-600 flex items-center"><TrashIcon /> حذف</button>
                                    </div>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
}