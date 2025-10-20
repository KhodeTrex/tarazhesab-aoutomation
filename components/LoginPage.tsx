import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string, pass: string) => void;
}

const OwlIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a6 6 0 00-3.33 1.05c-.03.02-.06.04-.09.06C6.2 13.3 6 13.63 6 14v1.33c0 .24.1.47.28.64l.27.27a.5.5 0 00.71 0l.71-.71a.5.5 0 000-.71L7.6 14.4a4 4 0 012.4-1.4 4 4 0 012.4 1.4l-.37.37a.5.5 0 000 .71l.71.71a.5.5 0 00.71 0l.27-.27a.92.92 0 00.28-.64V14c0-.37-.2-.7-.58-.9-.03-.02-.06-.04-.09-.06A6 6 0 0010 12zm0-10C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.24 12.24a.5.5 0 00-.71 0l-1.06 1.06a.5.5 0 01-.71 0L10.7 14.53a.5.5 0 00-.71 0l-1.06 1.06a.5.5 0 01-.71 0l-1.06-1.06a.5.5 0 00-.71.71l1.06 1.06a.5.5 0 00.71 0l1.06-1.06a.5.5 0 01.71 0l1.06 1.06a.5.5 0 00.71 0l1.06-1.06a.5.5 0 000-.71zM13 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);


export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('albosabih');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 right-4">
                <button className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100">
                    ثبت‌نام
                </button>
            </div>
            <div className="w-full max-w-4xl bg-gradient-to-br from-sky-600 to-sky-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                {/* Info Panel */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white text-center">
                    <div className="p-4 bg-white/20 rounded-full mb-4">
                         <OwlIcon />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">تراز حساب</h1>
                    <p className="text-lg text-sky-200 mb-6">tarazhesab.ir</p>
                    <p className="text-sm leading-relaxed max-w-sm">
                        تراز حساب نرم‌افزاری قدرتمند برای مدیریت تیم و پروژه است. در دنیای پر رقابت امروز، برای کسب و کارتان برنامه بریزید و با کمک تراز حساب بر اجرای دقیق آن نظارت کنید.
                    </p>
                    <p className="text-xs text-sky-300 mt-12">
                        powered by IT TarazHesab
                    </p>
                </div>

                {/* Login Form Panel */}
                <div className="w-full md:w-1/2 p-10 bg-gray-100 flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                نام کاربری
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="mb-4">
                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                گذرواژه
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-6 text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500" />
                                <span className="mr-2 text-gray-600">واردشده بمانید</span>
                            </label>
                            <a href="#" className="font-semibold text-sky-600 hover:text-sky-800">
                                بازیابی گذرواژه
                            </a>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                            >
                                ورود
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};