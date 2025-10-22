import React from 'react';
import { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isAdmin: boolean;
  username: string;
  onLogout: () => void;
  onBack: () => void;
  onForward: () => void;
  canBack: boolean;
  canForward: boolean;
}

const baseNavItems = [
  { id: View.HomePage, label: 'صفحه اصلی' },
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
const SearchIcon = ({className = "h-5 w-5 text-gray-300"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChevronDownIcon = ({className = "h-5 w-5 text-white"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const ChevronRightIcon = ({className = "h-5 w-5 text-white"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);
const ChevronLeftIcon = ({className = "h-5 w-5 text-white"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);


export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, isAdmin, username, onLogout, onBack, onForward, canBack, canForward }) => {
  const navItems = [...baseNavItems];
  if (isAdmin) {
      const homeIndex = navItems.findIndex(item => item.id === View.HomePage);
      if (homeIndex !== -1) {
          navItems.splice(homeIndex + 1, 0, adminNavItem);
      } else {
          navItems.unshift(adminNavItem); // Fallback
      }
  }

  return (
    <header style={{backgroundColor: '#4a428d'}} className="text-white shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side in RTL */}
          <div className="flex items-center">
            <div className="relative group">
                <button className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
                    <UserIcon />
                    <span className="text-white">{username}</span>
                    <ChevronDownIcon className="h-4 w-4 text-white"/>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">حساب من</a>
                    <button onClick={onLogout} className="w-full text-right block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">خروج</button>
                </div>
            </div>
             <div className="flex items-center gap-x-2 mr-4">
                <button
                    onClick={onBack}
                    disabled={!canBack}
                    className="p-1.5 rounded-full text-white disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    aria-label="بازگشت"
                >
                    <ChevronRightIcon />
                </button>
                <button
                    onClick={onForward}
                    disabled={!canForward}
                    className="p-1.5 rounded-full text-white disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    aria-label="جلو"
                >
                    <ChevronLeftIcon />
                </button>
            </div>
          </div>

          {/* Right side in RTL */}
           <div className="flex items-center gap-x-6">
                <nav>
                    <ul className="flex items-center space-x-1 space-x-reverse">
                        {navItems.map(item => (
                        <li key={item.id}>
                            <button 
                            onClick={() => setActiveView(item.id)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeView.startsWith(item.label)
                                ? 'bg-white/20 text-white' 
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                            >
                            {item.label}
                            </button>
                        </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="bg-[#5f599d] border border-transparent rounded-md py-2 pl-8 pr-3 appearance-none focus:outline-none text-white text-sm">
                            <option>انتخاب پروژه</option>
                        </select>
                        <div className="absolute right-2 top-2.5 pointer-events-none"><ChevronDownIcon /></div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="جستجو..." className="bg-[#5f599d] w-40 sm:w-64 rounded-full py-1.5 px-4 text-sm placeholder-gray-300 focus:outline-none" />
                        <div className="absolute left-3 top-2 pointer-events-none"><SearchIcon /></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};