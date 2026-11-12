import { useState } from 'react';
import { Gavel, ShieldCheck, Lock, ChevronDown, Phone, FileText, Scale, Star } from 'lucide-react';
import { RIGHTS_TOPICS } from '@/data/rights';
import { useApp } from '@/context/AppContext';

const ICONS = {
  gavel: { comp: Gavel, color: 'text-nyaya-600 bg-nyaya-100 dark:bg-nyaya-500/20 dark:text-nyaya-300' },
  shield: { comp: ShieldCheck, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300' },
  lock: { comp: Lock, color: 'text-rose-600 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-300' },
} as const;

export default function Rights({ onlyBookmarked = false }: { onlyBookmarked?: boolean }) {
  const { lang, bookmarks, toggleBookmark, t } = useApp();
  const [open, setOpen] = useState<string | null>(null);

  const topics = onlyBookmarked
    ? RIGHTS_TOPICS.filter((r) => bookmarks.includes(r.id))
    : RIGHTS_TOPICS;

  return (
    <div className="max-w-md mx-auto px-5 py-6 pb-10">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            {t('rights_title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('rights_sub')}</p>
        </div>
      </div>

      {onlyBookmarked && (
        <div className="flex gap-2 mb-4">
          <span className="text-xs font-semibold text-nyaya-600 dark:text-nyaya-300 bg-nyaya-100 dark:bg-nyaya-500/20 px-3 py-1.5 rounded-full">
            {t('view_bookmarks')}
          </span>
        </div>
      )}

      {topics.length === 0 ? (
        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-nyaya-100 dark:border-white/10">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('no_bookmarks')}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t('no_bookmarks_sub')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((r, i) => {
            const c = r[lang];
            const isOpen = open === r.id;
            const isBookmarked = bookmarks.includes(r.id);
            const iconMeta = ICONS[r.icon];
            const Icon = iconMeta.comp;
            return (
              <div
                key={r.id}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`animate-fade-up bg-white dark:bg-white/5 rounded-2xl border shadow-soft overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-nyaya-300 dark:border-nyaya-500' : 'border-nyaya-100 dark:border-white/10'
                }`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => setOpen(isOpen ? null : r.id)}
                    className="flex-1 flex items-center gap-3.5 p-4 text-left active:scale-[0.99] transition-transform min-w-0"
                  >
                    <div className={`w-11 h-11 rounded-xl ${iconMeta.color} flex items-center justify-center shrink-0`}>
                      <Icon size={21} strokeWidth={2.1} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-[14.5px]">{c.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{c.summary}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-nyaya-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => toggleBookmark(r.id)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    className="p-3 shrink-0 active:scale-90 transition-transform"
                  >
                    <Star size={18} className={isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'} />
                  </button>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-nyaya-50 dark:border-white/5">
                      {c.steps.map((s, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="w-5 h-5 rounded-full bg-nyaya-100 dark:bg-nyaya-500/20 text-nyaya-700 dark:text-nyaya-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-[12.5px] text-gray-600 dark:text-gray-300 leading-relaxed">{s}</p>
                        </div>
                      ))}
                      <div className="flex items-start gap-2 bg-nyaya-50 dark:bg-nyaya-500/10 rounded-xl p-3 mt-2">
                        <Scale size={14} className="text-nyaya-600 dark:text-nyaya-300 shrink-0 mt-0.5" />
                        <p className="text-[11.5px] text-nyaya-800 dark:text-nyaya-200 leading-relaxed">{c.law}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-5 bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-100 dark:border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
          <FileText size={19} className="text-amber-600 dark:text-amber-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('more_hint_title')}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{t('more_hint_sub')}</p>
        </div>
        <Phone size={16} className="text-nyaya-400 shrink-0" />
      </div>
    </div>
  );
}
