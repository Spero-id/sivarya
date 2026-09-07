import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import GoogleButton from './ui/GoogleButton';

const PLACEHOLDER_NAME = 'Nama lengkap';
const PLACEHOLDER_EMAIL = 'Alamat email';
const PLACEHOLDER_PASSWORD = 'Kata sandi';

const SIGN_UP_ERROR_MESSAGES = {
  PASSWORD_TOO_SHORT: 'Kata sandi terlalu pendek. Minimal 6 karakter.',
  PASSWORD_TOO_LONG: 'Kata sandi terlalu panjang.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Email sudah terdaftar. Gunakan email lain.',
  INVALID_EMAIL: 'Format email tidak valid.',
  EMAIL_NOT_VERIFIED: 'Email belum diverifikasi. Periksa kotak masuk Anda.',
  MISSING_FIELDS: 'Lengkapi semua kolom yang wajib diisi.',
};

function translateSignUpError(error) {
  return error?.code && SIGN_UP_ERROR_MESSAGES[error.code]
    ? SIGN_UP_ERROR_MESSAGES[error.code]
    : error?.message || 'Registrasi gagal. Silakan coba lagi.';
}

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const username = email.trim().split('@')[0] || 'admin';
    const { error: signUpError } = await authClient.signUp.email({
      name,
      username,
      email,
      password,
    });
    setIsLoading(false);
    if (signUpError) {
      setError(translateSignUpError(signUpError));
      return;
    }
    window.location.href = '/admin/forbidden';
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
            Buat Akun
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Daftarkan akun admin baru untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nama</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={PLACEHOLDER_NAME}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
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
                minLength={6}
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

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-6 bg-primary-600 text-white bg-[#1A2E4C] hover:bg-[#C26527] transition-colors rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} disabled=${isLoading}`}
              disabled={isLoading}
            >
              {isLoading ? 'Daftar...' : 'Daftar'}
            </button>
          </form>

          <GoogleButton label="Daftar dengan Google" register />

          <p className="mt-6 text-center text-slate-500 text-sm">
            Sudah punya akun? <a href="/admin/login" className="ml-1 text-primary-600 hover:text-primary-700 transition-colors font-medium">Masuk</a>
          </p>
        </div>
      </div>
    </div>
  );
}
