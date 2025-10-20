import React from 'react';

// --- Icons ---
const UserIcon = ({ color, initial }: { color: string, initial: string }) => (
    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${color} ring-4 ring-white`}>
        {initial}
    </div>
);
const PurpleIcon = () => (
    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-100 ring-4 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M5 21v-4M3 19h4M12 3v4M10 5h4M12 21v-4M10 19h4M19 3v4M17 5h4M19 21v-4M17 19h4" />
        </svg>
    </div>
);
const BlueIcon = () => (
    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 ring-4 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

interface TimelineEvent {
  id: number;
  time: string;
  description: React.ReactNode;
  author: string;
  authorRole?: string;
  icon: React.ReactNode;
}

const timelineData: { [date: string]: TimelineEvent[] } = {
    'امروز': [
        { id: 1, time: '13:04', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85177#</strong> (برای انجام): پرینت قبض مسلم نیک مهر</>, author: 'فریده آلبوغیش', icon: <UserIcon color="bg-gray-400" initial="ف"/> },
        { id: 2, time: '13:03', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85176#</strong> (برای انجام): ویرایش و ارسال معاملات فصلی شرکت آراس سلامت محور</>, author: 'فریده آلبوغیش', icon: <UserIcon color="bg-gray-400" initial="ف"/> },
        { id: 3, time: '13:01', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85175#</strong> (برای انجام): اظهارنامه ارث محمدعلی قنواتی</>, author: 'فریده آلبوغیش', icon: <UserIcon color="bg-gray-400" initial="ف"/> },
        { id: 4, time: '12:09', description: <>واحد عملکرد مالیاتی - درخواست لوازم مصرفی <strong>#85171#</strong> (برای انجام): دیوایدر</>, author: 'ساناز مقیمی', icon: <PurpleIcon /> },
        { id: 5, time: '09:48', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85161#</strong> (برای انجام): اظهارنامه ارث محمدعلی قنواتی</>, author: 'فریده آلبوغیش', icon: <UserIcon color="bg-gray-400" initial="ف"/> },
        { id: 6, time: '09:33', description: <>واحد عملکرد مالیاتی - درخواست لوازم مصرفی <strong>#85163#</strong> (برای انجام): 3 بسته آچار</>, author: 'رضا شریفیات', icon: <UserIcon color="bg-gray-400" initial="ر"/> },
    ].sort((a,b) => b.time.localeCompare(a.time)),
    '1404-07-26': [
        { id: 7, time: '19:05', description: <>واحد عملکرد مالیاتی - درخواست های پرسنل <strong>#85120#</strong> (برای انجام): تسلط به حداقل ها و قوانین موردنیاز جهت رسیدگی / آشنایی با گزارشات حسابرسی/ پرینت صفحات مهم / گزارشات موردنیاز رسیدگی / آشنایی با قراردادها / تهیه جدول قراردادها / ارسال معاملات فصلی / اصلاحیه 169 با توجه به سامانه مودیان و پایانه های فصلی.</>, author: 'الناز دریکی', icon: <BlueIcon /> },
        { id: 8, time: '16:23', description: <>واحد عملکرد مالیاتی - درخواست های پرسنل <strong>#85117#</strong> (برای انجام): تنظیم اکسل حقوق دستمزد / بررسی اکسل حقوق قبل از فرستادن جهت اصلاح / تنظیم جدول جرایم معاملات فصلی همراه با گزارشات شایگان مرتبط / بستن حساب ها / محاسبه استهلاک / آموزش کلیه موارد مربوط به حداقل های رسیدگی.</>, author: 'الناز دریکی', icon: <BlueIcon /> },
        { id: 9, time: '15:09', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85054#</strong> (برای انجام): فعالسازی شناسه یکتا و ارسال فاکتور فروشگاه سعدی نرم افزار مالیپور</>, author: 'مهرنوش رییس قنواتی', icon: <PurpleIcon /> },
        { id: 10, time: '15:07', description: <>واحد عملکرد مالیاتی - درخواست خدمات <strong>#85048#</strong> (برای انجام): تمدید اشتراک مودیان جهان مژده موسویان</>, author: 'مهرنوش رییس قنواتی', icon: <PurpleIcon /> },
    ].sort((a,b) => b.time.localeCompare(a.time)),
};

export const TimelinePage = () => {
    const dates = Object.keys(timelineData);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md animate-fade-in-fast">
            <div>
                {dates.map((date) => (
                    <div key={date} className="mb-8">
                        <div className="flex justify-center items-center my-4">
                             <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-1 rounded-full">{date}</span>
                        </div>
                        <div className="relative pr-8">
                             <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                             <div className="space-y-8">
                                {timelineData[date].map((event) => (
                                    <div key={event.id} className="relative">
                                        <div className="absolute top-0 -right-[25px] z-10">{event.icon}</div>
                                        <div className="pr-4">
                                            <div className="flex items-baseline gap-3 mb-1">
                                                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{event.time}</span>
                                                <p className="text-sm text-gray-800 leading-relaxed">{event.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-600">{event.author}</span>
                                                {event.authorRole && (
                                                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{event.authorRole}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};