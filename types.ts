export enum View {
  HomePage = 'صفحه اصلی',
  MyPage = 'صفحه من',
  Projects = 'پروژه ها',
  Help = 'راهنما',
  Management = 'راه بری',
}

export enum ProjectModule {
  Overview = 'پروژه',
  Timeline = 'خط زمان',
  Issues = 'مسئله ها',
  Times = 'زمان ها',
  Gantt = 'گانت',
  Calendar = 'تقویم',
  Blog = 'وبلاگ',
  Assets = 'اموال',
}

export interface Issue {
  id: number;
  project: string;
  issueType: string;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  assignee?: string;
  startDate?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any; 
}