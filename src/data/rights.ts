import type { Lang } from '@/lib/i18n';

export interface TopicContent {
  title: string;
  summary: string;
  steps: string[];
  law: string;
}

export interface RightTopic {
  id: string;
  icon: 'gavel' | 'shield' | 'lock';
  en: TopicContent;
  hi: TopicContent;
}

export const RIGHTS_TOPICS: RightTopic[] = [
  {
    id: 'fir',
    icon: 'gavel',
    en: {
      title: 'File an FIR',
      summary: 'The complete step-by-step process for a police complaint.',
      steps: [
        'Go to the police station in the area where the crime happened — no station can refuse to register your FIR.',
        'Explain clearly what happened. The police must write it in your own words.',
        'Read the FIR, check it, then sign. Don\u2019t forget to take a free copy.',
        'Note down the FIR number and date — for future reference.',
        'If the police refuse: send a written complaint to the SP (Superintendent of Police) or call 181.',
      ],
      law: 'Under Sec 154 CrPC, registering an FIR is the police\u2019s duty. Cost: Zero.',
    },
    hi: {
      title: 'FIR दर्ज कराएँ',
      summary: 'पुलिस शिकायत देने का पूरा तरीका, स्टेप बाय स्टेप।',
      steps: [
        'जिस थाने क्षेत्र में अपराध हुआ, वहाँ जाएँ — कोई भी थाना FIR दर्ज करने से मना नहीं कर सकता।',
        'अपनी बात साफ़-साफ़ बताएँ। पुलिस को आपके शब्दों में ही लिखना होगा।',
        'FIR पढ़कर जाँच लें, फिर साइन करें। कॉपी मुफ़्त में लेना न भूलें।',
        'FIR नंबर और तारीख़ नोट करें — आगे के काम के लिए।',
        'अगर पुलिस मना करे: SP (पुलिस अधीक्षक) को लिखित शिकायत भेजें या 181 पर कॉल करें।',
      ],
      law: 'धारा 154 CrPC के तहत FIR दर्ज करना पुलिस की ज़िम्मेदारी है। शुल्क: शून्य।',
    },
  },
  {
    id: 'aid',
    icon: 'shield',
    en: {
      title: 'Free Legal Aid',
      summary: 'Free lawyer and legal advice — every woman\u2019s right.',
      steps: [
        'Every woman in India is entitled to FREE legal aid — whatever her income.',
        'Visit your district Legal Services Authority (DLSA) office — usually on the court campus.',
        'Or call the NALSA helpline 15100 for free legal advice.',
        'You can ask for a lady lawyer — it is your right.',
        'Court fees, document charges — all free. Even the lawyer\u2019s fee is paid by the state.',
      ],
      law: 'Under Sec 12 of the Legal Services Authorities Act, 1987, every woman is entitled.',
    },
    hi: {
      title: 'मुफ़्त कानूनी सहायता',
      summary: 'मुफ़्त वकील और कानूनी सलाह — हर महिला का अधिकार।',
      steps: [
        'भारत में हर महिला को मुफ़्त कानूनी सहायता का अधिकार है — आय कुछ भी हो।',
        'अपने ज़िले के लीगल सर्विसेज़ अथॉरिटी (DLSA) कार्यालय जाएँ — आमतौर पर कोर्ट परिसर में होता है।',
        'या NALSA हेल्पलाइन 15100 पर कॉल करें — मुफ़्त कानूनी सलाह मिलेगी।',
        'आप महिला वकील माँग सकती हैं — यह आपका अधिकार है।',
        'कोर्ट फ़ीस, दस्तावेज़ शुल्क — सब मुफ़्त। वकील की फ़ीस भी सरकार देती है।',
      ],
      law: 'लीगल सर्विसेज़ अथॉरिटीज़ एक्ट, 1987 — धारा 12 के तहत हर महिला हक़दार है।',
    },
  },
  {
    id: 'privacy',
    icon: 'lock',
    en: {
      title: 'Privacy & Cyber Safety',
      summary: 'Legal protection for your photos, chats and personal data.',
      steps: [
        'Sharing your photos or videos without permission is a crime — IT Act Sec 66E.',
        'Morphed photos or blackmail — 3+ years imprisonment under IT Act Sec 67.',
        'Save evidence (screenshots, links, numbers) right away — never delete it.',
        'File a complaint online at cybercrime.gov.in, or visit your nearest cyber cell.',
        'If it is financial fraud, inform your bank immediately — money can be frozen in the golden hour.',
      ],
      law: 'IT Act 2000 + Digital Personal Data Protection Act, 2023 guard your privacy.',
    },
    hi: {
      title: 'प्राइवेसी और साइबर सुरक्षा',
      summary: 'आपकी फ़ोटो, चैट और निजी डेटा की कानूनी हिफ़ाज़त।',
      steps: [
        'बिना अनुमति आपकी फ़ोटो या वीडियो शेयर करना अपराध है — IT एक्ट धारा 66E।',
        'मॉर्फ़्ड फ़ोटो या ब्लैकमेलिंग — IT एक्ट धारा 67 के तहत 3+ साल की सज़ा।',
        'सबूत (स्क्रीनशॉट, लिंक, नंबर) तुरंत सेव करें — डिलीट न करें।',
        'cybercrime.gov.in पर ऑनलाइन शिकायत करें, या नज़दीकी साइबर सेल जाएँ।',
        'पैसों से जुड़ा फ्रॉड हो तो बैंक को तुरंत बताएँ — गोल्डन आवर में पैसे रुक सकते हैं।',
      ],
      law: 'IT एक्ट 2000 + डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट, 2023 आपकी प्राइवेसी की रक्षा करते हैं।',
    },
  },
];

export function getTopic(id: string): RightTopic | undefined {
  return RIGHTS_TOPICS.find((t) => t.id === id);
}

export function topicContent(topic: RightTopic, lang: Lang): TopicContent {
  return topic[lang];
}
