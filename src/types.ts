export type Page = 'home' | 'chat' | 'rights' | 'sos' | 'detail';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

export type TopicId = 'fir' | 'aid' | 'privacy';

export type KbId =
  | 'fir'
  | 'aid'
  | 'privacy'
  | 'dowry'
  | 'harassment'
  | 'domestic'
  | 'divorce'
  | 'property'
  | 'workplace'
  | 'marriage'
  | 'consent'
  | 'trafficking'
  | 'hello'
  | 'thanks';

export interface TopicContent {
  title: string;
  summary: string;
  steps: string[];
  law: string;
}

export interface Helpline {
  number: string;
  name: string;
  desc: string;
}

export interface LocaleLists {
  quickChips: string[];
  suggestions: string[];
  helplines: Helpline[];
}
