import type { ChatMessage } from '@/types';

const CHAT_KEY = 'nyaya_chat_history';
const CONTACTS_KEY = 'nyaya_emergency_contacts';
const PROFILE_KEY = 'nyaya_profile';

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
}

export interface UserProfile {
  name: string;
  phone: string;
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — history simply won't persist
  }
}

export function loadChatHistory(): ChatMessage[] | null {
  const history = read<ChatMessage[]>(CHAT_KEY);
  return Array.isArray(history) && history.length > 0 ? history : null;
}

export function saveChatHistory(messages: ChatMessage[]) {
  write(CHAT_KEY, messages.slice(-100));
}

export function clearChatHistory() {
  try {
    localStorage.removeItem(CHAT_KEY);
  } catch {
    // ignore
  }
}

export function loadContacts(): EmergencyContact[] {
  const contacts = read<EmergencyContact[]>(CONTACTS_KEY);
  return Array.isArray(contacts) ? contacts : [];
}

export function saveContacts(contacts: EmergencyContact[]) {
  write(CONTACTS_KEY, contacts);
}

export function loadProfile(): UserProfile | null {
  return read<UserProfile>(PROFILE_KEY);
}

export function saveProfile(profile: UserProfile) {
  write(PROFILE_KEY, profile);
}

export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    // ignore
  }
}
