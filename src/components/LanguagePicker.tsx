import { useMemo, useState } from 'react';
import { Check, ChevronDown, Globe, Search, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LANGS, langMeta } from '@/lib/languages';

export default function LanguagePicker({ onClose }: { onClose: () => void }) {
  const { lang, setLang, t } = useApp();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGS;
    return LANGS.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q) ||
        l.code === q
    );
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-[#1D1934] rounded-t-[2rem] max-h-[85dvh] flex flex-col animate-fade-up shadow-lift">
        <div className="px-5 pt-4 pb-3 border-b border-nyaya-100 dark:border-white/10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-nyaya-100 dark:bg-white/10 flex items-center justify-center shrink-0">
              <Globe size={18} className="text-nyaya-600 dark:text-nyaya-300" />
            </div>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-[15px] flex-1">
              {t('choose_language')}
            </h2>
            <button
              onClick={onClose}
              aria-label={t('close')}
              className="p-2 rounded-xl bg-nyaya-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 active:scale-90 transition-transform"
            >
              <X size={15} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-[#F4F2FC] dark:bg-white/10 rounded-xl px-3 py-2 border border-nyaya-100 dark:border-white/10 focus-within:border-nyaya-400 transition-colors">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search / खोजें"
              className="flex-1 min-w-0 text-sm bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-3 py-2">
          {filtered.length === 0 && (
            <p className="text-center text-xs text-gray-400 py-8">No language found</p>
          )}
          {filtered.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left active:scale-[0.98] transition-all ${
                  active
                    ? 'bg-nyaya-100 dark:bg-nyaya-500/20'
                    : 'hover:bg-nyaya-50 dark:hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                    active
                      ? 'bg-nyaya-500 text-white shadow-soft'
                      : 'bg-nyaya-50 dark:bg-white/10 text-nyaya-600 dark:text-nyaya-300'
                  }`}
                >
                  {l.code === 'bodo' || l.code === 'dogri' || l.code === 'kok' || l.code === 'mai' || l.code === 'mni' || l.code === 'sat'
                    ? l.code.slice(0, 2).toUpperCase()
                    : l.code.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-[14px] ${active ? 'text-nyaya-700 dark:text-nyaya-200' : 'text-gray-900 dark:text-white'}`}>
                    {l.native}
                  </p>
                  <p className="text-gray-400 text-[11px] mt-0.5">{l.name} · {l.script}</p>
                </div>
                {active && <Check size={17} className="text-nyaya-600 dark:text-nyaya-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function LanguageChip({ onClick }: { onClick: () => void }) {
  const { lang } = useApp();
  return (
    <button
      onClick={onClick}
      aria-label="Switch language"
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-nyaya-100 dark:bg-white/10 text-nyaya-700 dark:text-nyaya-200 text-[11px] font-bold active:scale-90 transition-transform shrink-0"
    >
      <Globe size={13} />
      <span className="max-w-[52px] truncate">{langMeta(lang).native}</span>
      <ChevronDown size={11} className="opacity-60" />
    </button>
  );
}
