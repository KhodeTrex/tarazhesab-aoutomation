import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { LoginPage } from './components/LoginPage';
import { View, Issue, Group, Role, User, Project } from './types';

const initialUsers: User[] = [
    { id: 1, username: 'Abir', firstName: 'عبير', lastName: 'معروف', email: 'taraz00002@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۴۹', lastLogin: '' },
    { id: 2, username: 'Asal', firstName: 'عسل', lastName: 'محیسن', email: 'taraz008500@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۵۱', lastLogin: '' },
    { id: 3, username: 'Fatemeh', firstName: 'فاطمه', lastName: 'علیوی', email: 'taraz02145000@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۵۴', lastLogin: '' },
    { id: 4, username: 'Hajar', firstName: 'هاجر', lastName: 'حمر', email: 'taraz000022@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۴۵', lastLogin: '' },
    { id: 5, username: 'Khansari', firstName: 'زهرا', lastName: 'خوانساری', email: 'taraz000360@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۴۸', lastLogin: '' },
    { id: 6, username: 'Mahdiyeh', firstName: 'مهدیه', lastName: 'خوانساری', email: 'taraz04578000@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۵۲', lastLogin: '' },
    { id: 7, username: 'Mobina', firstName: 'مبینا', lastName: 'خیاط پور', email: 'taraz0000010@gmail.com', isAdmin: false, createdAt: '۱۴۰۴-۰۶-۰۹ ۰۷:۴۶', lastLogin: '' },
    { id: 8, username: 'adebi', firstName: 'شیدا', lastName: 'ادیبی', email: 'adebi.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۱-۲۸ ۱۵:۰۲', lastLogin: '۱۴۰۴-۰۷-۱۹ ۰۸:۳۹' },
    { id: 9, username: 'ahmadzadeh', firstName: 'منا', lastName: 'احمد زاده', email: 'ahmadzahe.taraz@gmail.com', isAdmin: true, createdAt: '۱۳۹۸-۰۲-۰۷ ۱۹:۲۷', lastLogin: '۱۴۰۴-۰۶-۲۱ ۱۵:۵۳' },
    { id: 10, username: 'alboghoobeysh', firstName: 'سحر', lastName: 'آلبوغوبیش', email: 'alboghoobeysh.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۳-۱۹ ۱۴:۴۸', lastLogin: '' },
    { id: 11, username: 'alboghobish68', firstName: 'فریده', lastName: 'آلبوغوبیش', email: 'alboghobish68.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۷-۰۵ ۱۷:۱۸', lastLogin: '' },
    { id: 12, username: 'albosabih', firstName: 'علیرضا', lastName: 'آلبوصبیح', email: 'albosabih.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۷-۱۲ ۱۲:۲۸', lastLogin: '۱۴۰۴-۰۷-۱۹ ۰۲:۴۸' },
    { id: 13, username: 'albughbish', firstName: 'فیصل', lastName: 'آلبوغبيش', email: 'sukot67@gmail.com', isAdmin: true, createdAt: '۱۳۹۸-۰۷-۱۲ ۱۲:۱۰', lastLogin: '۱۴۰۴-۰۷-۱۹ ۰۶:۴۸' },
    { id: 14, username: 'alirhm', firstName: 'علی', lastName: 'علی رحم زاده', email: 'alirhm.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۷-۱۲ ۱۶:۲۵', lastLogin: '' },
    { id: 15, username: 'amoori', firstName: 'سنا', lastName: 'عموری', email: 'taraz00@gmail.com', isAdmin: false, createdAt: '۱۳۹۸-۰۸-۱۸ ۱۴:۴۵', lastLogin: '۱۴۰۴-۰۶-۲۹ ۱۲:۵۹' },
    { id: 16, username: 'amval', firstName: 'اموال', lastName: 'بدون کاربر', email: 'amval.taraz@gmail.com', isAdmin: false, createdAt: '۱۳۹۹-۰۲-۰۶ ۱۳:۳۲', lastLogin: '۱۴۰۴-۰۶-۰۹ ۰۳:۲۶' },
];

