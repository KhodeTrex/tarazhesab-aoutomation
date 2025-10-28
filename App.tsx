import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { LoginPage } from './components/LoginPage';
import { View, Issue, Group, Role, User, Project } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState<View[]>([View.HomePage]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const activeView = history[historyIndex];

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const [users, setUsers] = useState<User[]>([]);
  
  const [issues, setIssues] = useState<Issue[]>([]);

  const [groups, setGroups] = useState<Group[]>([]);

  const [roles, setRoles] = useState<Role[]>([]);
  
  const [projects, setProjects] = useState<Project[]>([]);

  const setActiveView = (view: View) => {
    if (view === activeView) return; // Do not push same view consecutively
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(view);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const handleCreateIssue = (newIssueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIssue = {
        ...newIssueData,
        id: Math.floor(Math.random() * 10000) + 86000,
        createdAt: new Date().toLocaleString('fa-IR', { hour12: false }),
        updatedAt: new Date().toLocaleString('fa-IR', { hour12: false }),
    } as Issue;
    setIssues(prevIssues => [newIssue, ...prevIssues]);
  };

  const handleCreateGroup = (groupName: string) => {
    const newGroup: Group = {
      id: Math.max(0, ...groups.map(g => g.id)) + 1,
      name: groupName,
      userIds: [],
      createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    setGroups(prevGroups => [newGroup, ...prevGroups]);
  };

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroups(prevGroups => prevGroups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
  };

  const handleCreateRole = (roleName: string) => {
    const newRole: Role = {
      id: Math.max(0, ...roles.map(r => r.id)) + 1,
      name: roleName,
    };
    setRoles(prevRoles => [newRole, ...prevRoles]);
  };

  const handleCreateUser = (newUserData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newUser: User = {
      ...newUserData,
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      lastLogin: '',
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleCreateProject = (newProjectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
        ...newProjectData,
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
        createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
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
    setHistory([View.HomePage]);
    setHistoryIndex(0);
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
        onBack={goBack}
        onForward={goForward}
        canBack={canGoBack}
        canForward={canGoForward}
      />
      <main className="p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <MainContent 
            activeView={activeView} 
            setActiveView={setActiveView}
            isAdmin={isAdmin}
            issues={issues}
            onCreateIssue={handleCreateIssue}
            users={users}
            onCreateUser={handleCreateUser}
            groups={groups}
            onCreateGroup={handleCreateGroup}
            onUpdateGroup={handleUpdateGroup}
            roles={roles}
            onCreateRole={handleCreateRole}
            projects={projects}
            onCreateProject={handleCreateProject}
          />
        </div>
      </main>
    </div>
  );
}

export default App;