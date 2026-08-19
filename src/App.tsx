import React, { useState, useEffect } from 'react';
import { TAIWAN_SMALL_100_PEAKS } from './data/peaksData';
import { HIKER_ROSTER } from './data/membersData';
import { HikerProfile, SmallPeak } from './types';
import { Navbar } from './components/Navbar';
import { NicknameSearch } from './components/NicknameSearch';
import { TaiwanMap } from './components/TaiwanMap';
import { PeaksList } from './components/PeaksList';
import { CertificateModal } from './components/CertificateModal';
import { PeakDetailModal } from './components/PeakDetailModal';
import { Mountain, Compass, Award, CheckCircle2, Flag, ArrowUp } from 'lucide-react';

export default function App() {
  // Default to first roster hiker
  const [currentProfile, setCurrentProfile] = useState<HikerProfile | null>(() => {
    return HIKER_ROSTER[0]; // Joyease 100/100
  });

  // Track completed peak IDs as a Set
  const [completedPeakIds, setCompletedPeakIds] = useState<Set<number>>(() => {
    return new Set(HIKER_ROSTER[0].completedPeakIds);
  });

  // Selected peak for detail modal
  const [selectedPeak, setSelectedPeak] = useState<SmallPeak | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Certificate Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When a hiker profile is selected / searched
  const handleSelectHiker = (profile: HikerProfile) => {
    setCurrentProfile(profile);
    setCompletedPeakIds(new Set(profile.completedPeakIds));
    try {
      if (profile.email) {
        localStorage.setItem(`peak100_user_${profile.email.toLowerCase()}`, JSON.stringify(profile));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    if (profile.completedPeakIds.length > 0) {
      setIsCertModalOpen(true);
    }
  };

  // Toggle single mountain complete status
  const handleToggleComplete = (peakId: number) => {
    setCompletedPeakIds((prev) => {
      const next = new Set(prev);
      if (next.has(peakId)) {
        next.delete(peakId);
      } else {
        next.add(peakId);
      }

      if (currentProfile) {
        const updated: HikerProfile = {
          ...currentProfile,
          completedPeakIds: Array.from(next)
        };
        setCurrentProfile(updated);
        try {
          if (updated.email) {
            localStorage.setItem(`peak100_user_${updated.email.toLowerCase()}`, JSON.stringify(updated));
          }
        } catch (e) {
          // Ignore
        }
      }
      return next;
    });
  };

  // Select peak to view detail
  const handleOpenPeakDetail = (peak: SmallPeak) => {
    setSelectedPeak(peak);
    setIsDetailModalOpen(true);
  };

  // Reset to default empty state
  const handleResetToDefault = () => {
    setCurrentProfile(null);
    setCompletedPeakIds(new Set());
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-slate-800 flex flex-col font-sans select-none border-t-[12px] border-[#2D5A27]">
      {/* Navigation Header */}
      <Navbar
        completedCount={completedPeakIds.size}
        totalCount={TAIWAN_SMALL_100_PEAKS.length}
        activeNickname={currentProfile?.nickname || null}
        onOpenCertificate={() => setIsCertModalOpen(true)}
        hasCertificate={!!currentProfile && completedPeakIds.size > 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Banner Intro Section with High Density Styling */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#2D5A27] text-white p-6 sm:p-8 mb-6 shadow-xl border border-[#1B3A18]">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A18] text-yellow-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Taiwan Small Peaks 100</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              小百岳完登地圖與獎狀
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed max-w-2xl">
              輸入 Gmail 即可查詢山友的完登紀錄與獎狀，並可查看小百岳地圖資訊
            </p>
          </div>

          {/* Decorative SVG Icon in banner */}
          <div className="absolute -right-8 -bottom-12 opacity-15 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-72 h-72 text-white">
              <path d="M8 18L12 14L16 18M12 14V22M12 2L2 22H22L12 2Z" />
            </svg>
          </div>
        </section>

        {/* 1. Nickname Search & Roster Selector */}
        <NicknameSearch
          currentProfile={currentProfile}
          onSelectHiker={handleSelectHiker}
          onOpenCertificate={() => setIsCertModalOpen(true)}
          onResetToDefault={handleResetToDefault}
        />

        {/* 2. Interactive Taiwan Map with High Density Pin Highlight */}
        <TaiwanMap
          peaks={TAIWAN_SMALL_100_PEAKS}
          completedPeakIds={completedPeakIds}
          selectedPeak={selectedPeak}
          onSelectPeak={handleOpenPeakDetail}
          onToggleComplete={handleToggleComplete}
        />

        {/* 3. High Density 100 Small Peaks List Below Taiwan Map */}
        <PeaksList
          peaks={TAIWAN_SMALL_100_PEAKS}
          completedPeakIds={completedPeakIds}
          selectedPeak={selectedPeak}
          onSelectPeak={handleOpenPeakDetail}
          onToggleComplete={handleToggleComplete}
        />

      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        profile={currentProfile}
        completedCount={completedPeakIds.size}
      />

      {/* Mountain Detail Modal */}
      <PeakDetailModal
        peak={selectedPeak}
        isOpen={isDetailModalOpen}
        isCompleted={selectedPeak ? completedPeakIds.has(selectedPeak.id) : false}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPeak(null);
        }}
        onToggleComplete={() => {
          if (selectedPeak) {
            handleToggleComplete(selectedPeak.id);
          }
        }}
      />

      {/* Scroll to top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#2D5A27] hover:bg-[#1B3A18] text-white shadow-xl border border-[#1B3A18] transition-all z-40 cursor-pointer animate-fadeIn active:scale-95"
          title="回到頂端"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-slate-500 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#2D5A27]"></div>
            <span className="font-bold text-slate-700">台灣小百岳成就地圖 • Taiwan 100 Small Peaks</span>
          </div>
          <p className="text-slate-400 font-medium">
            High Density Design Theme • 全島 100 座郊山完登足跡與榮譽認證
          </p>
        </div>
      </footer>
    </div>
  );
}
