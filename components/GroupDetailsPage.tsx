import React, { useState } from 'react';
import { Group, User } from '../types';

// Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const UserAddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

interface GroupDetailsPageProps {
  group: Group;
  allUsers: User[];
  onUpdateGroup: (group: Group) => void;
  onBack: () => void;
}

const AddUserModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    nonMembers: User[];
    onAddUsers: (userIds: number[]) => void;
}> = ({ isOpen, onClose, nonMembers, onAddUsers }) => {
    const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(new Set());

    const handleToggleUser = (userId: number) => {
        setSelectedUserIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };
    
    const handleAdd = () => {
        onAddUsers(Array.from(selectedUserIds));
        setSelectedUserIds(new Set());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-fade-in-fast" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">افزودن عضو</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><XIcon /></button>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                    <ul className="space-y-2">
                        {nonMembers.map(user => (
                            <li key={user.id} className="p-2 rounded-md hover:bg-gray-100">
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedUserIds.has(user.id)}
                                        onChange={() => handleToggleUser(user.id)}
                                        className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                                    />
                                    <span className="mr-3 text-sm text-gray-700">{user.firstName} {user.lastName} ({user.username})</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="p-4 border-t flex justify-start gap-2">
                    <button onClick={handleAdd} className="px-4 py-2 bg-sky-600 text-white font-semibold text-sm rounded-md hover:bg-sky-700 disabled:bg-gray-300" disabled={selectedUserIds.size === 0}>
                        افزودن
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-300">
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    );
};

export const GroupDetailsPage: React.FC<GroupDetailsPageProps> = ({ group, allUsers, onUpdateGroup, onBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const groupMembers = allUsers.filter(user => group.userIds.includes(user.id));
    const nonMembers = allUsers.filter(user => !group.userIds.includes(user.id));

    const handleRemoveUser = (userId: number) => {
        if (window.confirm('آیا از حذف این کاربر از گروه اطمینان دارید؟')) {
            const updatedUserIds = group.userIds.filter(id => id !== userId);
            onUpdateGroup({ ...group, userIds: updatedUserIds });
        }
    };
    
    const handleAddUsers = (userIds: number[]) => {
        const updatedUserIds = [...new Set([...group.userIds, ...userIds])];
        onUpdateGroup({ ...group, userIds: updatedUserIds });
        setIsModalOpen(false);
    };

    return (
        <div className="animate-fade-in-fast space-y-4">
            <nav className="text-sm" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <button onClick={onBack} className="text-sky-600 hover:underline">گروه ها</button>
                    </li>
                    <li>
                        <span className="mx-2 text-gray-400">&gt;</span>
                    </li>
                    <li className="text-gray-500" aria-current="page">
                        {group.name}
                    </li>
                </ol>
            </nav>

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        اعضا ({groupMembers.length})
                    </h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-200 border border-gray-300">
                        <UserAddIcon />
                        <span>افزودن عضو</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-right">
                        <thead className="bg-[#f2f2f2] text-gray-700 font-semibold">
                            <tr>
                                <th className="p-3">نام کاربری</th>
                                <th className="p-3">نام کوچک</th>
                                <th className="p-3">نام خانوادگی</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {groupMembers.length > 0 ? groupMembers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.firstName}</td>
                                    <td className="p-3">{user.lastName}</td>
                                    <td className="p-3 text-left">
                                        <button onClick={() => handleRemoveUser(user.id)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        هیچ عضوی در این گروه وجود ندارد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                nonMembers={nonMembers}
                onAddUsers={handleAddUsers}
            />
        </div>
    );
};