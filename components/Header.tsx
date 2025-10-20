import React from 'react';
import { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isAdmin: boolean;
  username: string;
  onLogout: () => void;
}

const baseNavItems = [
  { id: View.MyPage, label: 'صفحه من' },
  { id: View.Projects, label: 'پروژه ها' },
  { id: View.Help, label: 'راهنما' },
];

const adminNavItem = { id: View.Management, label: 'راه بری' };

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, isAdmin, username, onLogout }) => {
  const navItems = isAdmin ? [...baseNavItems, adminNavItem] : baseNavItems;
  
  return (
    <header className="bg-white text-gray-800 shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side in RTL */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
                <span className="text-gray-800">{username} {isAdmin && '(Admin)'}</span>
                <div className="h-5 w-px bg-gray-300"></div>
                <button className="flex items-center text-gray-600 hover:text-sky-600">
                    <UserIcon />
                    <span className="mr-1">حساب من</span>
                </button>
            </div>
             <button onClick={onLogout} className="mr-4 text-gray-500 hover:text-red-600" title="خروج">
                <LogoutIcon />
            </button>
          </div>

          {/* Right side in RTL */}
           <nav className="flex items-baseline space-x-4 space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${
                    activeView === item.id
                      ? 'text-sky-600 border-b-2 border-sky-600'
                      : 'text-gray-500 hover:text-sky-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
        </div>
      </div>
    </header>
  );
};
