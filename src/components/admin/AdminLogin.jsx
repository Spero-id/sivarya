import { useState } from 'react';

const PLACEHOLDER_EMAIL = 'Alamat email';
const PLACEHOLDER_PASSWORD = 'Kata sandi';

export default function AdminLogin({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-lg">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
        <input
          type={showPassword ? 'text' : 'email'}
          className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={PLACEHOLDER_EMAIL}
          required
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-slate-700 mb-2">Kata sandi</label>
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-3 border border-slate-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={PLACEHOLDER_PASSWORD}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm cursor-pointer"
        >
          {showPassword ? 'Sembunyikan' : 'Tampilkan'}
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
      >
        Masuk
      </button>
    </form>
  );
}