const initialProjects: Project[] = [
    { id: 1, name: 'وبسایت جدید تراز حساب', description: 'پروژه بازطراحی و توسعه وبسایت شرکت با تکنولوژی‌های جدید.', identifier: 'taraz-new-website', isPublic: true, createdAt: '۱۴۰۴/۰۵/۱۰' },
    { id: 2, name: 'اپلیکیشن موبایل', description: 'توسعه اپلیکیشن موبایل برای اندروید و iOS.', identifier: 'taraz-mobile-app', isPublic: false, createdAt: '۱۴۰۴/۰۶/۱۵' },
    { id: 3, name: 'کمپین بازاریابی Q4', description: 'برنامه‌ریزی و اجرای کمپین‌های بازاریابی برای فصل چهارم سال.', identifier: 'marketing-q4', isPublic: true, createdAt: '۱۴۰۴/۰۷/۰۱' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState<View[]>([View.HomePage]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const activeView = history[historyIndex];

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const [users, setUsers] = useState<User[]>(initialUsers);
  
  const [issues, setIssues] = useState<Issue[]>([
    { id: 85177, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست خدمات', subject: 'پرینت قبض مسلم نیک مهر', status: 'برای انجام', priority: 'معمولی', createdAt: '1404/07/28 13:04', updatedAt: '1404/07/28 13:04', assignee: 'فریده آلبوغیش', startDate: '1404/07/28', dueDate: '1404/08/02' },
    { id: 85176, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست خدمات', subject: 'ویرایش و ارسال معاملات فصلی', status: 'در حال بررسی', priority: 'زیاد', createdAt: '1404/07/28 13:03', updatedAt: '1404/07/28 13:03', assignee: 'فریده آلبوغیش', startDate: '1404/07/29', dueDate: '1404/08/05' },
    { id: 85163, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست لوازم مصرفی', subject: '3 بسته آچار', status: 'انجام شده', priority: 'کم', createdAt: '1404/07/28 09:33', updatedAt: '1404/07/28 09:33', assignee: 'رضا شریفیات', startDate: '1404/07/25', dueDate: '1404/07/28' },
    { id: 85175, project: 'واحد عملکرد مالیاتی', issueType: 'درخواست خدمات', subject: 'اظهارنامه ارث محمدعلی قنواتی', status: 'برای انجام', priority: 'معمولی', createdAt: '1404/07/28 13:01', updatedAt: '1404/07/28 13:01', assignee: 'فریده آلبوغیش', startDate: '1404/07/30', dueDate: '1404/08/10' },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: 'گروه تست ۱', userIds: [8, 9, 12, 13, 5], createdAt: '۱۴۰۴/۰۷/۲۰' },
    { id: 2, name: 'تیم توسعه', userIds: [8, 9, 10, 11, 12, 13, 14, 15], createdAt: '۱۴۰۴/۰۷/۱۵' },
    { id: 3, name: 'مدیریت', userIds: [9, 13], createdAt: '۱۴۰۴/۰۷/۱۰' },
    { id: 4, name: 'کارشناسان مالی', userIds: [1, 2, 3, 4, 5, 6, 7], createdAt: '۱۴۰۴/۰۶/۳۰' },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'مدیر عامل' },
    { id: 2, name: 'معاون' },
    { id: 3, name: 'سرپرست 1' },
    { id: 4, name: 'کاربر' },
    { id: 5, name: 'کاربر اضافه' },
    { id: 6, name: 'برگ تشخیص' },
    { id: 7, name: 'مشاهده گزارش' },
    { id: 8, name: 'کاربر درخواست پرسنل' },
    { id: 9, name: 'هیچ' },
    { id: 10, name: 'جریمه و تشویق' },
    { id: 11, name: 'کاربر برنامه ریزی' },
    { id: 12, name: 'مسئول دفتر' },
    { id: 13, name: 'یادآور نسبتی' },
  ]);
  
  const [projects, setProjects] = useState<Project[]>(initialProjects);

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
      id: Math.floor(Math.random() * 1000) + 10,
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
      id: Math.floor(Math.random() * 100) + 20,
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