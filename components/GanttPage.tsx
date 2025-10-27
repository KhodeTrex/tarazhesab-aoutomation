import React from 'react';
import { Issue } from '../types';

interface GanttPageProps {
    issues: Issue[];
}

// Helper function to parse 'YYYY/MM/DD' into a Date object
// NOTE: This is a simple parser and assumes Persian date parts can be used with JS Date.
// For accurate Jalali calendar calculations, a dedicated library would be needed.
const parseDate = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const parts = dateString.split(' ')[0].split(/[-/]/);
    if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        // JS Date will interpret this as Gregorian, which is fine for a visual demo
        // if we are consistent.
        return new Date(year, month - 1, day);
    }
    return null;
};

// Helper to get difference in days
const diffDays = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const GanttPage: React.FC<GanttPageProps> = ({ issues }) => {
    const issuesWithDates = issues
        .map(issue => ({
            ...issue,
            startDateObj: parseDate(issue.startDate),
            dueDateObj: parseDate(issue.dueDate),
        }))
        .filter(issue => issue.startDateObj && issue.dueDateObj)
        .sort((a, b) => a.startDateObj!.getTime() - b.startDateObj!.getTime());

    if (issuesWithDates.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                هیچ مسئله‌ای با تاریخ شروع و پایان مشخص برای نمایش در گانت یافت نشد.
            </div>
        );
    }

    const projectStartDate = new Date(Math.min(...issuesWithDates.map(i => i.startDateObj!.getTime())));
    const projectEndDate = new Date(Math.max(...issuesWithDates.map(i => i.dueDateObj!.getTime())));
    
    // Add some buffer days to the timeline
    projectStartDate.setDate(projectStartDate.getDate() - 2);
    projectEndDate.setDate(projectEndDate.getDate() + 2);

    const projectDuration = diffDays(projectStartDate, projectEndDate) + 1;
    const timelineDates: Date[] = [];
    for (let i = 0; i < projectDuration; i++) {
        const date = new Date(projectStartDate);
        date.setDate(date.getDate() + i);
        timelineDates.push(date);
    }
    
    const today = new Date();
    // Normalize today to the start of the day for accurate comparison
    today.setHours(0, 0, 0, 0);
    const todayIndex = diffDays(projectStartDate, today);
    const showTodayMarker = today >= projectStartDate && today <= projectEndDate;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'انجام شده': return 'bg-green-500';
            case 'در حال بررسی': return 'bg-blue-500';
            case 'برای انجام': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };


    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md animate-fade-in-fast overflow-x-auto">
            <div className="relative" style={{ minWidth: `${projectDuration * 40}px` }}>
                {/* Header */}
                <div className="grid" style={{ gridTemplateColumns: `300px repeat(${projectDuration}, 40px)` }}>
                    <div className="sticky right-0 bg-white border-b border-l border-gray-200 p-2 font-semibold text-gray-700 z-10">موضوع</div>
                    {timelineDates.map((date, index) => (
                        <div key={index} className="text-center border-b border-l border-gray-200 p-2">
                             <div className={`text-xs ${date.getDay() === 5 ? 'text-red-500' : 'text-gray-500'}`}> {/* Friday in red */}
                                {date.toLocaleDateString('fa-IR', { weekday: 'short' })}
                            </div>
                            <div className="font-semibold text-sm text-gray-700">
                                {date.toLocaleDateString('fa-IR', { day: 'numeric' })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Body Grid */}
                <div className="relative">
                    {/* Grid lines */}
                    <div className="absolute top-0 right-0 w-full h-full grid" style={{ gridTemplateColumns: `300px repeat(${projectDuration}, 40px)` }}>
                        <div className="border-l border-gray-200 sticky right-0 bg-white"></div>
                        {Array.from({ length: projectDuration }).map((_, i) => (
                             <div key={i} className={`h-full border-l ${timelineDates[i].getDay() === 5 ? 'bg-red-50' : 'bg-white'}`}></div>
                        ))}
                    </div>
                     {/* Today Marker */}
                    {showTodayMarker && (
                        <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                            style={{ right: `${300 + todayIndex * 40 + 20}px` }}
                        >
                            <div className="absolute -top-5 -right-1.5 text-xs text-red-500">امروز</div>
                        </div>
                    )}

                    {/* Task Rows */}
                    <div className="relative z-10">
                        {issuesWithDates.map((issue, issueIndex) => {
                            const offset = diffDays(projectStartDate, issue.startDateObj!);
                            const duration = diffDays(issue.startDateObj!, issue.dueDateObj!) + 1;

                            return (
                                <div key={issue.id} className="grid items-center h-12" style={{ gridTemplateColumns: `300px 1fr` }}>
                                    {/* Task Name */}
                                    <div className="sticky right-0 bg-white border-t border-l border-gray-200 p-2 text-sm font-medium text-gray-800 truncate">
                                        {issue.subject}
                                    </div>
                                    {/* Task Bar */}
                                    <div className="relative h-full border-t border-gray-200">
                                        <div 
                                            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md flex items-center px-2 text-white text-xs whitespace-nowrap overflow-hidden group"
                                            style={{
                                                right: `${offset * 40}px`,
                                                width: `${duration * 40}px`,
                                            }}
                                        >
                                            <div className={`w-full h-full rounded-md ${getStatusColor(issue.status)} opacity-80`}></div>
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2">{issue.subject}</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                                                <div><strong>{issue.subject}</strong></div>
                                                <div>وضعیت: {issue.status}</div>
                                                <div>مسئول: {issue.assignee || '---'}</div>
                                                <div>تاریخ: {issue.startDate} - {issue.dueDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
