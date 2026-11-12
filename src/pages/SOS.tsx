import { useState } from 'react';
import {
  Siren, Phone, Scale, MapPin, Heart, ShieldAlert, X, Check, UserPlus, Trash2, Users, Star,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { loadContacts, saveContacts, type EmergencyContact } from '@/lib/storage';
import { lists } from '@/lib/i18n';

export default function SOS() {
  const { t, lang } = useApp();
  const [sosActive, setSosActive] = useState(false);
  const [calling, setCalling] = useState<string | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => loadContacts());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanNumber = number.trim();
    if (!cleanName || !/^[+]?[0-9-\s]{6,15}$/.test(cleanNumber)) return;
    const next = [...contacts, { id: crypto.randomUUID(), name: cleanName, number: cleanNumber }];
    setContacts(next);
    saveContacts(next);
    setName('');
    setNumber('');
    setShowForm(false);
  };

  const removeContact = (id: string) => {
    const next = contacts.filter((c) => c.id !== id);
    setContacts(next);
    saveContacts(next);
  };

  const handleCall = (num: string) => {
    setCalling(num);
    window.location.href = `tel:${num}`;
    setTimeout(() => setCalling(null), 1500);
  };

  return (
    <div className="max-w-md mx-auto px-5 py-6 pb-10">
      <div className="mb-5 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-sos-50 dark:bg-sos-500/15 flex items-center justify-center shrink-0">
          <ShieldAlert size={20} className="text-sos-600" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">{t('sos_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{t('sos_sub')}</p>
        </div>
      </div>

      {/* Big SOS button */}
      <div className="relative flex flex-col items-center py-6">
        {sosActive && (
          <span className="absolute top-6 w-40 h-40 rounded-full bg-sos-500 animate-pulse-ring" />
        )}
        <button
          onClick={() => setSosActive(true)}
          aria-label="SOS button"
          className={`relative w-40 h-40 rounded-full font-display font-extrabold text-white text-3xl tracking-wider shadow-sos transition-all duration-300 active:scale-95 ${
            sosActive
              ? 'bg-gradient-to-br from-sos-600 to-sos-700 ring-4 ring-sos-100 dark:ring-sos-500/30'
              : 'bg-gradient-to-br from-sos-500 to-sos-600'
          }`}
        >
          SOS
          <span className="block text-[11px] font-medium text-white/85 mt-1 tracking-normal">
            {t('sos_tap')}
          </span>
        </button>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-4 text-center max-w-[240px] leading-relaxed">
          {sosActive ? t('sos_active') : t('sos_idle')}
        </p>
      </div>

      {/* SOS activated panel */}
      {sosActive && (
        <div className="animate-fade-up bg-sos-50 dark:bg-sos-500/10 border border-sos-100 dark:border-sos-500/20 rounded-2xl p-4 mb-5">
          <div className="flex items-start gap-2.5">
            <Check size={16} className="text-sos-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-sos-700 dark:text-sos-500 text-sm">{t('sos_mode')}</p>
              <p className="text-sos-600/80 dark:text-sos-500/80 text-xs mt-1 leading-relaxed">
                {t('sos_step1')}
                <br />
                {t('sos_step2')}
                <br />
                {t('sos_step3')}
              </p>
              <button
                onClick={() => setSosActive(false)}
                className="mt-3 flex items-center gap-1 text-xs font-semibold text-sos-600 active:scale-95 transition-transform"
              >
                <X size={12} /> {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Talk to lawyer */}
      <button
        onClick={() => handleCall('15100')}
        className="w-full bg-gradient-to-r from-nyaya-600 to-nyaya-500 rounded-2xl p-4 flex items-center gap-3.5 shadow-lift active:scale-[0.98] transition-transform text-left mb-5"
      >
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Scale size={21} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-[15px]">
            {calling === '15100' ? t('calling') : t('talk_lawyer')}
          </p>
          <p className="text-white/85 text-xs">{t('talk_lawyer_sub')}</p>
        </div>
        <Phone size={18} className="text-white shrink-0" />
      </button>

      {/* Offline emergency contacts */}
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-1 flex items-center gap-2">
        <Users size={16} className="text-nyaya-600 dark:text-nyaya-300" /> {t('contacts_title')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-[11px] mb-3">{t('contacts_sub')}</p>
      <div className="space-y-2.5">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-100 dark:border-white/10 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Star size={19} className="text-emerald-600 dark:text-emerald-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-[14px] truncate">{c.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{c.number}</p>
            </div>
            <button
              onClick={() => handleCall(c.number)}
              aria-label={`${c.name}: ${t('call_btn')}`}
              className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-soft active:scale-90 transition-transform"
            >
              <Phone size={15} className="text-white" />
            </button>
            <button
              onClick={() => removeContact(c.id)}
              aria-label={`${c.name}: ${t('remove_btn')}`}
              className="w-9 h-9 rounded-full bg-sos-50 dark:bg-sos-500/15 flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            >
              <Trash2 size={15} className="text-sos-600" />
            </button>
          </div>
        ))}

        {showForm && (
          <form
            onSubmit={addContact}
            className="animate-fade-up bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-200 dark:border-white/10 space-y-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('name_ph')}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-[#F4F2FC] dark:bg-white/10 outline-none border border-nyaya-100 dark:border-white/10 focus:border-nyaya-400 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="tel"
              inputMode="tel"
              placeholder={t('number_ph')}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-[#F4F2FC] dark:bg-white/10 outline-none border border-nyaya-100 dark:border-white/10 focus:border-nyaya-400 text-gray-800 dark:text-white placeholder:text-gray-400"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!name.trim() || !number.trim()}
                className="flex-1 bg-nyaya-500 disabled:bg-nyaya-200 dark:disabled:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-95"
              >
                {t('save_btn')}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-sm font-semibold py-2.5 rounded-xl active:scale-95 transition-transform"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        )}

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-nyaya-200 dark:border-white/15 text-nyaya-600 dark:text-nyaya-300 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            <UserPlus size={16} />
            {contacts.length === 0 ? t('add_contact') : t('add_more')}
          </button>
        )}
      </div>

      {/* Helplines */}
      <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-3 mt-6 flex items-center gap-2">
        <Phone size={16} className="text-nyaya-600 dark:text-nyaya-300" /> {t('helplines')}
      </h3>
      <div className="space-y-2.5">
        {lists.helplines[lang].map((h) => (
          <button
            key={h.number}
            onClick={() => handleCall(h.number)}
            className="w-full bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-100 dark:border-white/10 flex items-center gap-3.5 text-left active:scale-[0.98] hover:shadow-lift transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-nyaya-100 dark:bg-nyaya-500/20 flex items-center justify-center shrink-0">
              <span className="font-bold text-nyaya-700 dark:text-nyaya-300 text-sm">{h.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-[14px]">{h.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{h.desc}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-soft">
              <Phone size={15} className="text-white" />
            </div>
          </button>
        ))}
      </div>

      {/* Nearest help */}
      <div className="mt-5 bg-white dark:bg-white/5 rounded-2xl p-4 shadow-soft border border-nyaya-100 dark:border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center shrink-0">
          <MapPin size={19} className="text-sky-600 dark:text-sky-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('nearest_title')}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{t('nearest_sub')}</p>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-6 flex items-center justify-center gap-1.5">
        <Heart size={11} className="text-sos-500" />
        {t('footer')}
      </p>
    </div>
  );
}
