import React, { useState } from 'react';
import axios from 'axios';

interface AuthPageProps {
  onLogin: (token: string, user: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    try {
      const res = await axios.post(`http://localhost:3001${endpoint}`, { email, password });
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        onLogin(res.data.token, res.data.user);
      } else {
        alert('Registered successfully! Now please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-midnight-900 text-white">
      <div className="w-96 rounded-lg border border-midnight-700 bg-midnight-800 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded bg-blue-600 text-2xl font-bold">A</div>
          <h1 className="text-2xl font-bold">Aether</h1>
          <p className="text-midnight-400">{isLogin ? 'Welcome back' : 'Create your account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-midnight-400 uppercase">Email</label>
            <input
              type="email"
              required
              className="w-full rounded border border-midnight-700 bg-midnight-900 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-midnight-400 uppercase">Password</label>
            <input
              type="password"
              required
              className="w-full rounded border border-midnight-700 bg-midnight-900 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full rounded bg-blue-600 py-2 text-sm font-bold hover:bg-blue-500 transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
