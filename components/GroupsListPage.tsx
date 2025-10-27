import React from 'react';
import { Group } from '../types';

// Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const EllipsisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>;
const SortIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;

interface GroupsListPageProps {
    onNewGroup: () => void;
    onBack: () => void;
    groups: Group[];
    onViewGroup: (group: Group) => void;
}

export const GroupsListPage: React.FC<GroupsListPageProps> = ({ onNewGroup, onBack, groups, onViewGroup }) => {

    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
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
                          گروه ها
                        </li>
                      </ol>
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={onNewGroup} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-200 border border-gray-300">
                            <PlusIcon />
                            <span>گروه جدید</span>
                        </button>
                         <button className="p-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 border border-gray-300">
                           <EllipsisIcon />
                        </button>
                    </div>
                </div>
            </div>

             <div className="overflow-x-auto">
                 <table className="min-w-full text-sm text-right">
                    <thead className="bg-[#f2f2f2] text-gray-700 font-semibold">
                        <tr>
                            <th className="p-3">گروه <SortIcon /></th>
                            <th className="p-3 text-center">کاربران</th>
                            <th className="p-3">ساخته شده در</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {groups.map((group) => (
                             <tr key={group.id} className="hover:bg-gray-50">
                                <td className="p-3">
                                    <button onClick={() => onViewGroup(group)} className="text-sky-600 hover:underline">
                                        {group.name}
                                    </button>
                                </td>
                                <td className="p-3 text-center">{group.userIds.length}</td>
                                <td className="p-3 text-gray-500">{group.createdAt}</td>
                                 <td className="p-3">
                                    <div className="flex items-center justify-end gap-3 text-xs text-gray-500">
                                        <button className="hover:text-gray-800 flex items-center"><PencilIcon /> ویرایش</button>
                                        <button className="hover:text-red-600 flex items-center"><TrashIcon /> حذف</button>
                                    </div>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
             <div className="p-4 text-xs text-gray-500 border-t">
                نمایش ۱ - {groups.length} از {groups.length}
            </div>
        </div>
    );
};