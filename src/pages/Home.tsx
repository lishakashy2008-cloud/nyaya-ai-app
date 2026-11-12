import { useState } from 'react';
import { Search, Gavel, ShieldCheck, Lock, ArrowRight, Sparkles, Phone, Flame, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { lists } from '@/lib/i18n';

const CARDS = [
  {
    id: 'fir',
    icon: Gavel,
    titleKey: { en: 'File an FIR', hi: 'FIR दर्ज कराएँ' },
    subtitleKey: { en: 'Police complaint, step by step', hi: 'पुलिस शिकायत का तरीका' },
    gradient: 'from-nyaya-500 to-nyaya-700',
  },
  {
    id: 'aid',
    icon: ShieldCheck,
    titleKey: { en: 'Free Legal Aid', hi: 'मुफ़्त कानूनी सहायता' },
    subtitleKey: { en: 'Free lawyer and advice', hi: 'मुफ़्त वकील और सलाह' },
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    id: 'privacy',
    icon: Lock,
    titleKey: { en: 'Privacy & Safety', hi: 'प्राइवेसी और सुरक्षा' },
    subtitleKey: { en: 'Your photos and data, protected', hi: 'आपकी फ़ोटो और डेटा की हिफ़ाज़त' },
    gradient: 'from-rose-500 to-rose-700',
  },
] as const;

export default function Home() {
  const { lang, t, openDetail, askAI, navigate, bookmarks, profile } = useApp();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    askAI(query.trim());
  };

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-nyaya-600 via-nyaya-500 to-nyaya-400 px-5 pt-6 pb-14 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute top-20 -left-8 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-4">
            <Sparkles size={14} />
            <span>{t('hero_badge')}</span>
          </div>
          <h2 className="font-display text-[26px] leading-tight font-bold text-white">
            {t('hero_greeting')}, <span className="text-nyaya-100">{profile?.name ?? 'Priya'}</span> 👋
          </h2>
          <p className="text-white/85 text-sm mt-2 leading-relaxed">{t('hero_sub')}</p>

          {/* Search */}
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lift">
              <Search size={18} className="text-nyaya-500 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_ph')}
                className="flex-1 min-w-0 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label={t('search_ph')}
                className="bg-nyaya-500 hover:bg-nyaya-600 active:scale-95 transition-all text-white p-2 rounded-xl"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 -mt-8 relative">
        {/* Quick chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
          {lists.quickChips[lang].map((chip) => (
            <button
              key={chip}
              onClick={() => askAI(chip)}
              className="shrink-0 bg-white dark:bg-white/10 border border-nyaya-200 dark:border-white/10 text-nyaya-700 dark:text-nyaya-200 text-xs font-semibold px-3.5 py-2 rounded-full shadow-soft active:scale-95 transition-transform"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Cards */}
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mt-6 mb-3">
          {t('how_help')}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {CARDS.map(({ id, icon: Icon, titleKey, subtitleKey, gradient }, i) => (
            <div
              key={id}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-up bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-100 dark:border-white/10 flex items-center gap-4"
            >
              <button
                onClick={() => openDetail(id)}
                className="flex items-center gap-4 flex-1 min-w-0 text-left active:scale-[0.98] transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-soft`}
                >
                  <Icon size={22} className="text-white" strokeWidth={2.1} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-[15px]">
                    {titleKey[lang]}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                    {subtitleKey[lang]}
                  </p>
                </div>
                <ArrowRight size={18} className="text-nyaya-400 shrink-0" />
              </button>
              <button
                onClick={() => openDetail(id)}
                aria-label={bookmarks.includes(id) ? t('saved') : t('save')}
                className="p-2 shrink-0"
              >
                <Star
                  size={18}
                  className={
                    bookmarks.includes(id)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }
                />
              </button>
            </div>
          ))}
        </div>

        {/* Bookmarks shortcut */}
        {bookmarks.length > 0 && (
          <button
            onClick={() => navigate('rights')}
            className="mt-3 w-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform text-left"
          >
            <Star size={17} className="text-amber-400 fill-amber-400 shrink-0" />
            <p className="text-amber-700 dark:text-amber-300 text-xs font-semibold">
              {bookmarks.length} {t('view_bookmarks')}
            </p>
            <ArrowRight size={15} className="text-amber-500 ml-auto shrink-0" />
          </button>
        )}

        {/* Helpline strip */}
        <button
          onClick={() => navigate('sos')}
          className="mt-5 w-full bg-gradient-to-r from-sos-500 to-sos-600 rounded-2xl p-4 flex items-center gap-3 shadow-sos active:scale-[0.98] transition-transform text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Flame size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm">{t('emergency_title')}</p>
            <p className="text-white/85 text-xs">{t('emergency_sub')}</p>
          </div>
          <Phone size={18} className="text-white shrink-0" />
        </button>
      </div>
    </div>
  );
}
