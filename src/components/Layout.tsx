import { useState } from 'react';
import { Scale, Home, MessageCircle, BookOpen, Siren, Sun, Moon, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LanguageChip } from '@/components/LanguagePicker';
import LanguagePicker from '@/components/LanguagePicker';
import type { Page } from '@/types';

export function TabBar() {
  const { page, navigate, t } = useApp();
  const tabs: { id: Page; label: string; icon: typeof Home }[] = [
    { id: 'home', label: t('tab_home'), icon: Home },
    { id: 'chat', label: t('tab_chat'), icon: MessageCircle },
    { id: 'rights', label: t('tab_rights'), icon: BookOpen },
    { id: 'sos', label: t('tab_sos'), icon: Siren },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40">
      <div className="mx-auto max-w-md bg-white/90 dark:bg-[#1D1934]/90 backdrop-blur-xl border-t border-nyaya-100 dark:border-white/10 shadow-[0_-4px_24px_-8px_rgba(74,59,143,0.15)]">
        <div className="grid grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = page === id || (page === 'detail' && id === 'rights');
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-all duration-200 active:scale-90"
              >
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-nyaya-500 shadow-lift' : 'bg-transparent'
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 1.9}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-nyaya-700 dark:text-nyaya-300' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function AppHeader() {
  const { dark, toggleDark, t, logout } = useApp();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#1D1934]/85 backdrop-blur-xl border-b border-nyaya-100 dark:border-white/10">
      <div className="max-w-md mx-auto flex items-center gap-2 px-5 py-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nyaya-400 to-nyaya-600 flex items-center justify-center shadow-soft shrink-0">
          <Scale size={18} className="text-white" strokeWidth={2.2} />
        </div>
        <div className="flex-1 leading-tight min-w-0">
          <h1 className="font-display font-bold text-[15px] text-gray-900 dark:text-white">Nyaya AI</h1>
          <p className="text-[10px] text-nyaya-600 dark:text-nyaya-300 font-medium truncate">{t('tagline')}</p>
        </div>
        <LanguageChip onClick={() => setPickerOpen(true)} />
        <button
          onClick={toggleDark}
          aria-label={dark ? 'Light mode' : 'Dark mode'}
          className="p-2 rounded-xl bg-nyaya-100 dark:bg-white/10 text-nyaya-700 dark:text-amber-300 active:scale-90 transition-transform"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button
          onClick={logout}
          aria-label={t('logout')}
          className="p-2 rounded-xl bg-nyaya-100 dark:bg-white/10 text-nyaya-700 dark:text-sos-500 active:scale-90 transition-transform"
        >
          <LogOut size={15} />
        </button>
      </div>
      {pickerOpen && <LanguagePicker onClose={() => setPickerOpen(false)} />}
    </header>
  );
}
