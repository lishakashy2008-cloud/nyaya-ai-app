// Language metadata: English + all 22 scheduled languages of India.
// `fallback` chains are used by the resolver when a string is missing.
export interface LangMeta {
  code: string;
  name: string;
  native: string;
  script: string;
  rtl: boolean;
  fallback: string[];
}

export const LANGS: LangMeta[] = [
  { code: 'en', name: 'English', native: 'English', script: 'Latin', rtl: false, fallback: [] },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'Devanagari', rtl: false, fallback: ['en'] },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', script: 'Bengali-Assamese', rtl: false, fallback: ['bn', 'hi', 'en'] },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', script: 'Bengali', rtl: false, fallback: ['hi', 'en'] },
  { code: 'bodo', name: 'Bodo', native: 'बड़ो', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'dogri', name: 'Dogri', native: 'डोगरी', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', script: 'Gujarati', rtl: false, fallback: ['hi', 'en'] },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Kannada', rtl: false, fallback: ['te', 'en'] },
  { code: 'ks', name: 'Kashmiri', native: 'کٲشُر', script: 'Perso-Arabic', rtl: true, fallback: ['ur', 'hi', 'en'] },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', script: 'Devanagari', rtl: false, fallback: ['mr', 'hi', 'en'] },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', script: 'Malayalam', rtl: false, fallback: ['ta', 'en'] },
  { code: 'mni', name: 'Meitei (Manipuri)', native: 'ꯃꯩꯇꯩꯂꯣꯟ', script: 'Meetei Mayek', rtl: false, fallback: ['hi', 'en'] },
  { code: 'mr', name: 'Marathi', native: 'मराठी', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', script: 'Odia', rtl: false, fallback: ['hi', 'en'] },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', rtl: false, fallback: ['hi', 'en'] },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', script: 'Devanagari', rtl: false, fallback: ['hi', 'en'] },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', rtl: false, fallback: ['hi', 'en'] },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', script: 'Perso-Arabic', rtl: true, fallback: ['ur', 'hi', 'en'] },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'Tamil', rtl: false, fallback: ['ml', 'en'] },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', script: 'Telugu', rtl: false, fallback: ['kn', 'en'] },
  { code: 'ur', name: 'Urdu', native: 'اردو', script: 'Perso-Arabic', rtl: true, fallback: ['hi', 'en'] },
];

export type Lang = (typeof LANGS)[number]['code'];

export const DEFAULT_LANG: Lang = 'en';

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && LANGS.some((l) => l.code === v);
}

export function langMeta(code: Lang): LangMeta {
  return LANGS.find((l) => l.code === code) ?? LANGS[0];
}
