import React, { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

enum SettingsTab {
  General = 'عمومی',
  Display = 'نمایش',
  Authentication = 'احراز هویت',
  Email = 'آگاه‌سازی‌های رایانامه‌ای',
  Api = 'API',
}

// Helper components for form elements
const LabeledInput: React.FC<{label: string, id: string, children: React.ReactNode, description?: string}> = ({label, id, children, description}) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3">
        <label htmlFor={id} className="w-full sm:w-64 text-sm font-semibold text-gray-700 text-right shrink-0 pr-2">{label}</label>
        <div className="w-full mt-1 sm:mt-0">
            {children}
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
    </div>
);

const TextInput: React.FC<{id: string, value: string}> = ({id, value}) => (
    <input type="text" id={id} defaultValue={value} className="w-full sm:w-80 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
);

const SelectInput: React.FC<{id: string, children: React.ReactNode, value: string}> = ({id, children, value}) => (
    <select id={id} defaultValue={value} className="w-full sm:w-80 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500">
        {children}
    </select>
);

const CheckboxInput: React.FC<{id: string, label: string, checked?: boolean}> = ({id, label, checked}) => (
     <div className="flex items-center">
        <input id={id} type="checkbox" defaultChecked={checked} className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
        <label htmlFor={id} className="mr-2 text-sm text-gray-700">{label}</label>
    </div>
);


const GeneralSettings = () => (
    <div className="divide-y divide-gray-200">
        <LabeledInput label="عنوان برنامه" id="app-title">
            <TextInput id="app-title" value="تراز حساب" />
        </LabeledInput>
        <LabeledInput label="متن خوش‌آمدگویی" id="welcome-text" description="این متن در صفحه خانه برای کاربرانی که وارد نشده‌اند، نمایش داده می‌شود.">
            <textarea id="welcome-text" rows={5} className="w-full sm:w-80 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"></textarea>
        </LabeledInput>
         <LabeledInput label="بیشترین اندازه پیوست" id="max-attachment-size">
            <TextInput id="max-attachment-size" value="10240" />
        </LabeledInput>
         <LabeledInput label="بیشترین اندازه متن ویکی" id="max-wiki-text-size">
            <TextInput id="max-wiki-text-size" value="10240" />
        </LabeledInput>
         <LabeledInput label="پروژه‌های نمایش داده شده در فهرست پرش" id="jump-list-projects">
            <TextInput id="jump-list-projects" value="10" />
        </LabeledInput>
    </div>
);

const DisplaySettings = () => (
     <div className="divide-y divide-gray-200">
        <LabeledInput label="تم" id="theme">
            <SelectInput id="theme" value="default">
                <option value="default">پیش‌فرض</option>
                <option value="dark">تاریک</option>
            </SelectInput>
        </LabeledInput>
        {/* FIX: The descriptive text was incorrectly placed in a separate LabeledInput component, which caused a type error because it lacked children. Moved the text to the `description` prop of the correct component. */}
        <LabeledInput label="زبان پیش‌فرض" id="default-lang" description="کاربران ناشناس و کاربرانی که وارد نشده‌اند از این زبان استفاده می‌کنند.">
            <SelectInput id="default-lang" value="fa">
                <option value="fa">Persian (Persian)</option>
                <option value="en">English (English)</option>
            </SelectInput>
        </LabeledInput>

        <LabeledInput label="شروع تقویم از" id="calendar-start">
            <SelectInput id="calendar-start" value="saturday">
                <option value="saturday">شنبه</option>
                <option value="sunday">یکشنبه</option>
                <option value="monday">دوشنبه</option>
            </SelectInput>
        </LabeledInput>
        <LabeledInput label="فرمت تاریخ" id="date-format">
            <SelectInput id="date-format" value="YYYY/MM/DD">
                <option value="YYYY/MM/DD">1399/02/20</option>
                <option value="DD/MM/YYYY">20/02/1399</option>
            </SelectInput>
        </LabeledInput>
         <LabeledInput label="فرمت زمان" id="time-format">
            <SelectInput id="time-format" value="HH:mm">
                <option value="HH:mm">13:00</option>
                <option value="h:mm a">01:00 ب.ظ</option>
            </SelectInput>
        </LabeledInput>
    </div>
);

const AuthenticationSettings = () => (
    <div className="divide-y divide-gray-200">
        <LabeledInput label="احراز هویت الزامی است" id="auth-required">
            <CheckboxInput id="auth-required" label="" checked />
        </LabeledInput>
        <LabeledInput label="ثبت‌نام خودکار" id="self-registration">
             <SelectInput id="self-registration" value="disabled">
                <option value="disabled">غیرفعال</option>
                <option value="email_activation">فعال‌سازی با رایانامه</option>
                <option value="manual_activation">فعال‌سازی دستی توسط راهبر</option>
            </SelectInput>
        </LabeledInput>
         <LabeledInput label="اجازه به کاربران برای حذف حساب خود" id="allow-delete-account">
            <CheckboxInput id="allow-delete-account" label="" />
        </LabeledInput>
         <LabeledInput label="کمترین درازای گذرواژه" id="min-password-length">
            <TextInput id="min-password-length" value="8" />
        </LabeledInput>
         <LabeledInput label="زمان انقضای نشست" id="session-timeout">
            <TextInput id="session-timeout" value="60" />
            <p className="text-xs text-gray-500 mt-1">زمان به دقیقه. برای غیرفعال کردن، خالی بگذارید.</p>
        </LabeledInput>
    </div>
);

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.General);

  const tabs = [
    SettingsTab.General,
    SettingsTab.Display,
    SettingsTab.Authentication,
    SettingsTab.Email,
    SettingsTab.Api
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case SettingsTab.General: return <GeneralSettings />;
      case SettingsTab.Display: return <DisplaySettings />;
      case SettingsTab.Authentication: return <AuthenticationSettings />;
      // Add other tabs later
      default: return <p className="text-gray-500 p-4">تنظیمات مربوط به این بخش هنوز پیاده‌سازی نشده است.</p>;
    }
  };

  return (
    <div className="animate-fade-in-fast space-y-6">
      <div>
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <button onClick={onBack} className="text-sky-600 hover:underline">راه بری</button>
            </li>
            <li>
              <span className="mx-2 text-gray-400">&gt;</span>
            </li>
            <li className="text-gray-500" aria-current="page">
              تنظیمات
            </li>
          </ol>
        </nav>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 space-x-reverse px-4" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab 
                    ? 'border-sky-500 text-sky-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
            {renderTabContent()}
        </div>
      </div>
      
      <div className="flex justify-start">
        <button className="px-8 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors">
            ذخیره
        </button>
      </div>
    </div>
  );
};