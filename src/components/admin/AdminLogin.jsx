import { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const GoogleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
    />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#1877F2"
      d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
    />
  </svg>
);

const AppleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#000000"
      d="M16.67 13.13c.03 3.36 2.95 4.48 2.98 4.49-.02.1-.47 1.6-1.54 3.17-.93 1.37-1.9 2.73-3.42 2.76-1.5.03-1.98-.89-3.69-.89s-2.25.86-3.67.92c-1.47.06-2.6-1.48-3.54-2.84-1.92-2.78-3.39-7.86-1.42-11.29A5.68 5.68 0 0 1 7.93 7.05c1.21 0 2.36.81 3.17.81.81 0 2.33-1 3.93-.85.67.03 2.55.27 3.76 2.04-.1.06-2.24 1.31-2.21 4.08ZM13.94 4.95c.77-.94 1.29-2.24 1.15-3.54-.9.04-2 .63-2.65 1.42-.68.82-1.27 2.13-1.11 3.39.98.08 1.98-.34 2.61-1.27Z"
    />
  </svg>
);

const ADMIN_CREDENTIALS = {
  email: 'admin@sivarya.id',
  password: 'sivarya2024',
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      const ok =
        email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password;

      if (!ok) {
        setSubmitting(false);
        setError('Email atau password salah.');
        return;
      }

      window.location.href = '/admin';
    }, 600);
  };

  const inputBase =
    'w-full rounded-xl bg-slate-100/80 px-4 py-3.5 pl-11 text-sm text-slate-800 placeholder-slate-400 shadow-inner transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300/70';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 flex items-center justify-center px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background:
            'repeating-radial-gradient(circle at 50% 50%, transparent 0 34px, rgba(125,180,255,0.28) 34px 35px)',
        }}
      />

      <Cloud className="absolute -bottom-2 left-0 w-[340px] opacity-70 text-white" />
      <Cloud className="absolute -bottom-4 right-0 w-[300px] opacity-60 text-white" />
      <CloudSmall className="absolute bottom-10 left-[12%] w-[180px] opacity-50 text-white" />
      <CloudSmall className="absolute bottom-16 right-[10%] w-[160px] opacity-50 text-white" />

      <div className="relative w-full max-w-md">
        <div className="rounded-[28px] border border-white/60 bg-white/70 p-10 shadow-[0_20px_60px_rgba(30,100,180,0.18)] backdrop-blur-xl sm:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(30,100,180,0.18)]">
              <LogIn className="h-7 w-7 text-[#1A2E4C]" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              Sign in with email
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Welcome back! Please enter your details
              <br />
              to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={inputBase}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`${inputBase} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-slate-400 transition hover:text-slate-600"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="mt-4 text-xs text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1A2E4C] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(26,46,76,0.28)] transition hover:bg-[#0d1e33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Get Started'
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <span className="flex-1 border-t border-dashed border-slate-300" />
            <span className="text-xs text-slate-400">Or sign in with</span>
            <span className="flex-1 border-t border-dashed border-slate-300" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Masuk dengan Google"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,60,100,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,60,100,0.18)]"
            >
              <GoogleIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Masuk dengan Facebook"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,60,100,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,60,100,0.18)]"
            >
              <FacebookIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Masuk dengan Apple"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,60,100,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(30,60,100,0.18)]"
            >
              <AppleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Cloud({ className }) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" fill="currentColor">
      <path d="M40 110c-22 0-40-16-40-38 0-20 15-36 35-38 8-18 27-30 48-28 18 2 33 14 39 31 17 1 30 14 30 31 0 13-8 25-20 30v12H40Z" />
    </svg>
  );
}

function CloudSmall({ className }) {
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden="true" fill="currentColor">
      <path d="M28 82c-15 0-28-12-28-27 0-14 10-25 24-27 6-13 19-21 33-20 13 1 23 10 27 22 12 1 21 10 21 22 0 9-6 17-14 21v9H28Z" />
    </svg>
  );
}
