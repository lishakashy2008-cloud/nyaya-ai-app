import type { StringKey } from '@/locales/en';
import { strings as enStrings, lists as enLists, rights as enRights } from '@/locales/en';
import { strings as hiStrings, lists as hiLists, rights as hiRights } from '@/locales/hi';
import { langMeta, type Lang } from '@/lib/languages';
import type { LocaleLists, TopicContent, TopicId } from '@/types';

const registry: Partial<Record<Lang, Record<string, string>>> = {
  en: enStrings,
  hi: hiStrings,
};

const listRegistry: Partial<Record<Lang, LocaleLists>> = {
  en: enLists,
  hi: hiLists,
};

const rightsRegistry: Partial<Record<Lang, Record<TopicId, TopicContent>>> = {
  en: enRights,
  hi: hiRights,
};

export function resolveString(lang: Lang, key: StringKey): string {
  const chain = [lang, ...langMeta(lang).fallback];
  for (const code of chain) {
    const table = registry[code];
    const v = table?.[key];
    if (v) return v;
  }
  return enStrings[key] ?? key;
}

export function resolveList(lang: Lang): LocaleLists {
  const chain = [lang, ...langMeta(lang).fallback];
  for (const code of chain) {
    const l = listRegistry[code];
    if (l) return l;
  }
  return enLists;
}

export function resolveTopic(lang: Lang, id: TopicId): TopicContent {
  const chain = [lang, ...langMeta(lang).fallback];
  for (const code of chain) {
    const r = rightsRegistry[code];
    if (r?.[id]) return r[id];
  }
  return enRights[id];
}
