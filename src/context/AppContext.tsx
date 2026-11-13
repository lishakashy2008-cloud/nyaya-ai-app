import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_LANG, isLang, langMeta, type Lang } from '@/lib/languages';
import { resolveList, resolveString, resolveTopic } from '@/lib/resolve';
import type { StringKey } from '@/locales/en';
import type { TopicContent, TopicId } from '@/types';
import { loadProfile, saveProfile, clearProfile, type UserProfile } from '@/lib/storage';
import type { Page } from '@/types';

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: StringKey) => string;
  topic: (id: TopicId) => TopicContent;
  chips: string[];
  suggestions: string[];
  dark: boolean;
  toggleDark: () => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  page: Page;
  navigate: (p: Page) => void;
  detailId: string | null;
  openDetail: (id: string) => void;
  seedQuestion: string | null;
  askAI: (q: string) => void;
  profile: UserProfile | null;
  login: (name: string, phone: string) => void;
  logout: () => void;
}

const Ctx = createContext<AppCtx | null>(null);

function readPref<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = readPref<string>('nyaya_lang', DEFAULT_LANG);
    return isLang(saved) ? saved : DEFAULT_LANG;
  });
  const [dark, setDark] = useState<boolean>(() => readPref<boolean>('nyaya_dark', false));
  const [bookmarks, setBookmarks] = useState<string[]>(() => readPref<string[]>('nyaya_bookmarks', []));
  const [page, setPage] = useState<Page>('home');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [seedQuestion, setSeedQuestion] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = langMeta(lang).rtl ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('nyaya_lang', JSON.stringify(l));
    } catch {
      // ignore
    }
  };

  const toggleDark = () => {
    setDark((d) => {
      try {
        localStorage.setItem('nyaya_dark', JSON.stringify(!d));
      } catch {
        // ignore
      }
      return !d;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      try {
        localStorage.setItem('nyaya_bookmarks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const navigate = (p: Page) => {
    setPage(p);
    if (p !== 'detail') setDetailId(null);
    window.scrollTo({ top: 0 });
  };

  const openDetail = (id: string) => {
    setDetailId(id);
    setPage('detail');
    window.scrollTo({ top: 0 });
  };

  const askAI = (q: string) => {
    setSeedQuestion(q);
    setPage('chat');
    window.scrollTo({ top: 0 });
  };

  const login = (name: string, phone: string) => {
    const p = { name, phone };
    setProfile(p);
    saveProfile(p);
  };

  const logout = () => {
    setProfile(null);
    clearProfile();
    setPage('home');
    setDetailId(null);
  };

  const list = resolveList(lang);

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang,
        t: (k) => resolveString(lang, k),
        topic: (id) => resolveTopic(lang, id),
        chips: list.quickChips,
        suggestions: list.suggestions,
        dark,
        toggleDark,
        bookmarks,
        toggleBookmark,
        page,
        navigate,
        detailId,
        openDetail,
        seedQuestion,
        askAI,
        profile,
        login,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
