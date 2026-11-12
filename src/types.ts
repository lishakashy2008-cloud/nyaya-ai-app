export type Page = 'home' | 'chat' | 'rights' | 'sos' | 'detail';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}
