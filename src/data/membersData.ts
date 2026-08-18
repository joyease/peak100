import { HikerProfile } from '../types';

export const HIKER_ROSTER: HikerProfile[] = [
  {
    nickname: '文華',
    email: 'hermannhuang@gmail.com',
    levelTitle: '小百岳高階縱走達人',
    certId: 'TW-WENHUA-2026-073',
    finishDate: '2026-08-18',
    motto: '心懷謙卑，敬畏山林；用雙腳丈量台灣美麗山嶽。',
    // 73 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 46, 48, 49, 51, 52, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 67, 68, 72, 73, 74, 75, 76, 77, 78, 80, 82, 83, 94, 96, 98, 100
    ]
  },
  {
    nickname: '如娟',
    email: 'ruchuan30@gmail.com',
    levelTitle: '小百岳高階縱走達人',
    certId: 'TW-RUCHUAN-2026-073',
    finishDate: '2026-08-18',
    motto: '攜手同心，走過台灣山林最美的脊樑。',
    // 73 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 46, 48, 49, 51, 52, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 67, 68, 72, 73, 74, 75, 76, 77, 78, 80, 82, 83, 94, 96, 98, 100
    ]
  },
  {
    nickname: 'Hermann',
    email: 'hermanntalk@gmail.com',
    levelTitle: '小百岳高階縱走達人',
    certId: 'TW-HERMANN-2026-073',
    finishDate: '2026-08-18',
    motto: '心懷謙卑，敬畏山林；用雙腳丈量台灣美麗山嶽。',
    // 73 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 46, 48, 49, 51, 52, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 67, 68, 72, 73, 74, 75, 76, 77, 78, 80, 82, 83, 94, 96, 98, 100
    ]
  },
  {
    nickname: 'Joyease',
    email: 'joyease@gmail.com',
    levelTitle: '小百岳榮譽完登百岳大師',
    certId: 'TW-JOY-2026-001',
    finishDate: '2026-06-18',
    motto: '心懷謙卑，敬畏山林；百岳足跡，永存心間。',
    completedPeakIds: Array.from({ length: 100 }, (_, i) => i + 1) // 100/100 全完登!
  },
  {
    nickname: '小林隊長',
    email: 'lin.captain@gmail.com',
    levelTitle: '小百岳百岳大滿貫山友',
    certId: 'TW-100HILLS-2026-008',
    finishDate: '2026-05-20',
    motto: '一步一腳印，用雙腳丈量台灣的美麗脊樑。',
    completedPeakIds: Array.from({ length: 100 }, (_, i) => i + 1) // 100/100
  },
  {
    nickname: '登山阿吉',
    email: 'mount.aji@gmail.com',
    levelTitle: '小百岳高階縱走達人',
    certId: 'TW-100HILLS-2026-042',
    finishDate: '2026-07-12',
    motto: '山永遠在那裡，享受登頂的每刻呼吸。',
    // 82 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 75, 76, 77, 80, 83, 84, 88, 97, 98, 99
    ]
  },
  {
    nickname: '山野旅人',
    email: 'mountain.traveler@gmail.com',
    levelTitle: '小百岳進階健行勇者',
    certId: 'TW-100HILLS-2026-105',
    finishDate: '2026-04-08',
    motto: '遠離塵囂，走入山林寻找最純粹的平靜。',
    // 58 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58
    ]
  },
  {
    nickname: '百岳阿梅',
    email: 'may.hike@gmail.com',
    levelTitle: '小百岳精銳登山客',
    certId: 'TW-100HILLS-2026-188',
    finishDate: '2026-03-15',
    motto: '山不在高，有心則達。小百岳也是滿滿台灣情。',
    // 40 peaks completed
    completedPeakIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
    ]
  },
  {
    nickname: 'Joy登山隊',
    email: 'joy.team@gmail.com',
    levelTitle: '小百岳團體完登榮譽榜',
    certId: 'TW-TEAM-2026-888',
    finishDate: '2026-08-01',
    motto: '攜手同心，齊登巔峰，小百岳百座完滿！',
    completedPeakIds: Array.from({ length: 100 }, (_, i) => i + 1) // 100/100
  },
  {
    nickname: '台灣山友',
    email: 'taiwan.hiker@gmail.com',
    levelTitle: '小百岳熱血初階山友',
    certId: 'TW-100HILLS-2026-302',
    finishDate: '2026-02-14',
    motto: '從小百岳出發，看見不一樣的台灣視角。',
    // 25 peaks completed
    completedPeakIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 35, 38, 55]
  }
];

export function findHikerByGmail(input: string): HikerProfile | null {
  if (!input || !input.trim()) return null;
  const clean = input.trim().toLowerCase();
  const inputUser = clean.includes('@') ? clean.split('@')[0] : clean;
  const inputEmail = clean.includes('@') ? clean : `${clean}@gmail.com`;

  // 1. Direct match in roster first (official data source)
  const rosterMatch = HIKER_ROSTER.find((h) => {
    const hEmail = h.email.toLowerCase();
    const hUser = hEmail.split('@')[0];
    const hNick = h.nickname.toLowerCase();
    
    return (
      hEmail === clean ||
      hEmail === inputEmail ||
      hUser === inputUser ||
      hNick === clean
    );
  });

  if (rosterMatch) {
    // Check if user made additional local custom checkmarks on top of roster
    try {
      const saved = localStorage.getItem(`peak100_user_${rosterMatch.email.toLowerCase()}`);
      if (saved) {
        const parsed = JSON.parse(saved) as HikerProfile;
        if (parsed && Array.isArray(parsed.completedPeakIds) && parsed.completedPeakIds.length >= rosterMatch.completedPeakIds.length) {
          return { ...rosterMatch, ...parsed };
        }
      }
    } catch (e) {
      // Ignore
    }
    return rosterMatch;
  }

  // 2. Check localStorage for non-roster custom saved record
  try {
    const saved = localStorage.getItem(`peak100_user_${inputEmail}`) || localStorage.getItem(`peak100_user_${inputUser}`);
    if (saved) {
      const parsed = JSON.parse(saved) as HikerProfile;
      if (parsed && Array.isArray(parsed.completedPeakIds)) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore localStorage parse errors
  }

  return null;
}
