import React from 'react';
import { Award, Compass, MapPin } from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  activeNickname: string | null;
  onOpenCertificate: () => void;
  hasCertificate: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  activeNickname,
  onOpenCertificate,
  hasCertificate
}) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-[#2D5A27] flex items-center justify-center text-white shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M8 18L12 14L16 18M12 14V22M12 2L2 22H22L12 2Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                台灣小百岳成就地圖
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] border border-[#2D5A27]/20 font-bold uppercase tracking-wider">
                100 Total Summits
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Taiwan 100 Small Peaks Achievement Tracker
            </p>
          </div>
        </div>

        {/* Right side certificate button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Certificate Trigger Button */}
          <button
            id="navbar-cert-btn"
            onClick={onOpenCertificate}
            disabled={!hasCertificate && completedCount === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 ${
              hasCertificate
                ? 'bg-[#2D5A27] hover:bg-[#1B3A18] text-white shadow-[#2D5A27]/30 cursor-pointer border border-[#1B3A18]'
                : completedCount > 0
                ? 'bg-[#3E7A37] hover:bg-[#2D5A27] text-white cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
            }`}
            title={activeNickname ? `查看 ${activeNickname} 的榮譽獎狀` : '請先輸入暱稱查詢或登入'}
          >
            <Award className={`w-4 h-4 ${hasCertificate ? 'text-yellow-300' : 'text-slate-400'}`} />
            <span>{hasCertificate ? '查看榮譽獎狀' : '產生獎狀'}</span>
            {activeNickname && (
              <span className="hidden lg:inline-block max-w-[80px] truncate text-[11px] px-1.5 py-0.2 bg-black/20 text-white rounded">
                {activeNickname}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
