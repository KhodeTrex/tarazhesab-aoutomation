import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { LoginPage } from './components/LoginPage';
import { View } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<View>(View.Projects);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user: string, pass: string) => {
    if (user === 'albosabih' && pass === 'admin') {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setUsername(user);
    } else if (user === 'user' && pass === 'user') {
      setIsAdmin(false);
      setIsLoggedIn(true);
      setUsername(user);
    } else {
      alert('نام کاربری یا گذرواژه نامعتبر است');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView}
        isAdmin={isAdmin} 
        username={username}
        onLogout={handleLogout}
      />
      <main className="p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <MainContent activeView={activeView} isAdmin={isAdmin} />
        </div>
      </main>
    </div>
  );
}

export default App;
