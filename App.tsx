import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { LoginPage } from './components/LoginPage';
import { View, Issue } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<View>(View.HomePage);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  
  const [issues, setIssues] = useState<Issue[]>([
    { id: 85177, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست خدمات', subject: 'پرینت قبض مسلم نیک مهر', status: 'برای انجام', priority: 'معمولی', createdAt: '1404/07/28 13:04', updatedAt: '1404/07/28 13:04', assignee: 'فریده آلبوغیش' },
    { id: 85176, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست خدمات', subject: 'ویرایش و ارسال معاملات فصلی شرکت آراس سلامت محور', status: 'در حال بررسی', priority: 'زیاد', createdAt: '1404/07/28 13:03', updatedAt: '1404/07/28 13:03', assignee: 'فریده آلبوغیش' },
    { id: 85163, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست لوازم مصرفی', subject: '3 بسته آچار', status: 'انجام شده', priority: 'کم', createdAt: '1404/07/28 09:33', updatedAt: '1404/07/28 09:33', assignee: 'رضا شریفیات' },
  ]);

  const handleCreateIssue = (newIssueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    // FIX: The original type inference was failing. By removing the explicit type on `newIssue`
    // and adding a type assertion (`as Issue`) to the object, we can resolve the type error.
    const newIssue = {
        ...newIssueData,
        id: Math.floor(Math.random() * 10000) + 86000,
        createdAt: new Date().toLocaleString('fa-IR', { hour12: false }),
        updatedAt: new Date().toLocaleString('fa-IR', { hour12: false }),
    } as Issue;
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };


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
    setActiveView(View.HomePage);
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
          <MainContent 
            activeView={activeView} 
            isAdmin={isAdmin}
            issues={issues}
            onCreateIssue={handleCreateIssue}
          />
        </div>
      </main>
    </div>
  );
}

export default App;