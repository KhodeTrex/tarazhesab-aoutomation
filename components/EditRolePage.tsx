import React, { useState } from 'react';
import { Role } from '../types';

interface EditRolePageProps {
  role: Role;
  onBack: () => void;
}

const permissionsData = {
    'پروژه': ['انتخاب ابزارهای پروژه', 'مدیریت اعضا', 'نمایش یادآور مساله', 'حذف پیام‌ها', 'مدیریت پیام‌ها', 'افزودن پیام‌ها', 'مشاهده پیام‌ها', 'نمایش فهرست ناظرها', 'افزودن ناظرها', 'حذف ناظرها', 'ویرایش پیام خود', 'حذف پیام خود', 'مدیریت ارتباط مخاطب فرزند', 'مشاهده یادداشت‌های محرمانه', 'ویرایش یادداشت خود'],
    'انجمن': ['مشاهده پیام‌ها', 'افزودن پیام‌ها', 'ویرایش پیام‌ها', 'حذف پیام‌ها', 'ویرایش پیام خود', 'حذف پیام خود', 'مدیریت انجمن', 'مدیریت ناظرها', 'ذخیره‌سازی جستارها', 'مشاهده پیوست‌ها', 'مدیریت پیوست‌ها'],
    'تقویم': ['مشاهده تقویم'],
    'پیگیری مخاطبین': ['مشاهده مخاطبین', 'افزودن مخاطب', 'ویرایش مخاطب', 'حذف مخاطب', 'تنظیم مخاطب‌های خود به عمومی یا محرمانه', 'تنظیم یادداشت‌های خود به عمومی یا محرمانه', 'مشاهده یادداشت‌های محرمانه', 'مدیریت دسته‌های مخاطبین', 'وارد کردن مخاطب', 'مدیریت ارتباط مسائل', 'رونوشت مسائل', 'افزودن یادداشت‌ها', 'ویرایش یادداشت‌ها', 'ویرایش یادداشت خود', 'حذف ناظرها', 'افزودن ناظرها', 'ویرایش موارد چک‌لیست'],
    'سند': ['مشاهده اسناد', 'افزودن اسناد', 'ویرایش اسناد', 'حذف اسناد', 'مدیریت اسناد'],
    'پرونده‌ها': ['مشاهده پرونده‌ها', 'مدیریت پرونده‌ها'],
    'گانت': ['مشاهده نمودار گانت'],
    'پیگیری مسئله‌ها': ['مشاهده مسئله‌ها', 'مدیریت زیرکارها', 'افزودن مسئله‌ها', 'ویرایش مسئله‌ها', 'مدیریت فهرست ناظرها', 'حذف مسئله‌ها', 'افزودن یادداشت‌ها', 'ویرایش یادداشت‌ها', 'ویرایش یادداشت خود', 'مشاهده یادداشت‌های محرمانه', 'تنظیم یادداشت‌ها به صورت محرمانه', 'مشاهده ناظرها', 'افزودن ناظرها', 'حذف ناظرها', 'وارد کردن مسائل', 'مدیریت دسته‌های مسئله', 'نمایش چک‌لیست', 'مدیریت ارتباط مسائل', 'رونوشت مسائل', 'ویرایش موارد چک‌لیست'],
    'محل استقرار': ['مشاهده محل استقرار', 'افزودن محل استقرار', 'ویرایش محل استقرار', 'حذف محل استقرار', 'تنظیم محل استقرار خود به عمومی یا محرمانه', 'تنظیم یادداشت‌های خود به عمومی یا محرمانه', 'مشاهده یادداشت‌های محرمانه', 'مدیریت دسته‌های محل استقرار', 'وارد کردن محل استقرار', 'مدیریت ارتباط مسائل', 'رونوشت مسائل', 'افزودن یادداشت‌ها', 'ویرایش یادداشت‌ها', 'حذف ناظرها', 'افزودن ناظرها', 'وارد کردن محل استقرار'],
    'مخزن': ['مشاهده تغییرات', 'مرور مخزن', 'مدیریت مخزن'],
    'پیگیری زمان': ['وارد کردن زمان صرف‌شده', 'مشاهده زمان‌های صرف‌شده', 'ویرایش زمان‌های صرف‌شده', 'ویرایش زمان صرف‌شده خود', 'مدیریت دسته‌بندی زمان‌های', 'ثبت زمان برای سایر کاربران'],
    'وبلاگ': ['مشاهده وبلاگ', 'مدیریت وبلاگ'],
    'دانش‌نامه': ['مشاهده دانش‌نامه', 'مشاهده تاریخچه دانش‌نامه', 'صدور صفحات دانش‌نامه', 'محافظت صفحات دانش‌نامه', 'حذف کردن صفحات دانش‌نامه', 'تغییر نام صفحات دانش‌نامه', 'مشاهده سابقه دانش‌نامه', 'افزودن دیدگاه', 'مدیریت دانش‌نامه', 'حذف کردن پیوست‌های دانش‌نامه', 'ویرایش صفحات دانش‌نامه'],
};

