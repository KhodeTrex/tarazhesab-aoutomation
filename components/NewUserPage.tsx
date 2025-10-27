import React, { useState } from 'react';
import { User } from '../types';

// Icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;

interface NewUserPageProps {
  onBack: () => void;
  onCreateUser: (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => void;
}

export const NewUserPage: React.FC<NewUserPageProps> = ({ onBack, onCreateUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '09168082580',
    position: '',
    isAdmin: false,
    password: '',
    passwordConfirmation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [id]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleCreate = (continueAfter: boolean) => {
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      alert('لطفا فیلدهای الزامی (نام کاربری، نام کوچک، نام خانوادگی، رایانامه، سمت) را پر کنید.');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
        alert('لطفا گذرواژه را با حداقل ۸ کاراکتر وارد کنید.');
        return;
    }
    if (formData.password !== formData.passwordConfirmation) {
        alert('گذرواژه و تکرار آن مطابقت ندارند.');
        return;
    }

    const { password, passwordConfirmation, ...userDataForCreation } = formData;
    onCreateUser(userDataForCreation);

    if (continueAfter) {
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '09168082580',
        position: '',
        isAdmin: false,
        password: '',
        passwordConfirmation: '',
      });
    } else {
      onBack();
    }
  };
  
  const LabeledInput: React.FC<{label: string, id: string, required?: boolean, children: React.ReactNode, className?: string, labelClassName?: string}> = ({label, id, required, children, className, labelClassName}) => (
    <div className={`flex flex-row-reverse items-center ${className}`}>
      <label htmlFor={id} className={`text-sm font-medium text-gray-700 text-right shrink-0 pr-2 ${labelClassName}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full">{children}</div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in-fast">
      <div className="mb-6">
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <button onClick={onBack} className="text-sky-600 hover:underline">کاربران</button>
            </li>
            <li>
              <span className="mx-2 text-gray-400">&gt;</span>
            </li>
            <li className="text-gray-500" aria-current="page">
              کاربر جدید
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Right Form Column (in RTL) */}
        <div className="flex-grow space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">اطلاعات</h3>
            <div className="space-y-4 pt-4">
                <LabeledInput label="نام کاربری" id="username" required labelClassName="w-32">
                    <input type="text" id="username" value={formData.username} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                 <LabeledInput label="نام کوچک" id="firstName" required labelClassName="w-32">
                    <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <LabeledInput label="نام خانوادگی" id="lastName" required labelClassName="w-32">
                    <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <LabeledInput label="رایانامه" id="email" required labelClassName="w-32">
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <LabeledInput label="شماره تلفن" id="phone" labelClassName="w-32">
                    <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                 <LabeledInput label="شرح وظایف" id="jobDescription" labelClassName="w-32">
                    <div className="flex items-center gap-2">
                        <input type="file" id="jobDescription" className="text-xs w-full"/>
                        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"><PlusIcon /></button>
                        <span className="text-xs text-gray-500 whitespace-nowrap">(بیشترین اندازه: ۱۰ مگابایت)</span>
                    </div>
                </LabeledInput>
                <LabeledInput label="تاریخ استخدام" id="hireDate" required labelClassName="w-32">
                    <div className="relative w-full">
                        <input id="hireDate" type="text" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm"/>
                        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                    </div>
                </LabeledInput>
                 <LabeledInput label="تاریخ پایان قرارداد" id="contractEndDate" labelClassName="w-32">
                    <div className="relative w-full">
                        <input id="contractEndDate" type="text" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm"/>
                        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                    </div>
                </LabeledInput>
                <LabeledInput label="قفل شایگان" id="shayganLock" labelClassName="w-32">
                     <select id="shayganLock" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"><option></option></select>
                </LabeledInput>
                <LabeledInput label="شماره تماس داخلی" id="internalPhone" labelClassName="w-32">
                    <input type="text" id="internalPhone" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <LabeledInput label="سمت" id="position" required labelClassName="w-32">
                     <select id="position" value={formData.position} onChange={handleInputChange} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"><option value="">--- انتخاب کنید ---</option><option value="کاربر">کاربر</option><option value="مدیر">مدیر</option></select>
                </LabeledInput>
                <LabeledInput label="تاریخ تولد" id="birthDate" labelClassName="w-32">
                     <div className="relative w-full">
                        <input id="birthDate" type="text" defaultValue="albughbish" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm"/>
                        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none"><CalendarIcon /></div>
                    </div>
                </LabeledInput>
                <LabeledInput label="راهبر" id="isAdmin" labelClassName="w-32">
                    <input id="isAdmin" type="checkbox" checked={formData.isAdmin} onChange={handleInputChange} className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                </LabeledInput>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">احراز هویت</h3>
            <div className="space-y-4 pt-4">
                 <LabeledInput label="گذرواژه" id="password" required labelClassName="w-32">
                    <input type="password" id="password" value={formData.password} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <p className="text-xs text-gray-500" style={{paddingRight: '8.5rem'}}>کمترین اندازه ۸ است</p>
                 <LabeledInput label="تکرار گذرواژه" id="passwordConfirmation" required labelClassName="w-32">
                    <input type="password" id="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                 <div className="flex justify-start gap-6" style={{paddingRight: '8.5rem'}}>
                     <div className="flex items-center">
                        <input id="generatePassword" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="generatePassword" className="mr-2 text-sm font-medium text-gray-700">تولید گذرواژه</label>
                    </div>
                     <div className="flex items-center">
                        <input id="forcePasswordChange" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="forcePasswordChange" className="mr-2 text-sm font-medium text-gray-700">لزوم تغییر گذرواژه در ورود بعدی</label>
                    </div>
                 </div>
            </div>
          </div>
        </div>

        {/* Left Preferences Column (in RTL) */}
        <div className="w-full lg:w-96 shrink-0 space-y-4">
            <div className="p-4 border rounded-md">
                <h3 className="text-base font-semibold text-gray-600 mb-2">آگاه‌سازی‌های رایانامه‌ای</h3>
                <select className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm mb-4">
                    <option>برای هر رویداد در همه پروژه‌ها</option>
                    <option>فقط برای چیزهایی که خودم می‌بینم یا در آن‌ها مشارکت دارم</option>
                </select>
                <div className="flex items-center mb-2">
                    <input id="notify-high-priority" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="notify-high-priority" className="mr-2 text-sm text-gray-700">مرا در مورد مسائلی با اولویت زیاد و بالاتر، آگاه کن</label>
                </div>
                <div className="flex items-center">
                    <input id="notify-own-changes" type="checkbox" defaultChecked className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="notify-own-changes" className="mr-2 text-sm text-gray-700">نمی‌خواهم از تغییراتی که خودم می‌دهم آگاه شوم</label>
                </div>
            </div>
            
             <div className="p-4 border rounded-md">
                <h3 className="text-base font-semibold text-gray-600 mb-2">آگاه‌سازی‌های مرورگری</h3>
                 <select className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm mb-4">
                    <option>برای هر رویداد در همه پروژه‌ها</option>
                </select>
                <div className="flex items-center mb-2">
                    <input id="browser-notify-own-changes" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="browser-notify-own-changes" className="mr-2 text-sm text-gray-700">نمی‌خواهم از تغییراتی که خودم می‌دهم آگاه شوم</label>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">دستگاه‌های متصل شده:</label>
                    <p className="text-sm text-gray-500 mt-1">موردی یافت نشد</p>
                </div>
            </div>
            
            <div className="p-4 border rounded-md">
                <h3 className="text-base font-semibold text-gray-600 mb-2">آگاه‌سازی‌های پیامکی</h3>
                 <select className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm mb-4">
                    <option>هیچ رویدادی</option>
                </select>
                <div className="flex items-center">
                    <input id="sms-notify-own-changes" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="sms-notify-own-changes" className="mr-2 text-sm text-gray-700">نمی‌خواهم از تغییراتی که خودم می‌دهم آگاه شوم</label>
                </div>
            </div>

            <div className="p-4 border rounded-md">
                <h3 className="text-base font-semibold text-gray-600 mb-4">ترجیح‌ها</h3>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <input id="hide-email" type="checkbox" defaultChecked className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="hide-email" className="mr-2 text-sm text-gray-700">رایانامه من پنهان شود</label>
                    </div>
                    <LabeledInput label="محدوده زمانی" id="timezone" className="!items-start" labelClassName="w-48">
                        <select id="timezone" className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"></select>
                    </LabeledInput>
                     <LabeledInput label="نمایش نظرات" id="comments-display" className="!items-start" labelClassName="w-48">
                        <select id="comments-display" className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"><option>به ترتیب تاریخ</option></select>
                    </LabeledInput>
                    <LabeledInput label="تعداد پروژه‌های اخیر در پنجره انتخاب پروژه" id="recent-projects" className="!items-start" labelClassName="w-48">
                        <input id="recent-projects" type="number" defaultValue="3" className="w-full bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"/>
                    </LabeledInput>
                    <LabeledInput label="برگه پیش‌فرض در سابقه مسئله" id="default-issue-tab" className="!items-start" labelClassName="w-48">
                         <select id="default-issue-tab" className="block w-full px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"><option>یادداشت</option></select>
                    </LabeledInput>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <button onClick={() => handleCreate(false)} type="button" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                ساخت
            </button>
             <button onClick={() => handleCreate(true)} type="button" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                ساخت و ادامه
            </button>
        </div>
        <div className="flex items-center">
            <input id="send-account-data" type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
            <label htmlFor="send-account-data" className="mr-2 text-sm font-medium text-gray-700">ارسال داده های حساب به کاربر</label>
        </div>
      </div>
    </div>
  );
};