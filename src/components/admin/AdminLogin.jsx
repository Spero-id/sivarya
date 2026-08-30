import { useState } from 'react';

const PLACEHOLDER_EMAIL = 'Alamat email';
const PLACEHOLDER_PASSWORD = 'Kata sandi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/admin/dashboard';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="text-center">
          <a href="/" className="flex items-center gap-2 justify-center mb-4">
            <img src="/sivarya_logo.png" alt="Sivarya" className="h-12 w-auto" />
          </a>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A2E4C] mb-4">
            Welcome Back!
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Masuk ke akun admin Anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type={showPassword ? 'text' : 'email'}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={PLACEHOLDER_EMAIL}
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">Kata sandi</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={PLACEHOLDER_PASSWORD}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-1 -translate-y-1/2 text-slate-500 text-sm cursor-pointer"
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-300 focus:ring-primary-500 w-4 h-4" disabled={isLoading} />
                Remember me
              </label>
              <a
                href="#"
                className={isLoading ? 'opacity-50 cursor-not-allowed' : 'text-primary-600 hover:text-primary-700 transition-colors'}
              >
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 bg-primary-600 text-white bg-[#1A2E4C] hover:bg-[#C26527] transition-colors rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} disabled=${isLoading}`}
              disabled={isLoading}
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            Belum punya akun? <a href="#" className="ml-1 text-primary-600 hover:text-primary-700 transition-colors font-medium">Daftar</a>
          </p>
        </div>
      </div>
    </div>
  );
}