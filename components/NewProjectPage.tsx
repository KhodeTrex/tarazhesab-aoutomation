import React, { useState } from 'react';
import { Project, User } from '../types';

interface NewProjectPageProps {
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  projects: Project[];
  users: User[];
}

type ProjectFormData = Omit<Project, 'id' | 'createdAt'>;

export const NewProjectPage: React.FC<NewProjectPageProps> = ({ onCreateProject, onCancel, projects, users }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    identifier: '',
    homepage: '',
    isPublic: true,
    parentProjectId: null,
    inheritMembers: false,
    shortNamePerformance: '',
    shortNameVat: '',
    responsibleUserId: undefined,
    workingHours: [],
    invoiceCapacity: '',
    tradeSystemRegStatus: '',
    system20RegStatus: '',
    serviceStatus: '',
    contactNumber: '',
    useTools: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [id]: checked }));
    } else {
        let finalValue: string | number | null = value;
        if (id === 'parentProjectId' || id === 'responsibleUserId') {
            finalValue = value ? parseInt(value, 10) : null;
        }
        setFormData(prev => ({ ...prev, [id]: finalValue }));
    }
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, identifier: value }));
  };
  
  const handleWorkingHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
        const currentHours = prev.workingHours || [];
        if (checked) {
            return { ...prev, workingHours: [...currentHours, value] };
        } else {
            return { ...prev, workingHours: currentHours.filter(hour => hour !== value) };
        }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.identifier) {
      alert('لطفاً نام پروژه و شناسه را وارد کنید.');
      return;
    }
    onCreateProject(formData);
    onCancel(); 
  };
  
  const EditorToolbar = () => (
    <div className="flex items-center justify-between border-b bg-gray-50 rounded-t-md p-1 text-xs text-gray-400">
        <div>
            <button type="button" className="px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm">ویرایش</button>
            <button type="button" className="px-2 py-1 text-sm text-gray-500">پیش‌نمایش</button>
        </div>
        <span>ابزارهای ویرایشگر متن (B, I, U, ...)</span>
    </div>
  );
  
  const LabeledInput: React.FC<{label: string, id: string, children: React.ReactNode, description?: string, required?: boolean}> = ({label, id, children, description, required}) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 text-right">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {description && <p className="text-xs text-gray-500 mt-1 text-right">{description}</p>}
    </div>
  );

  const workingHoursOptions = ['۱۵ دقیقه', '۱۲:۱۵ دقیقه', '۱۲:۳۰ دقیقه', '۱۲:۴۵ دقیقه'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in-fast">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">پروژه جدید</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <LabeledInput label="نام" id="name" required>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                </LabeledInput>
                <LabeledInput label="توضیح" id="description">
                     <div>
                        <EditorToolbar />
                        <textarea id="description" value={formData.description} onChange={handleInputChange} rows={10} className="block w-full border-x border-b border-gray-300 rounded-b-md sm:text-sm p-3"></textarea>
                    </div>
                </LabeledInput>
            </div>
            
            <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {/* Right Column */}
                    <div className="space-y-6">
                         <LabeledInput label="شناسه" id="identifier" required description="باید میان ۱ تا ۱۰۰ نویسه باشد. تنها حروف کوچک انگلیسی (a-z)، اعداد و خط تیره (-) مجاز است. شناسه پس از ساخت پروژه قابل تغییر نیست.">
                            <input type="text" id="identifier" value={formData.identifier} onChange={handleIdentifierChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm font-mono"/>
                        </LabeledInput>
                        <LabeledInput label="صفحه خانه" id="homepage">
                            <input type="text" id="homepage" value={formData.homepage} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                        </LabeledInput>
                        <div className="flex items-start">
                             <div className="flex items-center h-5">
                                <input id="isPublic" type="checkbox" checked={formData.isPublic} onChange={handleInputChange} className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                            </div>
                            <div className="mr-3 text-sm">
                                <label htmlFor="isPublic" className="font-medium text-gray-700">عمومی</label>
                                <p className="text-xs text-gray-500">پروژه‌های عمومی و محتوای آنان برای همه کاربران وارد شده قابل دسترس خواهد بود.</p>
                            </div>
                        </div>
                         <LabeledInput label="پروژه پدر" id="parentProjectId">
                             <select id="parentProjectId" value={formData.parentProjectId || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm">
                                 <option value="">---</option>
                                 {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                             </select>
                        </LabeledInput>
                        <div className="flex items-center">
                            <input id="inheritMembers" type="checkbox" checked={formData.inheritMembers} onChange={handleInputChange} className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                            <label htmlFor="inheritMembers" className="mr-2 text-sm text-gray-700">ارث بری اعضا</label>
                        </div>
                    </div>

                    {/* Left Column */}
                    <div className="space-y-6">
                        <LabeledInput label="نام خلاصه (عملکرد)" id="shortNamePerformance">
                            <input type="text" id="shortNamePerformance" value={formData.shortNamePerformance} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                        </LabeledInput>
                        <LabeledInput label="نام خلاصه (ارزش افزوده)" id="shortNameVat">
                            <input type="text" id="shortNameVat" value={formData.shortNameVat} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                        </LabeledInput>
                        <LabeledInput label="مسئول شرکت" id="responsibleUserId">
                             <select id="responsibleUserId" value={formData.responsibleUserId || ''} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm">
                                 <option value="">---</option>
                                 {users.map(u => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
                             </select>
                        </LabeledInput>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2 text-right">ساعت کار</label>
                             <div className="space-y-2">
                                {workingHoursOptions.map(hour => (
                                    <div key={hour} className="flex items-center">
                                        <input id={`hour-${hour}`} type="checkbox" value={hour} onChange={handleWorkingHoursChange} className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                                        <label htmlFor={`hour-${hour}`} className="mr-2 text-sm text-gray-700">{hour}</label>
                                    </div>
                                ))}
                             </div>
                        </div>
                        <LabeledInput label="ظرفیت صدور فاکتور" id="invoiceCapacity"><select id="invoiceCapacity" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"><option>---</option></select></LabeledInput>
                        <LabeledInput label="ثبت نام سامانه جامع تجارت" id="tradeSystemRegStatus"><select id="tradeSystemRegStatus" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"><option>---</option></select></LabeledInput>
                        <LabeledInput label="ثبت نام سامانه ۲۰" id="system20RegStatus"><select id="system20RegStatus" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"><option>---</option></select></LabeledInput>
                        <LabeledInput label="وضعیت ارایه خدمات" id="serviceStatus"><select id="serviceStatus" className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"><option>---</option></select></LabeledInput>
                        <LabeledInput label="شماره تماس" id="contactNumber"><input type="text" id="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm"/></LabeledInput>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center">
                    <input id="useTools" type="checkbox" checked={formData.useTools} onChange={handleInputChange} className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                    <label htmlFor="useTools" className="mr-2 text-sm font-medium text-gray-700">ابزارها</label>
                </div>
            </div>
            
            <div className="flex justify-start gap-4 pt-4">
                <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                    ساخت
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">
                    انصراف
                </button>
            </div>
        </form>
    </div>
  );
};
