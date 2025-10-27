import React, { useState } from 'react';
import { View, Issue, Group, Role, User, Project } from '../types';
import { TimelinePage } from './TimelinePage';
import { CalendarPage } from './CalendarPage';
import { ManagementPage } from './ManagementPage';
import { GanttPage } from './GanttPage';
import { ProjectsDashboard } from './ProjectsDashboard';
import { NewProjectPage } from './NewProjectPage';

// --- آیکون ها ---
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg> );
const HelpIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const PlusCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 003 21m12 0v1m0-1v-1m0 0v-1m0 0v-1" /> </svg> );
const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> </svg> );
const CogIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> );
const RocketIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
const SearchIcon = ({className = "h-5 w-5 text-gray-400"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChevronDownIcon = ({className = "h-5 w-5 text-gray-500"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
const StackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM4 18a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg>);
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM4.343 5.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM1 11a1 1 0 100 2h1a1 1 0 100-2H1zM15 11a1 1 0 100 2h1a1 1 0 100-2h-1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707-.707zM14.95 14.95a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a6 6 0 100 12 6 6 0 000-12zM10 7a4 4 0 110 8 4 4 0 010-8z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const EllipsisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>;
const TableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const PersonIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const AddAttachmentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500 hover:text-teal-600 transition-colors" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /> </svg> );


interface MainContentProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isAdmin: boolean;
  issues: Issue[];
  onCreateIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void;
  users: User[];
  onCreateUser: (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => void;
  groups: Group[];
  onCreateGroup: (groupName: string) => void;
  onUpdateGroup: (group: Group) => void;
  roles: Role[];
  onCreateRole: (roleName: string) => void;
  projects: Project[];
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
}

const ContentCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
            <div className="mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
            <p className="text-slate-600">{children}</p>
        </div>
    </div>
);

// --- کامپونнент ها برای هر صفحه ---

const HomePage = () => (
    <div className="transform hover:scale-105 transition-transform duration-300 animate-fade-in">
      <ContentCard icon={<HomeIcon />} title="به سیستم مدیریت پروژه خوش آمدید">
        برای شروع، از منوی بالا یک گزینه را انتخاب کنید.
      </ContentCard>
    </div>
  );

const MyPage = () => {
    const shortcuts = [ { title: 'ایجاد پروژه جدید', icon: <PlusCircleIcon /> }, { title: 'مشاهده تیم من', icon: <UsersIcon /> }, { title: 'گزارش ها', icon: <ChartBarIcon /> }, { title: 'تنظیمات حساب', icon: <CogIcon /> }, ];
    const tasks = [ { id: 1, title: 'طراحی صفحه ورود', project: 'وبسایت جدید', dueDate: '1403/05/10', status: 'در حال انجام' }, { id: 2, title: 'آماده سازی ارائه', project: 'کمپین بازاریابی', dueDate: '1403/05/05', status: 'انجام شده' }, { id: 3, title: 'رفع باگ های ماژول پرداخت', project: 'اپلیکیشن موبایل', dueDate: '1403/05/01', status: 'معوق' }, ];
    const getStatusClass = (status: string) => { switch (status) { case 'در حال انجام': return 'bg-blue-100 text-blue-800'; case 'انجام شده': return 'bg-green-100 text-green-800'; case 'معوق': return 'bg-red-100 text-red-800'; default: return 'bg-gray-100 text-gray-800'; } }
    return (
        <div className="space-y-8 animate-fade-in">
            <ContentCard icon={<HomeIcon />} title="به صفحه خود خوش آمدید"> از این پنل برای مدیریت وظایف، پیگیری پیشرفت و همکاری با تیم خود استفاده کنید. </ContentCard>
            <div className="bg-white rounded-lg shadow-lg p-6"> <h3 className="text-xl font-bold text-slate-800 mb-4">میانبرهای سریع</h3> <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"> {shortcuts.map((shortcut, index) => ( <button key={index} className="group flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-sky-100 transition-all duration-300 border border-slate-200 hover:shadow-md hover:-translate-y-1"> {shortcut.icon} <span className="mt-2 text-sm font-medium text-slate-700 group-hover:text-sky-600">{shortcut.title}</span> </button> ))} </div> </div>
            <div className="bg-white rounded-lg shadow-lg p-6"> <h3 className="text-xl font-bold text-slate-800 mb-4">برنامه های کاری شما</h3> <div className="space-y-4"> {tasks.map(task => ( <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"> <div className="flex-1 mb-2 sm:mb-0"> <p className="font-semibold text-slate-800">{task.title}</p> <p className="text-sm text-slate-500">{task.project}</p> </div> <div className="flex items-center space-x-4 space-x-reverse w-full sm:w-auto"> <p className="text-sm text-slate-600">{task.dueDate}</p> <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(task.status)}`}> {task.status} </span> </div> </div> ))} </div> </div>
        </div>
    );
}

const HelpPage = () => (
    <div className="transform hover:scale-105 transition-transform duration-300 animate-fade-in">
      <ContentCard icon={<HelpIcon />} title="راهنما">
        اینجا می‌توانید راهنمایی‌های مربوط به سیستم را پیدا کنید.
      </ContentCard>
    </div>
);

interface ProjectsPageProps {
    issues: Issue[];
    setActiveView: (view: View) => void;
}
const ProjectsPage: React.FC<ProjectsPageProps> = ({ issues, setActiveView }) => {
    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">مسئله‌ها</h2>
                <button 
                    onClick={() => setActiveView(View.ProjectsNewIssue)} 
                    className="flex items-center gap-1 px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors text-sm"
                >
                    <PlusCircleIcon />
                    <span>مسئله جدید</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 font-semibold text-gray-600">#</th>
                            <th className="p-3 font-semibold text-gray-600">پروژه</th>
                            <th className="p-3 font-semibold text-gray-600">موضوع</th>
                            <th className="p-3 font-semibold text-gray-600">وضعیت</th>
                            <th className="p-3 font-semibold text-gray-600">مسئول</th>
                            <th className="p-3 font-semibold text-gray-600">بروزرسانی شده در</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {issues.map(issue => (
                            <tr key={issue.id} className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500">{issue.id}</td>
                                <td className="p-3">{issue.project}</td>
                                <td className="p-3 text-sky-600 hover:underline cursor-pointer">{issue.subject}</td>
                                <td className="p-3">{issue.status}</td>
                                <td className="p-3">{issue.assignee || '---'}</td>
                                <td className="p-3 text-gray-500">{issue.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface NewIssuePageProps {
    onCreateIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

const NewIssuePage: React.FC<NewIssuePageProps> = ({ onCreateIssue, onCancel }) => {
    const projectOptions = [ 'برنامه آموزش', 'برنامه ریزی', 'جلسات ، مرخصی ، اختاریه ، جرایم و تشویق', 'حوزه پاسخگویی', 'روند کار', 'شرکت های حذف شده', 'تست', 'واحد کامپیوتر', 'کلیپ های اموزشی', 'اشخاص حوزه پاسخگویی' ];
    const issueTypeOptions = [ 'درخواست های پرسنل', 'وضعیت پرونده مالیاتی', 'درخواست خدمات', 'تحویل مدارک - مکاتبات - تایید درآمد', 'درصد پیشرفت کار شرکت', 'درخواست لوازم مصرفی', 'حواله خروجی', 'پاداش و جرایم', 'محاسبه حقوق پرسنل', 'مشخصات شرکت', 'چک لیست های سال قبل', 'برگ تجربه', 'چک لیست اشخاص', 'چک لیست حقوق و بیمه', 'تاییدیه درآمد', 'برنامه آموزش', 'وبلاگ', 'درصد پیشرفت کار', 'پیگیری مدارک', 'پاداش و متفرقه', 'درصد پیشرفت کار +' ];
    const statusOptions = ['برای انجام', 'در حال بررسی', 'انجام شده'];
    const priorityOptions = ['کم', 'معمولی', 'زیاد', 'فوری'];
    const users = ['کاربر ۱', 'کاربر ۲', 'کاربر ۳'];
    
    const [formData, setFormData] = useState<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>({
        project: '',
        issueType: '',
        subject: '',
        description: '',
        status: 'برای انجام',
        priority: 'معمولی',
        assignee: '',
    });
    const [selectedIssueType, setSelectedIssueType] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleIssueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setSelectedIssueType(newType);
        const defaultProject = ['وضعیت پرونده مالیاتی', 'تحویل مدارک - مکاتبات - تایید درآمد', 'درصد پیشرفت کار شرکت', 'پاداش و جرایم', 'درخواست خدمات', 'درخواست لوازم مصرفی'].includes(newType) ? 'واحد عملکرد مالیاتی' : '';
        setFormData({
            project: defaultProject,
            issueType: newType,
            subject: '',
            description: '',
            status: 'برای انجام',
            priority: 'معمولی',
            assignee: '',
        });
    };
    
    const handleSubmit = (continueAfter: boolean = false) => {
        if (!formData.project || !formData.issueType || !formData.subject) {
            alert('لطفا فیلدهای الزامی (پروژه، نوع مسئله، موضوع) را پر کنید.');
            return;
        }

        onCreateIssue(formData);
        
        if (continueAfter) {
            const currentType = selectedIssueType;
            handleIssueTypeChange({ target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>);
            setTimeout(() => handleIssueTypeChange({ target: { value: currentType } } as React.ChangeEvent<HTMLSelectElement>), 0);
        } else {
            onCancel();
        }
    };


    const EditorToolbar = () => (
        <div className="flex items-center justify-between border-b bg-gray-50 rounded-t-md p-1">
             <div className="flex items-center space-x-1 space-x-reverse">
                <button className="px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm">ویرایش</button>
                <button className="px-2 py-1 text-sm text-gray-500">پیش‌نمایش</button>
            </div>
            {/* Toolbar buttons placeholder */}
            <div className="text-xs text-gray-400">
                ابزارهای ویرایشگر متن در اینجا قرار می گیرند.
            </div>
        </div>
    );
    
    const LabeledInput: React.FC<{label: string, id: string, children: React.ReactNode, className?: string}> = ({label, id, children, className}) => (
        <div className={`flex flex-row-reverse items-center ${className}`}>
            <label htmlFor={id} className="w-40 text-sm font-medium text-gray-700 text-right shrink-0 pr-2">{label}</label>
            <div className="w-full">{children}</div>
        </div>
    );

    const FileInput: React.FC<{label: string}> = ({label}) => (
        <div className="flex flex-row-reverse items-center">
             <span className="w-40 text-sm font-medium text-gray-700 text-right shrink-0 pr-2">{label}</span>
             <div className="flex items-center text-sm">
                <input type="file" className="text-xs w-full"/>
                 <span className="text-xs text-gray-500 whitespace-nowrap">(بیشترین اندازه: ۱۰ مگابایت)</span>
             </div>
        </div>
    );


    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800">مسئله جدید</h2>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <input id="confidential" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                            <label htmlFor="confidential" className="mr-2 text-sm font-medium text-gray-700">محرمانه</label>
                        </div>
                        <button onClick={onCancel} className="text-gray-500 hover:text-gray-800"><XIcon/></button>
                    </div>
                </div>
                
                <form className="space-y-6">
                     <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">پروژه <span className="text-red-500">*</span></label>
                                <select id="project" value={formData.project} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                    <option>--- انتخاب کنید ---</option>
                                    <option>واحد عملکرد مالیاتی</option>
                                    {projectOptions.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="issue-type" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    نوع مسئله <span className="text-red-500 mr-1">*</span>
                                    <LightbulbIcon />
                                </label>
                                <select 
                                    id="issueType"
                                    name="issueType"
                                    value={selectedIssueType} 
                                    onChange={handleIssueTypeChange}
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                >
                                   <option value="">--- انتخاب کنید ---</option>
                                   {issueTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {selectedIssueType === 'درخواست های پرسنل' ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-4">
                                {/* Left Column in UI */}
                                <div className="space-y-3">
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="startDate" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">تاریخ آغاز</label>
                                        <div className="relative w-full">
                                            <input id="startDate" type="text" value={formData.startDate || '۱۴۰۴-۰۷-۲۸'} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm" readOnly/>
                                            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="dueDate" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">تاریخ سررسید</label>
                                        <div className="relative w-full">
                                            <input id="dueDate" type="text" value={formData.dueDate || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm"/>
                                            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="request-type-p" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">نوع درخواست</label>
                                        <select id="request-type-p" value={formData['request-type-p'] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                            <option>--- انتخاب کنید ---</option>
                                        </select>
                                    </div>
                                     <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="subject" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">موضوع بررسی</label>
                                        <input id="subject" type="text" value={formData.subject} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                    </div>
                                </div>
                                {/* Right Column in UI */}
                                 <div className="space-y-3">
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="status" className="w-24 text-sm font-medium text-gray-700 text-left shrink-0">وضعیت</label>
                                        <select id="status" value={formData.status} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                            {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="priority" className="w-24 text-sm font-medium text-gray-700 text-left shrink-0">اولویت</label>
                                        <select id="priority" value={formData.priority} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                             {priorityOptions.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="assignee" className="w-24 text-sm font-medium text-gray-700 text-left shrink-0">مسئول</label>
                                        <div className="relative w-full">
                                            <select id="assignee" value={formData.assignee} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                                                <option>--- انتخاب کنید ---</option>
                                                {users.map(user => <option key={user}>{user}</option>)}
                                            </select>
                                            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><PersonIcon /></div>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="flex flex-row-reverse">
                                    <label htmlFor="description" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0 pt-2">توضیح</label>
                                    <textarea id="description" value={formData.description} onChange={handleInputChange} rows={8} className="block w-full border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 sm:text-sm p-3"></textarea>
                                </div>
                                 <div className="flex flex-row-reverse">
                                    <label htmlFor="management-note-p" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0 pt-2">رونوشت مدیریت</label>
                                    <textarea id="management-note-p" value={formData['management-note-p'] || ''} onChange={handleInputChange} rows={8} className="block w-full border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 sm:text-sm p-3"></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 mt-4 border-t border-gray-200">
                                 <div className="flex justify-start md:order-last">
                                    <div className="flex flex-row-reverse items-center">
                                        <label htmlFor="completion-date-p" className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">تاریخ انجام</label>
                                        <div className="relative w-full">
                                            <input id="completion-date-p" type="text" value={formData['completion-date-p'] || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm"/>
                                            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="flex justify-start">
                                    <div className="flex flex-row-reverse items-center">
                                        <label className="w-28 text-sm font-medium text-gray-700 text-left shrink-0">پیوست‌ها</label>
                                        <div className="flex items-center gap-2">
                                            <button type="button" className="text-gray-500 hover:text-sky-600">
                                                <AddAttachmentIcon />
                                            </button>
                                            <span className="text-xs text-gray-500">(بیشترین اندازه: ۱۰ مگابایت)</span>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        </>
                    ) : selectedIssueType === 'وضعیت پرونده مالیاتی' ? (
                         <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                                {/* Right Column in UI */}
                                <div className="space-y-4">
                                    <LabeledInput label="موضوع" id="subject-tax">
                                        <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                    </LabeledInput>
                                    <LabeledInput label="وضعیت" id="status-tax">
                                        <select id="status" value={formData.status} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                            {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    </LabeledInput>
                                    <LabeledInput label="اولویت" id="priority-tax">
                                         <select id="priority" value={formData.priority} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                             {priorityOptions.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    </LabeledInput>
                                    <LabeledInput label="مسئول" id="assignee-tax">
                                        <div className="relative w-full">
                                            <select id="assignee" value={formData.assignee} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                                <option>---</option>{users.map(user => <option key={user}>{user}</option>)}
                                            </select>
                                            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><PersonIcon /></div>
                                        </div>
                                    </LabeledInput>
                                    <LabeledInput label="سال" id="year-tax">
                                        <select id="year-tax" value={formData['year-tax'] || '1404'} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                           <option>1404</option><option>1403</option><option>1402</option>
                                        </select>
                                    </LabeledInput>
                                     <div className="flex flex-row-reverse items-start">
                                          <label className="w-40 text-sm font-medium text-gray-700 text-right shrink-0 pr-2 pt-2">نتیجه رسیدگی</label>
                                          <div className="w-full space-y-2 text-sm">
                                            {['در انتظار صدور برگ تشخیص', 'در انتظار بررسی برگ تشخیص (واحد اجرایی)', 'قبول برگ تشخیص', 'اعتراض', 'برگ قطعی صادر شد'].map(option => (
                                                 <div key={option} className="flex items-center">
                                                    <input id={`radio-${option}`} name="reviewResult" type="radio" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 focus:ring-sky-500" />
                                                    <label htmlFor={`radio-${option}`} className="mr-2 text-gray-700">{option}</label>
                                                </div>
                                            ))}
                                          </div>
                                     </div>
                                     <LabeledInput label="مبلغ درآمد (اشتباه)" id="income-error-tax">
                                         <input type="text" id="income-error-tax" value={formData['income-error-tax'] || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                     </LabeledInput>
                                </div>

                                {/* Left Column in UI */}
                                <div className="space-y-4">
                                    <FileInput label="فرم درخواست بخشودگی"/>
                                    <LabeledInput label="شناسه ملی/شماره ملی" id="national-id-tax">
                                         <input type="text" id="national-id-tax" value={formData['national-id-tax'] || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                    </LabeledInput>
                                    <LabeledInput label="مبلغ درآمد سال یاد شده" id="income-year-tax">
                                         <input type="text" id="income-year-tax" value={formData['income-year-tax'] || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                    </LabeledInput>
                                    <FileInput label="گزارشات"/>
                                    <LabeledInput label="مالیات پرداخت شده" id="tax-paid-tax">
                                         <input type="text" id="tax-paid-tax" value={formData['tax-paid-tax'] || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                                    </LabeledInput>
                                    <LabeledInput label="گروه کاری" id="work-group-tax">
                                        <select id="work-group-tax" value={formData['work-group-tax'] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"><option>---</option></select>
                                    </LabeledInput>
                                    <LabeledInput label="حوزه رسیدگی" id="jurisdiction-tax">
                                        <select id="jurisdiction-tax" value={formData['jurisdiction-tax'] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"><option>---</option></select>
                                    </LabeledInput>
                                    <LabeledInput label="مسئول حوزه پاسخگویی" id="jurisdiction-assignee-tax">
                                        <select id="jurisdiction-assignee-tax" value={formData['jurisdiction-assignee-tax'] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"><option>---</option></select>
                                    </LabeledInput>
                                    <LabeledInput label="بخشودگی" id="clemency-tax">
                                        <select id="clemency-tax" value={formData['clemency-tax'] || ''} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"><option>---</option></select>
                                    </LabeledInput>
                                </div>
                            </div>
                        </div>
                    ) : null }
                    <div className="pt-6 flex items-center gap-4">
                        <button type="button" onClick={() => handleSubmit(false)} className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                            ساخت
                        </button>
                         <button type="button" onClick={() => handleSubmit(true)} className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                            ساخت و ادامه
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const MainContent: React.FC<MainContentProps> = (props) => {
    const { 
        activeView, 
        setActiveView, 
        isAdmin, 
        issues, 
        onCreateIssue, 
        users, 
        onCreateUser,
        groups,
        onCreateGroup,
        onUpdateGroup,
        roles,
        onCreateRole,
        projects,
        onCreateProject
    } = props;
    
    // Management views are handled within ManagementPage component, which has its own sub-router.
    if (activeView.startsWith(View.Management)) {
        return <ManagementPage 
            activeView={activeView}
            setActiveView={setActiveView}
            users={users}
            onCreateUser={onCreateUser}
            groups={groups}
            onCreateGroup={onCreateGroup}
            onUpdateGroup={onUpdateGroup}
            roles={roles}
            onCreateRole={onCreateRole}
        />;
    }

    switch (activeView) {
        case View.HomePage:
            return <HomePage />;
        case View.MyPage:
            return <MyPage />;
        
        case View.Projects:
            return <ProjectsDashboard projects={projects} setActiveView={setActiveView} isAdmin={isAdmin} />;

        case View.ProjectsNew:
            return <NewProjectPage 
                onCreateProject={(project) => { 
                    onCreateProject(project); 
                    setActiveView(View.Projects);
                }} 
                onCancel={() => setActiveView(View.Projects)} 
            />;
        
        case View.ProjectsIssues:
            return <ProjectsPage issues={issues} setActiveView={setActiveView} />;

        case View.ProjectsNewIssue:
            return <NewIssuePage 
                onCreateIssue={(issue) => { 
                    onCreateIssue(issue); 
                    // After creating an issue, navigate back to the issues list.
                    setActiveView(View.ProjectsIssues);
                }} 
                onCancel={() => setActiveView(View.ProjectsIssues)} 
            />;
        
        // Other project sub-views
        case View.ProjectsTimeline:
            return <TimelinePage />;
        case View.ProjectsCalendar:
            return <CalendarPage />;
        case View.ProjectsGantt:
            return <GanttPage issues={issues} />;

        case View.Help:
            return <HelpPage />;
        
        // Fallback for any unhandled views like ProjectsOverview, ProjectsBlog, etc.
        default:
            return <HomePage />;
    }
};