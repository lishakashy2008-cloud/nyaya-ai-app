import { ArrowLeft, Gavel, ShieldCheck, Lock, Scale, Star, MessageCircle } from 'lucide-react';
import { getTopic } from '@/data/rights';
import { useApp } from '@/context/AppContext';

const ICONS = {
  gavel: { comp: Gavel, color: 'text-nyaya-600 bg-nyaya-100 dark:bg-nyaya-500/20 dark:text-nyaya-300' },
  shield: { comp: ShieldCheck, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300' },
  lock: { comp: Lock, color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-300' },
} as const;

export default function RightDetail() {
  const { detailId, navigate, lang, t, bookmarks, toggleBookmark, askAI } = useApp();
  const topic = detailId ? getTopic(detailId) : undefined;

  if (!topic) {
    return (
      <div className="max-w-md mx-auto px-5 py-10 text-center">
        <p className="text-gray-500 text-sm">Not found.</p>
      </div>
    );
  }

  const c = topic[lang];
  const Icon = ICONS[topic.icon].comp;
  const iconColor = ICONS[topic.icon].color;
  const isBookmarked = bookmarks.includes(topic.id);

  return (
    <div className="max-w-md mx-auto pb-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-nyaya-600 via-nyaya-500 to-nyaya-400 px-5 pt-5 pb-12 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => navigate('rights')}
            aria-label={t('back')}
            className="p-2 rounded-xl bg-white/15 text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-white/85 text-xs font-semibold">{t('rights_title')}</span>
          <button
            onClick={() => toggleBookmark(topic.id)}
            aria-label={isBookmarked ? t('saved') : t('save')}
            className="ml-auto p-2 rounded-xl bg-white/15 active:scale-90 transition-transform"
          >
            <Star
              size={17}
              className={isBookmarked ? 'text-amber-300 fill-amber-300' : 'text-white'}
            />
          </button>
        </div>
        <div className="relative mt-6 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
            <Icon size={26} className="text-white" strokeWidth={2} />
          </div>
          <h2 className="font-display text-[22px] leading-tight font-bold text-white">{c.title}</h2>
        </div>
        <p className="relative text-white/85 text-[13px] mt-3 leading-relaxed">{c.summary}</p>
      </div>

      <div className="max-w-md mx-auto px-5 -mt-6 relative">
        {/* Steps */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-nyaya-100 dark:border-white/10 shadow-lift p-5">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px] mb-4">
            {t('steps_heading')}
          </h3>
          <div className="space-y-3.5">
            {c.steps.map((s, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-nyaya-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2.5 bg-nyaya-50 dark:bg-nyaya-500/10 rounded-xl p-3.5 mt-5">
            <Scale size={15} className="text-nyaya-600 dark:text-nyaya-300 shrink-0 mt-0.5" />
            <p className="text-[12px] text-nyaya-800 dark:text-nyaya-200 leading-relaxed">{c.law}</p>
          </div>
        </div>

        {/* Ask AI */}
        <button
          onClick={() => askAI(c.title)}
          className="mt-4 w-full bg-gradient-to-r from-nyaya-600 to-nyaya-500 rounded-2xl p-4 flex items-center gap-3.5 shadow-lift active:scale-[0.98] transition-transform text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-[14.5px]">{t('ask_ai')}</p>
            <p className="text-white/85 text-xs">{t('tab_chat')} • {t('online_sub')}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
