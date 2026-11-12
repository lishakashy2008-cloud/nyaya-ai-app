import { useState, useRef, useEffect } from 'react';
import { Send, Scale, RotateCcw } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { getLegalAnswer } from '@/data/legalKnowledge';
import { loadChatHistory, saveChatHistory, clearChatHistory } from '@/lib/storage';
import { useApp } from '@/context/AppContext';
import { lists } from '@/lib/i18n';

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function Chat() {
  const { t, lang, seedQuestion } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadChatHistory();
    return saved ?? [{ id: 'welcome', role: 'bot', text: t('chat_welcome'), time: now() }];
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef<string | null>(null);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: getLegalAnswer(trimmed),
        time: now(),
      };
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, delay);
  };

  useEffect(() => {
    if (seedQuestion && seedQuestion !== seededRef.current) {
      seededRef.current = seedQuestion;
      send(seedQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedQuestion]);

  const reset = () => {
    clearChatHistory();
    setMessages([{ id: 'welcome', role: 'bot', text: t('chat_welcome'), time: now() }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-124px)] max-w-md mx-auto">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-nyaya-600 to-nyaya-500 px-5 py-4 flex items-center gap-3 shadow-lift">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Scale size={20} className="text-white" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-nyaya-600" />
        </div>
        <div className="flex-1 leading-tight">
          <p className="font-semibold text-white text-[15px]">Nyaya AI</p>
          <p className="text-white/80 text-[11px]">{t('online_sub')}</p>
        </div>
        <button
          onClick={reset}
          aria-label={t('reset_chat')}
          className="p-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 transition-all text-white"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3 bg-[#F4F2FC] dark:bg-[#141126]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line shadow-soft ${
                m.role === 'user'
                  ? 'bg-nyaya-500 text-white rounded-br-md'
                  : 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-100 rounded-bl-md'
              }`}
            >
              {m.text}
              <div
                className={`text-[9px] mt-1 text-right ${
                  m.role === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-soft flex gap-1.5">
              <span className="typing-dot w-2 h-2 bg-nyaya-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-nyaya-400 rounded-full" />
              <span className="typing-dot w-2 h-2 bg-nyaya-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2 bg-[#F4F2FC] dark:bg-[#141126]">
          {lists.suggestions[lang].map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="shrink-0 bg-white dark:bg-white/10 border border-nyaya-200 dark:border-white/10 text-nyaya-700 dark:text-nyaya-200 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-soft active:scale-95 transition-transform"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-3 pt-1 bg-[#F4F2FC] dark:bg-[#141126]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 bg-white dark:bg-white/10 rounded-2xl px-3 py-2 shadow-lift border border-nyaya-100 dark:border-white/10"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat_ph')}
            className="flex-1 min-w-0 text-sm py-1.5 outline-none bg-transparent text-gray-800 dark:text-white placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label={t('send_msg')}
            className="bg-nyaya-500 disabled:bg-nyaya-200 dark:disabled:bg-white/10 hover:bg-nyaya-600 p-2.5 rounded-xl transition-all active:scale-90 disabled:cursor-not-allowed text-white"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
