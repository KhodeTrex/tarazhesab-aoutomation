import React, { useState } from 'react';
import { View, ProjectModule } from '../types';
import { TimelinePage } from './TimelinePage';
import { CalendarPage } from './CalendarPage';
import { ManagementPage } from './ManagementPage';

// --- آیکون ها ---
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg> );
const HelpIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const PlusCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 003 21m12 0v1m0-1v-1m0 0v-1m0 0v-1" /> </svg> );
const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> </svg> );
const CogIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> );
const RocketIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
const StackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM4 18a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg>);
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM4.343 5.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM1 11a1 1 0 100 2h1a1 1 0 100-2H1zM15 11a1 1 0 100 2h1a1 1 0 100-2h-1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM14.95 14.95a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5a6 6 0 100 12 6 6 0 000-12zM10 7a4 4 0 110 8 4 4 0 010-8z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const EllipsisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>;
const TableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;


interface MainContentProps {
  activeView: View;
  isAdmin: boolean;
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

// --- کامپوننت ها برای هر صفحه ---

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

const NewIssuePage = () => {
    const projectOptions = [ 'برنامه آموزش', 'برنامه ریزی', 'جلسات ، مرخصی ، اختاریه ، جرایم و تشویق', 'حوزه پاسخگویی', 'روند کار', 'شرکت های حذف شده', 'تست', 'واحد کامپیوتر', 'کلیپ های اموزشی', 'اشخاص حوزه پاسخگویی' ];
    const issueTypeOptions = [ 'درخواست های پرسنل', 'وضعیت پرونده مالیاتی', 'درخواست خدمات', 'تحویل مدارک - مکاتبات - تایید درآمد', 'درصد پیشرفت کار شرکت', 'درخواست لوازم مصرفی', 'حواله خروجی', 'پاداش و جرایم', 'محاسبه حقوق پرسنل', 'مشخصات شرکت', 'چک لیست های سال قبل', 'برگ تجربه', 'چک لیست اشخاص', 'چک لیست حقوق و بیمه', 'تاییدیه درآمد', 'برنامه آموزش', 'وبلاگ', 'درصد پیشرفت کار', 'پیگیری مدارک', 'پاداش و متفرقه', 'درصد پیشرفت کار +' ];
    const statusOptions = ['برای انجام', 'در حال بررسی', 'انجام شده'];
    const priorityOptions = ['کم', 'معمولی', 'زیاد', 'فوری'];
    const users = ['کاربر ۱', 'کاربر ۲', 'کاربر ۳'];
    
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

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

    return (
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md animate-fade-in-fast">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">مسئله جدید</h2>
                <div className="flex items-center">
                    <input id="confidential" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="confidential" className="mr-2 text-sm font-medium text-gray-700">محرمانه</label>
                </div>
            </div>
            
            <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">پروژه <span className="text-red-500">*</span></label>
                        <select id="project" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                            <option>--- انتخاب کنید ---</option>
                            {projectOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="issue-type" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            نوع مسئله <span className="text-red-500 mr-1">*</span>
                            <LightbulbIcon />
                        </label>
                        <select id="issue-type" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                           <option>--- انتخاب کنید ---</option>
                           {issueTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">موضوع <span className="text-red-500">*</span></label>
                    <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیح</label>
                    <div className="border border-gray-300 rounded-md">
                        <EditorToolbar />
                        <textarea id="description" rows={10} value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border-0 rounded-b-md focus:ring-0 sm:text-sm p-3"></textarea>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-t pt-6">
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
                        <select id="status" defaultValue="برای انجام" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                            {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">اولویت</label>
                        <select id="priority" defaultValue="معمولی" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                            {priorityOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">مسئول</label>
                        <select id="assignee" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                            <option>--- انتخاب کنید ---</option>
                            {users.map(user => <option key={user}>{user}</option>)}
                        </select>
                    </div>
                    <div className="relative">
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">تاریخ آغاز</label>
                        <input type="text" id="start-date" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="1403/05/01" />
                        <span className="absolute left-3 top-8"><CalendarIcon /></span>
                    </div>
                    <div className="relative">
                        <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">تاریخ سررسید</label>
                        <input type="text" id="due-date" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                         <span className="absolute left-3 top-8"><CalendarIcon /></span>
                    </div>
                      <div>
                        <label htmlFor="request-type" className="block text-sm font-medium text-gray-700 mb-1">نوع درخواست</label>
                        <select id="request-type" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                           <option>--- انتخاب کنید ---</option>
                        </select>
                    </div>
                 </div>

                 <div>
                    <label htmlFor="extra-desc" className="block text-sm font-medium text-gray-700 mb-1">توضیح</label>
                    <input type="text" id="extra-desc" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                </div>
                
                 <div className="flex justify-start pt-4">
                    <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">ایجاد</button>
                    <button type="button" className="mr-3 px-6 py-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">لغو</button>
                </div>

            </form>
        </div>
    );
}

const AssetsPage = () => {
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [optionsOpen, setOptionsOpen] = useState(true);

    const assetsData = [
        { id: '83453', project: 'واحد عملکرد مالیاتی', type: 'تجهیزات', status: 'در حال استفاده', title: 'موتور برق', recipient: 'سید رحیم محفوظیان', updatedAt: '1400/07/12 16:58' },
        { id: '83398', project: 'واحد عملکرد مالیاتی', type: 'کامپیوتر', status: 'در حال استفاده', title: 'All in One Dell', recipient: 'علیرضا ابومسیح', updatedAt: '1400/07/12 10:52' },
        { id: '81698', project: 'واحد عملکرد مالیاتی', type: 'تجهیزات', status: 'در حال استفاده', title: 'داکت تلفن های گرند استریم voip gp755', recipient: 'جواد صالحی', updatedAt: '1400/07/26 16:49' },
        { id: '81537', project: 'واحد عملکرد مالیاتی', type: 'تجهیزات', status: 'در حال استفاده', title: 'دوربین راهروی طبقه 3 وصال', recipient: '', updatedAt: '1400/06/25 14:39' },
        { id: '81536', project: 'واحد عملکرد مالیاتی', type: 'تجهیزات', status: 'در حال استفاده', title: 'دوربین واحد عملکرد وصال', recipient: '', updatedAt: '1400/06/25 14:32' },
        { id: '81535', project: 'واحد عملکرد مالیاتی', type: 'تجهیزات', status: 'در حال استفاده', title: 'دوربین واحد آموزش وصال', recipient: '', updatedAt: '1400/06/25 14:31' },
    ];
    
    return (
        <div className="p-4 sm:p-0 bg-white rounded-lg shadow-md animate-fade-in-fast">
             <div className="flex justify-between items-center mb-4 px-4 pt-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                        {filtersOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        <span>غربال‌ها</span>
                    </button>
                    <button onClick={() => setOptionsOpen(!optionsOpen)} className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                         {optionsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        <span>گزینه‌ها</span>
                    </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-semibold text-sm rounded-md hover:bg-gray-300">
                    <span className="text-lg">+</span>
                    <span>دارایی جدید</span>
                </button>
            </div>

            {filtersOpen && (
                 <div className="px-4 pb-4 border-b">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <input id="status-filter" type="checkbox" defaultChecked className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                            <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">وضعیت</label>
                        </div>
                         <select className="w-48 px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                            <option>موجود</option>
                         </select>
                         <button className="text-sm text-sky-600 font-semibold hover:underline">+ افزودن غربال</button>
                    </div>
                </div>
            )}
             {optionsOpen && (
                 <div className="px-4 py-2 border-b">
                     <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 border rounded-md hover:bg-gray-100"><TableIcon /></button>
                        <button className="p-1.5 border rounded-md hover:bg-gray-100"><XIcon /></button>
                         <button className="p-1.5 border rounded-md hover:bg-gray-100"><ChevronDownIcon /></button>
                    </div>
                 </div>
             )}
            
            <div className="overflow-x-auto">
                 <table className="min-w-full text-sm text-right">
                    <thead className="bg-[#f0ece1] text-gray-700">
                        <tr>
                            <th className="p-3 w-4"><input type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" /></th>
                            <th className="p-3 font-semibold">#</th>
                            <th className="p-3 font-semibold">پروژه</th>
                            <th className="p-3 font-semibold">نوع دارایی</th>
                            <th className="p-3 font-semibold">وضعیت</th>
                            <th className="p-3 font-semibold">عنوان</th>
                            <th className="p-3 font-semibold">تحویل‌گیرنده</th>
                            <th className="p-3 font-semibold">به‌روز شده در</th>
                            <th className="p-3 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {assetsData.map(asset => (
                             <tr key={asset.id} className="hover:bg-gray-50">
                                <td className="p-3"><input type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" /></td>
                                <td className="p-3 text-sky-600 hover:underline cursor-pointer">{asset.id}</td>
                                <td className="p-3">{asset.project}</td>
                                <td className="p-3">{asset.type}</td>
                                <td className="p-3">{asset.status}</td>
                                <td className="p-3">{asset.title}</td>
                                <td className="p-3">{asset.recipient}</td>
                                <td className="p-3 text-gray-500">{asset.updatedAt}</td>
                                <td className="p-3"><button><EllipsisIcon /></button></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
}

const ProjectsPage: React.FC<{isAdmin: boolean}> = ({ isAdmin }) => {
    const [activeModule, setActiveModule] = useState<ProjectModule>(ProjectModule.Timeline);
    const modules = Object.values(ProjectModule);

    const renderModuleContent = () => {
        const ModuleCard: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
            <div className="p-8 bg-white rounded-lg shadow-md animate-fade-in-fast">
                <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-4">{title}</h2>
                <div className="text-slate-600">{children}</div>
            </div>
        );

        switch (activeModule) {
            case ProjectModule.Overview:
                return <ModuleCard title="نمای کلی پروژه">اینجا داشبورد و اطلاعات کلی پروژه نمایش داده می شود.</ModuleCard>;
            case ProjectModule.Timeline:
                return <TimelinePage />;
            case ProjectModule.Issues:
                return <NewIssuePage />;
             case ProjectModule.Assets:
                return <AssetsPage />;
            case ProjectModule.Calendar:
                return <CalendarPage />;
            default:
                return <ModuleCard title={activeModule}>محتوای صفحه "{activeModule}" در اینجا قرار خواهد گرفت.</ModuleCard>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 border rounded-md py-2 px-3 bg-white hover:bg-gray-50 transition-colors">
                        <StackIcon />
                        <span className="font-semibold text-sm text-gray-700">انتخاب پروژه</span>
                        <ChevronDownIcon />
                    </button>
                    {isAdmin && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold text-sm rounded-md hover:bg-sky-700 transition-all">
                           <span className="text-lg">+</span>
                           <span>پروژه جدید</span>
                        </button>
                    )}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3"> <SearchIcon /> </span>
                        <input type="text" placeholder="جستجو..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-800">برنامه جلسه های مودیان</h2>
                    <RocketIcon />
                </div>
            </div>

            <nav className="bg-sky-700 text-white rounded-full p-1.5 shadow-lg">
                 <ul className="flex items-center justify-around">
                     {modules.map(module => (
                         <li key={module} className="flex-1">
                             <button
                                 onClick={() => setActiveModule(module)}
                                 className={`w-full py-2 px-4 text-sm font-medium transition-all duration-300 relative rounded-full ${
                                    activeModule === module ? 'text-sky-700 bg-white shadow-sm' : 'text-sky-100 hover:bg-white/20'
                                 }`}
                             >
                                 {module}
                             </button>
                         </li>
                     ))}
                 </ul>
            </nav>

            <div className="mt-6">
                {renderModuleContent()}
            </div>
        </div>
    );
};


export const MainContent: React.FC<MainContentProps> = ({ activeView, isAdmin }) => {
  const renderContent = () => {
    switch (activeView) {
      case View.MyPage:
        return <MyPage />;
      case View.Projects:
        return <ProjectsPage isAdmin={isAdmin} />;
      case View.Help:
        return (
          <div className="transform hover:scale-105 transition-transform duration-300 animate-fade-in">
            <ContentCard icon={<HelpIcon />} title="راهنما و پشتیبانی">
              برای راهنمایی در مورد نحوه استفاده از سیستم و تماس با پشتیبانی، به این بخش مراجعه کنید.
            </ContentCard>
          </div>
        );
      case View.Management:
        return <ManagementPage />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-2">
      {renderContent()}
    </div>
  );
};
