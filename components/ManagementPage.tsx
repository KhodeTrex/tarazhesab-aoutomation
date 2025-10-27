import React, { useState } from 'react';
import { View, Group, Role, User } from '../types';
import { NewUserPage } from './NewUserPage';
import { UsersListPage } from './UsersListPage';
import { GroupsListPage } from './GroupsListPage';
import { NewGroupPage } from './NewGroupPage';
import { RolesListPage } from './RolesListPage';
import { NewRolePage } from './NewRolePage';
import { EditRolePage } from './EditRolePage';
import { SettingsPage } from './SettingsPage';
import { GroupDetailsPage } from './GroupDetailsPage';

// --- Icons ---
const ProjectsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const UsersGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const RolesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
const WorkflowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0115.357-2m0 0H15" /></svg>;
const CustomFieldsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const EnumerationsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LdapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" /></svg>;
const BackupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const AssetWorkflowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0115.357-2m0 0H15" /></svg>;
const LocationWorkflowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const WarrantyWorkflowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const ContactsWorkflowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const StatusesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const TypesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v5a2 2 0 002 2h6" /></svg>;
const PluginsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const RenewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);


const adminCards = [
    { title: 'پروژه ها', icon: <ProjectsIcon /> },
    { title: 'کاربران', icon: <UserIcon /> },
    { title: 'گروه ها', icon: <UsersGroupIcon /> },
    { title: 'نقش ها و دسترسی ها', icon: <RolesIcon /> },
    { title: 'گردش کار', icon: <WorkflowIcon /> },
    { title: 'بخش های سفارشی', icon: <CustomFieldsIcon /> },
    { title: 'برشمارنده ها', icon: <EnumerationsIcon /> },
    { title: 'تنظیمات', icon: <SettingsIcon /> },
    { title: 'احراز هویت LDAP', icon: <LdapIcon /> },
    { title: 'پشتیبان گیری', icon: <BackupIcon /> },
    { title: 'گردش دارایی', icon: <AssetWorkflowIcon /> },
    { title: 'گردش محل استقرار', icon: <LocationWorkflowIcon /> },
    { title: 'گردش گارانتی', icon: <WarrantyWorkflowIcon /> },
    { title: 'گردش مخاطبین', icon: <ContactsWorkflowIcon /> },
    { title: 'وضعیت ها', icon: <StatusesIcon /> },
    { title: 'انواع', icon: <TypesIcon /> },
    { title: 'افزونه ها', icon: <PluginsIcon /> },
    { title: 'تمدید و خرید امکانات', icon: <RenewIcon /> },
];

const AdminCard: React.FC<{ title: string; icon: React.ReactNode; onClick?: () => void; }> = ({ title, icon, onClick }) => (
    <button onClick={onClick} className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
        <div className="text-gray-500 group-hover:text-indigo-600 transition-colors duration-300">
            {icon}
        </div>
        <span className="mt-4 text-sm font-semibold text-center text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">{title}</span>
    </button>
);

interface ManagementPageProps {
    activeView: View;
    setActiveView: (view: View) => void;
    users: User[];
    onCreateUser: (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => void;
    groups: Group[];
    onCreateGroup: (groupName: string) => void;
    onUpdateGroup: (group: Group) => void;
    roles: Role[];
    onCreateRole: (roleName: string) => void;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ activeView, setActiveView, users, onCreateUser, groups, onCreateGroup, onUpdateGroup, roles, onCreateRole }) => {
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const handleEditRole = (role: Role) => {
        setRoleToEdit(role);
        setActiveView(View.ManagementEditRole);
    };
    
    const handleViewGroup = (group: Group) => {
        setSelectedGroup(group);
        setActiveView(View.ManagementGroupDetails);
    };


    if (activeView === View.ManagementNewUser) {
        return <NewUserPage onBack={() => setActiveView(View.ManagementUsers)} onCreateUser={onCreateUser} />;
    }

    if (activeView === View.ManagementUsers) {
        return <UsersListPage onNewUser={() => setActiveView(View.ManagementNewUser)} users={users} />;
    }

    if (activeView === View.ManagementNewGroup) {
        return <NewGroupPage onBack={() => setActiveView(View.ManagementGroups)} onCreateGroup={onCreateGroup} />;
    }

    if (activeView === View.ManagementGroups) {
        return <GroupsListPage onNewGroup={() => setActiveView(View.ManagementNewGroup)} onBack={() => setActiveView(View.Management)} groups={groups} onViewGroup={handleViewGroup} />;
    }
    
    if (activeView === View.ManagementGroupDetails && selectedGroup) {
        return <GroupDetailsPage 
            group={selectedGroup}
            allUsers={users}
            onUpdateGroup={(updatedGroup) => {
                onUpdateGroup(updatedGroup);
                setSelectedGroup(updatedGroup); // Update local state to reflect changes immediately
            }}
            onBack={() => setActiveView(View.ManagementGroups)}
        />
    }

    if (activeView === View.ManagementNewRole) {
        return <NewRolePage onBack={() => setActiveView(View.ManagementRoles)} onCreateRole={onCreateRole} />;
    }

    if (activeView === View.ManagementEditRole && roleToEdit) {
        return <EditRolePage role={roleToEdit} onBack={() => setActiveView(View.ManagementRoles)} />;
    }

    if (activeView === View.ManagementRoles) {
        return <RolesListPage roles={roles} onNewRole={() => setActiveView(View.ManagementNewRole)} onBack={() => setActiveView(View.Management)} onEditRole={handleEditRole} />;
    }
    
    if (activeView === View.ManagementSettings) {
        return <SettingsPage onBack={() => setActiveView(View.Management)} />;
    }

    const cardsWithActions = adminCards.map(card => {
        if (card.title === 'پروژه ها') {
            return { ...card, onClick: () => setActiveView(View.Projects) };
        }
        if (card.title === 'کاربران') {
            return { ...card, onClick: () => setActiveView(View.ManagementUsers) };
        }
        if (card.title === 'گروه ها') {
            return { ...card, onClick: () => setActiveView(View.ManagementGroups) };
        }
        if (card.title === 'نقش ها و دسترسی ها') {
            return { ...card, onClick: () => setActiveView(View.ManagementRoles) };
        }
        if (card.title === 'تنظیمات') {
            return { ...card, onClick: () => setActiveView(View.ManagementSettings) };
        }
        return { ...card, onClick: () => {} }; // Default empty onClick
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                 <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"> <SearchIcon /> </span>
                    <input type="text" placeholder="جستجو..." className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                 <div className="relative w-full sm:w-auto">
                     <select className="appearance-none block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                        <option>انتخاب پروژه</option>
                        <option>پروژه ۱</option>
                        <option>پروژه ۲</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                       <ChevronDownIcon />
                    </div>
                </div>
            </header>

            <main>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {cardsWithActions.map(card => (
                        <AdminCard key={card.title} title={card.title} icon={card.icon} onClick={card.onClick} />
                    ))}
                </div>
            </main>
            
            <footer className="text-center text-xs text-gray-400 pt-4">
                 <p>powered by IT TarazHesab</p>
            </footer>
        </div>
    );
};