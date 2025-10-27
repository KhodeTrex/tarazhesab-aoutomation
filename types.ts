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
  ManagementGroupDetails = 'راه بری/گروه ها/جزئیات',
  ManagementRoles = 'راه بری/نقش ها و دسترسی ها',
  ManagementNewRole = 'راه بری/نقش جدید',
  ManagementEditRole = 'راه بری/ویرایش نقش',
  ManagementSettings = 'راه بری/تنظیمات',
  
  // Projects sub-views
  ProjectsNew = 'پروژه ها/پروژه جدید',
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

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
  phone?: string;
  position?: string;
}

export interface Group {
  id: number;
  name: string;
  userIds: number[];
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  identifier: string;
  isPublic: boolean;
  createdAt: string;
}