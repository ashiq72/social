
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService.ts';
import { useAuth } from '../context/AuthContext.tsx';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated: authIsAuthenticated } = useAuth(); // Use auth context for login/isAuthenticated

  useEffect(() => {
    if (authIsAuthenticated) { // Check isAuthenticated from context
      navigate('/');
    }
  }, [navigate, authIsAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await apiService.login({ phone, password });
        if (response.data?.accessToken) {
          authLogin(response.data.accessToken); // Use auth context login
          navigate('/');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        const response = await apiService.register({ name, phone, password });
        if (response.success) {
          setIsLogin(true);
          setError('Account created! Please sign in.');
        } else {
          setError(response.message || 'Registration failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#fbfcfd]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/50 rounded-full blur-[120px] animate-pulse transition-all duration-[5000ms]"></div>
      
      <div className="relative z-10 w-full max-w-[440px] px-6">
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-black/20 mb-4">
              <i className="fas fa-bolt text-2xl"></i>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">VibeStream</h1>
            <p className="text-slate-400 font-semibold text-xs mt-1 uppercase tracking-widest">Connect with your vibe</p>
          </div>

          <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${!isLogin ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}
            ></div>
            <button 
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors ${isLogin ? 'text-slate-900' : 'text-slate-400'}`}
            >
              Sign In
            </button>
            <button 
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors ${!isLogin ? 'text-slate-900' : 'text-slate-400'}`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold uppercase tracking-tight text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-white border border-slate-100 focus:border-black focus:ring-4 focus:ring-slate-50 rounded-2xl py-3.5 px-5 text-sm transition-all outline-none font-bold text-black placeholder-slate-300"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full bg-white border border-slate-100 focus:border-black focus:ring-4 focus:ring-slate-50 rounded-2xl py-3.5 px-5 text-sm transition-all outline-none font-bold text-black placeholder-slate-300"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-100 focus:border-black focus:ring-4 focus:ring-slate-50 rounded-2xl py-3.5 px-5 text-sm transition-all outline-none font-bold text-black placeholder-slate-300"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl transition-all text-[15px] shadow-xl shadow-black/10 active:scale-[0.98] flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
        </div>
        <p className="text-center mt-8 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Powered by VibeStream Engine v2.5
        </p>
      </div>
    </div>
  );
};

export default Login;