import { useState } from 'react';
import { Scale, Phone, User, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Login() {
  const { lang, t, login } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !/^[+]?[0-9-\s]{10,13}$/.test(cleanPhone)) {
      setError(true);
      return;
    }
    login(cleanName, cleanPhone);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-nyaya-700 via-nyaya-500 to-nyaya-400 flex flex-col justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full" />
      <div className="absolute top-1/3 -left-12 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-10 -right-4 w-40 h-40 bg-white/10 rounded-full" />

      <div className="relative max-w-md mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lift">
            <Scale size={40} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white mt-5">Nyaya AI</h1>
          <p className="text-white/85 text-sm mt-1.5">
            {lang === 'en' ? 'Your Rights, Your Voice' : 'आपके अधिकार, आपकी आवाज़'}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-9 bg-white dark:bg-[#1D1934] rounded-3xl p-6 shadow-lift space-y-4"
        >
          <div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-lg text-center">
              {lang === 'en' ? 'Welcome' : 'स्वागत है'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-1">
              {t('login_sub')}
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-[#F4F2FC] dark:bg-white/10 rounded-2xl px-4 py-3 border border-nyaya-100 dark:border-white/10 focus-within:border-nyaya-400 transition-colors">
            <User size={17} className="text-nyaya-500 shrink-0" />
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              placeholder={t('login_name_ph')}
              className="flex-1 min-w-0 text-sm bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 bg-[#F4F2FC] dark:bg-white/10 rounded-2xl px-4 py-3 border border-nyaya-100 dark:border-white/10 focus-within:border-nyaya-400 transition-colors">
            <Phone size={17} className="text-nyaya-500 shrink-0" />
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError(false);
              }}
              type="tel"
              inputMode="tel"
              placeholder={t('login_phone_ph')}
              className="flex-1 min-w-0 text-sm bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>

          {error && <p className="text-sos-600 text-xs font-medium text-center">{t('login_invalid')}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-nyaya-600 to-nyaya-500 text-white font-semibold text-sm py-3.5 rounded-2xl shadow-lift flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            {t('login_btn')}
            <ArrowRight size={16} />
          </button>

          <p className="text-gray-400 dark:text-gray-500 text-[10.5px] text-center leading-relaxed">
            {t('login_note')}
          </p>
        </form>
      </div>
    </div>
  );
}
