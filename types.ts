export enum View {
  HomePage = 'صفحه اصلی',
  MyPage = 'صفحه من',
  Projects = 'پروژه ها',
  Help = 'راهنما',
  Management = 'راه بری',

  // Management sub-views
  ManagementUsers = 'راه بری/کاربران',
  ManagementNewUser = 'راه بری/کاربر جدید',
  ManagementGroups = 'راه بری/گروه ها',
  ManagementNewGroup = 'راه بری/گروه جدید',
  
  // Projects sub-views
  ProjectsOverview = 'پروژه ها/پروژه',
  ProjectsTimeline = 'پروژه ها/خط زمان',
  ProjectsIssues = 'پروژه ها/مسئله ها',
  ProjectsNewIssue = 'پروژه ها/مسئله جدید',
  ProjectsTimes = 'پروژه ها/زمان ها',
  ProjectsGantt = 'پروژه ها/گانت',
  ProjectsCalendar = 'پروژه ها/تقویم',
  ProjectsBlog = 'پروژه ها/وبلاگ',
  ProjectsAssets = 'پروژه ها/اموال',
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