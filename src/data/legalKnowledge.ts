export interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const LEGAL_KB: KnowledgeEntry[] = [
  {
    keywords: ['fir', 'first information report', 'police', 'report'],
    answer:
      'FIR (First Information Report) ek official police record hai jo kisi bhi cognizable offence par likha ja sakta hai.\n\n📋 Key points:\n• FIR registered karna police ke liye ZAROORI hai — wo mana nahi kar sakte\n• Aap chahen to FIR apne words mein likhwai kar sakti hain, police ko sunna sunana padega\n• Free of cost hota hai — koi fee nahi\n• Copy aapko turant free mein milni chahiye\n• Agar police FIR nahi likhti: Superintendent of Police ko likhen, ya 181 helpline par call karen',
  },
  {
    keywords: ['legal aid', 'free lawyer', 'advocate', 'vakil', 'lawyer'],
    answer:
      'Har Indian naari ko FREE legal aid ka adhikar hai (Legal Services Authorities Act, 1987).\n\n⚖️ Aapko milega:\n• Free lawyer jo court mein aapki taraf bolega\n• Free legal advice aur document preparation\n• Koi court fee nahi lagti\n\n📞 Contact: National Legal Services Authority (NALSA) — 15100\nYa apne district ke Legal Services Authority office mein jayen. Lady lawyer maangne ka adhikar bhi hai.',
  },
  {
    keywords: ['privacy', 'private', 'photo', 'photo share', 'leak', 'morph', 'cyber'],
    answer:
      'Aapki privacy ka pura kanoon raksha karta hai:\n\n🔒 Aapke adhikar:\n• Koi bhi aapki photos/videos bina permission share kare — yeh crime hai (IT Act, Sec 66E)\n• Character assassination ya blackmail — Sec 67 IT Act ke under punish hoga\n• Online stalking, fake profile, threats — cybercrime cell mein report karen\n• Cybercrime portal: cybercrime.gov.in\n\n💡 Tip: Screenshot lena aur evidence save karna na bhoolen.',
  },
  {
    keywords: ['dowry', 'dahej', '498a'],
    answer:
      'Dahej maangna ya dena — dono illegal hain (Dowry Prohibition Act, 1961).\n\n🚨 Agar aap ya aapki family ko dahej ke liye pressure ho:\n• Sec 498A IPC — husband/in-laws ko 3 saal tak jail ho sakti hai\n• Sec 304B — agar dahej ke kaaran death ho, punishment 7 saal se zyada\n• Aap turant police mein complaint kar sakti hain\n• 181 helpline par call karen ya nearest mahila thana jayen',
  },
  {
    keywords: ['harassment', 'harass', 'eve teasing', 'stalk', 'tang'],
    answer:
      'Kisi bhi tarah ki harassment — physical, verbal ya online — kanoon ke under crime hai:\n\n📌 Relevant laws:\n• Sec 354 IPC — outraging modesty: 1-5 saal jail\n• Sec 509 IPC — gaali, gesture ya comment: 1-3 saal jail\n• Stalking (Sec 354D) — online stalking bhi included\n• Workplace harassment — POSH Act ke under Internal Committee mein complaint\n\nAapki complaint ke liye koi FIR ki zarurat nahi — direct complaint likh sakti hain.',
  },
  {
    keywords: ['domestic', 'husband', 'saas', 'ghar', 'violence', 'physical', 'marpit'],
    answer:
      'Gharelu hinsa (domestic violence) kanoon ke under strict crime hai — Protection of Women from Domestic Violence Act, 2005.\n\n🏠 Aapke adhikar:\n• Protection Order — husband ko aapke paas aane se rokne ka order\n• Residence Rights — chahe ghar kisi aur ke naam ho, aap reh sakti hain\n• Maintenance — kharcha maangne ka adhikar\n• Compensation — nuksaan ki bharpaai\n\n📞 Turant: 181 (Women Helpline) ya 100 (Police)\nMagistrate ko application direct likh sakti hain, lawyer ki zarurat nahi.',
  },
  {
    keywords: ['divorce', 'talaq', 'maintenance', 'kharcha', 'alimony'],
    answer:
      'Divorce aur maintenance ke baare mein:\n\n📄 Divorce:\n• Mutual consent divorce mein aam taur par 6 mahine lagte hain\n• Cruelty, desertion (2 saal), adultery — grounds hain\n• Triple talaq (talaq-e-biddat) India mein banned hai — Muslim Women Act 2019\n\n💰 Maintenance:\n• Patni ko maintenance ka pura adhikar hai\n• Hindu Marriage Act Sec 24/25, CrPC Sec 125 ke under\n• Adhoori bacchon ka kharcha bhi father par hai',
  },
  {
    keywords: ['property', 'jameen', 'inheritance', 'wirasat', 'zameen'],
    answer:
      'Property rights ke baare mein:\n\n🏡 Beti ke adhikar:\n• 2005 ke amendment ke baad beti ka paitrik property mein barabar haq hai — bhai ke barabar\n• Marriage ke baad bhi haq nahi jaata\n• Ancestral property mein by birth share hota hai\n\n📌 Khud ki kamai hui property pe aapki poori marzi hoti hai — will bhi likh sakti hain.',
  },
  {
    keywords: ['workplace', 'office', 'boss', 'posh', 'job', 'kaam'],
    answer:
      'Workplace harassment ke liye POSH Act (2013) raksha karta hai:\n\n💼 Aapke adhikar:\n• Har 10+ employees wale office mein Internal Committee hona ZAROORI hai\n• Complaint 3 mahine ke andar karni hoti hai\n• Enquiry 90 din mein complete honi chahiye\n• Confidentiality ka pura dhyan rakha jaata hai\n• Agar Internal Committee nahi hai: Local Committee mein complaint karen\n\nAgar complaint par retaliation (badla) liya jaaye — wo bhi punishable hai.',
  },
  {
    keywords: ['marriage', 'shaadi', 'age', 'child marriage', 'umr'],
    answer:
      'Marriage laws India mein:\n\n💍 Legal age:\n• Ladki ke liye 18 saal, ladke ke liye 21 saal\n• 18 saal se pehle marriage legal nahi — Child Marriage Prohibition Act\n• Child marriage ko rokne ya report karne par reward bhi hai\n\n📝 Other rights:\n• Dowry prohibition — mandatory\n• Marriage registration ab har state mein strong recommended hai',
  },
  {
    keywords: ['consent', 'rape', 'assault', 'sexual', 'abuse'],
    answer:
      'Consent ke bina koi bhi sexual act — kanoon ke under sabse serious crime hai.\n\n🚨 Emergency steps:\n• Turant 112 ya 100 par call karen\n• Nearest hospital jayen — FREE medical examination milegi, police ke bina bhi\n• Evidence jaldi sabse zyada kaam karta hai — jaldi jayen\n\n⚖️ Law:\n• Sec 376 IPC — 7 saal se umarbhar tak ki saza\n• Aapki identity court mein confidential rehti hai\n• Statement lady police officer ke saamne record hoti hai\n\nAap akeli nahi hain. 181 par call karke turant support lein.',
  },
  {
    keywords: ['trafficking', 'bikti', 'kidnap', 'missing'],
    answer:
      'Human trafficking aur kidnapping ke baare mein:\n\n🚨 Aapke kadam:\n• 1098 (CHILDLINE) — agar 18 saal se kam\n• 112 — emergency response\n• Anti Human Trafficking Units (AHTU) har district mein hain\n\n⚖️ Law: IPC Sec 370-374 trafficking ke under 7 saal se umarbhar tak ki saza.',
  },
  {
    keywords: ['hello', 'hi', 'namaste', 'hey', 'start'],
    answer:
      'Namaste Priya! 🙏 Main Nyaya AI hoon — aapki legal guide.\n\nAap mujhse kisi bhi legal adhikar ke baare mein puch sakti hain:\n• FIR kaise darj karayein\n• Free legal aid (muft vakil)\n• Privacy aur cybercrime\n• Domestic violence, harassment, ya property rights\n\nBataiye, kya jaanna chahengi?',
  },
  {
    keywords: ['thank', 'dhanyavad', 'shukriya'],
    answer:
      'Koi baat nahi! Bas aapki madad ho jaye, bas. 🙏\n\nYaad rakhen:\n📞 Women Helpline: 181\n📞 Emergency: 112\n📞 Legal Aid: 15100\n\nKabhi bhi wapas aayen — main hoon hi.',
  },
];

const FALLBACKS = [
  'Yeh important sawaal hai! Mujhe is par thoda aur detail chahiye. Kya aap in topics ke baare mein jaanna chahengi?\n\n• FIR darj karana\n• Free legal aid\n• Privacy / cybercrime\n• Domestic violence\n• Property rights\n• Workplace harassment\n\nIn par tap karen ya apna sawaal thoda detail mein likhen. 🙏',
  'Main is sawaal ka pura jawab nahi de paayi, lekin in topics mein main aapki poori madad kar sakti hoon:\n\n• FIR process\n• Free lawyer / legal aid\n• Privacy protection\n• Harassment laws\n• Divorce & maintenance\n• Property rights\n\nYa 181 (Women Helpline) par turant call karen. 🙏',
];

export function getLegalAnswer(input: string): string {
  const q = input.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of LEGAL_KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.answer : FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}
