import React, { useState } from 'react';
import { Search, UserCheck, Award, X, HelpCircle, Mail } from 'lucide-react';
import { findHikerByGmail, HIKER_ROSTER } from '../data/membersData';
import { HikerProfile } from '../types';

interface NicknameSearchProps {
  currentProfile: HikerProfile | null;
  onSelectHiker: (profile: HikerProfile) => void;
  onOpenCertificate: () => void;
  onResetToDefault: () => void;
}

export const NicknameSearch: React.FC<NicknameSearchProps> = ({
  currentProfile,
  onSelectHiker,
  onOpenCertificate,
  onResetToDefault
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<{
    type: 'success' | 'notFound' | 'idle';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query) {
      setSearchFeedback({
        type: 'idle',
        message: '請輸入 Gmail 進行查詢'
      });
      return;
    }

    const matched = findHikerByGmail(query);

    if (matched) {
      onSelectHiker(matched);
      setSearchFeedback({
        type: 'success',
        message: `查詢成功！山友暱稱「${matched.nickname}」，已載入 ${matched.completedPeakIds.length} 座完登足跡與榮譽獎狀。`
      });
    } else {
      // If a custom Gmail is entered, derive a clean nickname from the email prefix
      const emailPrefix = query.includes('@') ? query.split('@')[0] : query;
      const cleanNickname = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      const fullEmail = query.includes('@') ? query : `${query}@gmail.com`;

      const customProfile: HikerProfile = {
        nickname: cleanNickname,
        email: fullEmail,
        levelTitle: '小百岳自主攀登勇者',
        certId: `TW-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`,
        finishDate: new Date().toISOString().split('T')[0],
        motto: '山海無垠，用雙腳走出屬於自己的小百岳之路。',
        completedPeakIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // Sample 15 peaks for new profile
      };
      onSelectHiker(customProfile);
      setSearchFeedback({
        type: 'notFound',
        message: `已為「${cleanNickname}」建立專屬紀錄面板，可自由勾選登頂山峰與產生獎狀！`
      });
    }
  };

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Search Box (Input Gmail) */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="gmail-input"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>Gmail 查詢 • 查詢完登紀錄與榮譽證書</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              輸入 Gmail，畫面與證書將顯示山友暱稱
            </span>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#2D5A27] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2D5A27]/20 transition">
              <input
                id="gmail-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="請輸入 Gmail（例如：hermanntalk@gmail.com、joyease@gmail.com）"
                className="w-full pl-4 pr-9 py-2.5 bg-transparent font-medium text-slate-800 text-sm placeholder:text-slate-400 outline-none"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setSearchFeedback({ type: 'idle', message: '' });
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              id="search-gmail-btn"
              type="submit"
              className="bg-[#2D5A27] hover:bg-[#1B3A18] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>查詢</span>
            </button>
          </form>

          {/* Feedback message */}
          {searchFeedback.type !== 'idle' && (
            <div
              className={`mt-2.5 text-xs px-3 py-2 rounded-xl flex items-center justify-between gap-2 animate-fadeIn ${
                searchFeedback.type === 'success'
                  ? 'bg-emerald-50 text-[#1B3A18] border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {searchFeedback.type === 'success' ? (
                  <UserCheck className="w-4 h-4 text-[#2D5A27] shrink-0" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>{searchFeedback.message}</span>
              </div>
              {searchFeedback.type === 'success' && (
                <button
                  onClick={onOpenCertificate}
                  className="text-xs font-bold text-[#2D5A27] hover:text-[#1B3A18] underline shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  查看榮譽獎狀
                </button>
              )}
            </div>
          )}
        </div>

        {/* Current Active User Status Card (Displays Nickname) */}
        {currentProfile ? (
          <div className="lg:w-80 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">山友暱稱</p>
              </div>
              {/* Display Mountain Hiker Nickname */}
              <p className="text-base font-black text-slate-900 truncate">
                {currentProfile.nickname}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                <span className="font-extrabold text-[#2D5A27]">
                  {currentProfile.completedPeakIds.length} / 100 完登
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 font-semibold truncate max-w-[110px]">
                  {currentProfile.completedPeakIds.length === 100 ? '🏅 百大滿貫' : `${Math.round((currentProfile.completedPeakIds.length/100)*100)}%`}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                id="view-cert-quick-btn"
                onClick={onOpenCertificate}
                className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1B3A18] text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>開獎狀</span>
              </button>
              <button
                onClick={onResetToDefault}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline text-center cursor-pointer"
              >
                重設
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