const issueTrackingTypes = [
    'همه انواع مسئله‌ها', 'گزارش کار', 'ثبت شرکت‌ها', 'سایر', 'خدمات عملکرد', 'مالیاتی', 'مطالبات', 'درخواست های پرسنل', 'وضعیت پرونده مالیاتی', 'برنامه کاری (پیش بینی)', 'شرکت‌های محول شده', 'درخواست خدمات', 'پلمپ دفاتر', 'تحویل مدارک-مکاتبات-تاییددرآمد', 'چک لیست', 'صورت جلسات', 'درصد پیشرفت کار شرکت', 'برنامه کاری', 'درخواست لوازم مصرفی', 'امتیاز شرکت', 'حواله خروجی', 'پاداش و جرایم', 'قرارداد', 'گزارشات مورد نیاز حسابرس', 'محاسبه حقوق پرسنل', 'مشخصات شرکت', 'چک لیست سالهای قبل', 'برگ تجربه', 'چک لیست اشخاص', 'چک لیست حقوق و بیمه', 'تاییدیه درآمد', 'برنامه آموزش', 'وبلاگ', 'درصد پیشرفت کار', 'درصد پیشرفت کار +', 'پیگیری مدارک', 'پاداش پایان سال', 'موارد متفرقه', 'حقوق پاسخگویی', 'پیگیری مدارک', 'دریافت مدارک', 'بایگانی', 'پاداش و متفرقه', 'حقوق و پاداش و جرایم', 'ایاب ذهاب (کمک هزینه)', 'حقوق واحد کامپیوتر'
];


const PermissionGroup: React.FC<{ title: string; permissions: string[] }> = ({ title, permissions }) => {
    return (
        <div className="border rounded-md">
            <div className="p-2 bg-gray-100 border-b flex items-center">
                <input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                <label className="mr-2 text-sm font-semibold text-gray-700">{title}</label>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-2">
                {permissions.map(perm => (
                    <div key={perm} className="flex items-center">
                        <input id={`perm-${title}-${perm}`} type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor={`perm-${title}-${perm}`} className="mr-2 text-sm text-gray-600">{perm}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const EditRolePage: React.FC<EditRolePageProps> = ({ role, onBack }) => {
    const [roleName, setRoleName] = useState(role.name);

    return (
        <div className="animate-fade-in-fast space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">
                <button onClick={onBack} className="text-sky-600 hover:underline">نقش ها و دسترسی ها</button>
                <span className="mx-2 text-gray-400">&raquo;</span>
                <span>{role.name}</span>
            </h2>

            <div className="bg-white p-6 border rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="flex items-center">
                        <label htmlFor="roleName" className="w-40 text-sm font-semibold text-gray-700 shrink-0">نام</label>
                        <input 
                            type="text" 
                            id="roleName" 
                            value={roleName}
                            onChange={e => setRoleName(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input id="can-be-assigned" type="checkbox" defaultChecked className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="can-be-assigned" className="mr-2 text-sm text-gray-600">مسئله‌ها می‌توانند به کاربرانی که این نقش را دارند، واگذار شوند</label>
                    </div>
                     <div className="flex items-center">
                        <label htmlFor="issue-visibility" className="w-40 text-sm font-semibold text-gray-700 shrink-0">آشکاری مسئله‌ها</label>
                        <select id="issue-visibility" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm">
                            <option>مسئله‌هایی که کاربر سازنده یا مسئول آن است</option>
                        </select>
                    </div>
                     <div className="flex items-center">
                        <label htmlFor="user-visibility" className="w-40 text-sm font-semibold text-gray-700 shrink-0">آشکاری کاربران</label>
                        <select id="user-visibility" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm">
                            <option>همه کاربران فعال</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">دسترسی‌ها</h3>
                {Object.entries(permissionsData).map(([groupTitle, perms]) => (
                    <PermissionGroup key={groupTitle} title={groupTitle} permissions={perms} />
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">پیگیری مسئله‌ها</h3>
                <div className="overflow-x-auto border rounded-md">
                     <table className="min-w-full text-sm text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 font-semibold text-gray-700 text-right">نوع مسئله</th>
                                <th className="p-2 font-semibold text-gray-700">مشاهده مسئله‌ها</th>
                                <th className="p-2 font-semibold text-gray-700">افزودن مسئله‌ها</th>
                                <th className="p-2 font-semibold text-gray-700">ویرایش مسئله‌ها</th>
                                <th className="p-2 font-semibold text-gray-700">حذف مسئله‌ها</th>
                                <th className="p-2 font-semibold text-gray-700">افزودن یادداشت‌ها</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {issueTrackingTypes.map((type, index) => (
                                <tr key={type} className={index === 0 ? 'bg-gray-50 font-semibold' : 'hover:bg-gray-50'}>
                                    <td className="p-2 text-right">{type}</td>
                                    <td className="p-2"><input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" /></td>
                                    <td className="p-2"><input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" /></td>
                                    <td className="p-2"><input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" /></td>
                                    <td className="p-2"><input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" /></td>
                                    <td className="p-2"><input type="checkbox" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" /></td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <button className="text-sky-600 hover:underline">انتخاب همه</button>
                    <button className="text-sky-600 hover:underline">انتخاب هیچ</button>
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
