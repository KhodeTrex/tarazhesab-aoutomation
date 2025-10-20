import React from 'react';

// Mock data based on the screenshot
const mockEvents: { [key: string]: { id: number; text: string }[] } = {
    '29': [
        { id: 1, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82404: اظهارنامه ارث سید احمد هاشمی' },
    ],
    '30': [
        { id: 2, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82425: هزینه ارسال لیست بیمه و حقو...' },
        { id: 3, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82182: پرینت قبض کریم اسماعیلی' },
        { id: 4, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82418: پرینت ابلاغیه کریم عساکره' },
        { id: 5, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82419: تکمیل ثبت نام کد اقتصادی مح...' },
        { id: 6, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82151: دستمزد ارسال اظهارنامه شرکت...' },
    ],
    '31': [
        { id: 7, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82358: هزینه ارسال اظهارنامه عملکرد...' },
        { id: 8, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82182: پرینت قبض کریم اسماعیلی' },
        { id: 9, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82184: پرینت ابلاغیه کریم عساکره' },
    ],
    '2': [
      { id: 10, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82394: هزینه ارسال اظهارنامه عملکرد...' }
    ],
    '6': [
      { id: 11, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82437: پرینت قبض اظهارنامه عدنان م...' },
      { id: 12, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82436: هزینه بابت ارسال اظهارنامه 1403 شرکت ار...' },
      { id: 13, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82418: اظهارنامه عملکرد مدیا...' }
    ],
    '8': [
        { id: 14, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82402: هزینه ارسال فاکتور در سامان...' },
        { id: 15, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82192: هزینه سامانه مودیان شرکت ار...' },
    ],
    '9': [
        { id: 16, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82437: پرینت قبض اظهارنامه عدنان م...' },
        { id: 17, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82436: هزینه بابت ارسال اظهارنامه 1403 شر...' },
        { id: 18, text: 'واحد عملکرد مالیاتی - درخواست خدمات #83058: ارسال اظهارنامه عملکرد مهر...' },
        { id: 19, text: 'واحد عملکرد مالیاتی - درخواست خدمات #83055: هزینه ارسال اظهارنامه عملکر...' }
    ],
    '13': [
        { id: 20, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82472: اظهارنامه ارث غلامرضا قنبری' }
    ],
    '14': [
        { id: 21, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82479: اظهارنامه ارث سجاد فاضلی' }
    ],
    '15': [
        { id: 22, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82450: اظهارنامه ارث سجاد فاضلی' }
    ],
    '16': [
        { id: 23, text: 'واحد عملکرد مالیاتی - درخواست خدمات #82427: اظهارنامه ارث فرزاد مموئی' }
    ]
};

// FIX: Define a separate interface for CalendarDay props to avoid type conflicts with React's `key` prop.
interface CalendarDayProps {
    day: string;
    events: { id: number; text: string }[];
    isToday?: boolean;
    isOutOfMonth?: boolean;
}

// FIX: Explicitly type CalendarDay as a React.FC to correctly handle the 'key' prop and resolve the TypeScript error.
const CalendarDay: React.FC<CalendarDayProps> = ({ day, events, isToday, isOutOfMonth }) => {
    return (
        <div className="border-l border-t p-2 overflow-y-auto relative h-full flex flex-col min-h-[140px]">
            <span className={`text-sm font-semibold mb-2 self-end ${isOutOfMonth ? 'text-gray-300' : 'text-gray-600'} ${isToday ? 'bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center p-1' : ''}`}>
                {day}
            </span>
             <div className="flex-grow space-y-1">
                {events.map(event => (
                    <div key={event.id} className="text-[10px] p-1 rounded-sm bg-gray-100 text-gray-800 leading-tight">
                        <p>{event.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const CalendarPage = () => {
    const daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    
    // Static calendar data to match the screenshot layout for 4 weeks
    const calendarDays = [
        { day: '29', isOutOfMonth: true }, { day: '30', isOutOfMonth: true }, { day: '31', isOutOfMonth: true },
        { day: '1' }, { day: '2' }, { day: '3', isToday: true }, { day: '4' },
        { day: '5' }, { day: '6' }, { day: '7' }, { day: '8' }, { day: '9' }, { day: '10' }, { day: '11' },
        { day: '12' }, { day: '13' }, { day: '14' }, { day: '15' }, { day: '16' }, { day: '17' }, { day: '18' },
        { day: '19' }, { day: '20' }, { day: '21' }, { day: '22' }, { day: '23' }, { day: '24' }, { day: '25' },
    ];

    const ChevronLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>);
    const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>);
    const PrinterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm7-8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" /></svg>;
    const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3l-4-4-4 4z" /></svg>;
    const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
    const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

    return (
        <div className="bg-white rounded-lg shadow-md animate-fade-in-fast">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-700">شهریور | آبان</span>
                </div>
                <div className="flex items-center gap-2">
                    <select className="border rounded-md py-1 px-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>مهر</option>
                    </select>
                    <select className="border rounded-md py-1 px-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>1404</option>
                    </select>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><ChevronRightIcon /></button>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><ChevronLeftIcon /></button>
                     <div className="h-6 w-px bg-gray-300 mx-2"></div>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><SaveIcon /></button>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><PrinterIcon /></button>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><XIcon /></button>
                    <button className="p-2 border rounded-md hover:bg-gray-100"><CheckIcon /></button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-t">
                {/* Days of week */}
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center font-semibold p-3 bg-gray-50 border-b border-l text-gray-600 text-sm">
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                    <CalendarDay 
                        key={index} 
                        day={day.day} 
                        events={mockEvents[day.day] || []} 
                        isToday={day.isToday} 
                        isOutOfMonth={day.isOutOfMonth}
                    />
                ))}
            </div>
        </div>
    );
};