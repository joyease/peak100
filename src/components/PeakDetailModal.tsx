import React from 'react';
import { SmallPeak } from '../types';
import { X, CheckCircle2, Circle, Mountain, MapPin, ExternalLink, Flag } from 'lucide-react';

interface PeakDetailModalProps {
  peak: SmallPeak | null;
  isOpen: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
}

export const PeakDetailModal: React.FC<PeakDetailModalProps> = ({
  peak,
  isOpen,
  isCompleted,
  onClose,
  onToggleComplete
}) => {
  if (!isOpen || !peak) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-6 text-white relative transition-colors ${
            isCompleted
              ? 'bg-[#2D5A27] border-b border-[#1B3A18]'
              : 'bg-slate-900 border-b border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/20 text-yellow-300">
                No. {peak.number}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
                {peak.region}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black flex items-center gap-2 text-white">
            <span>{peak.name}</span>
            {peak.altName && (
              <span className="text-base font-normal text-slate-300">
                ({peak.altName})
              </span>
            )}
          </h3>

          <div className="flex items-center gap-3 mt-3 text-sm text-slate-200">
            <span className="text-xl font-black text-yellow-300 font-mono">
              {peak.elevation} 公尺
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-yellow-300" />
              {peak.county}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-sm text-slate-700 bg-slate-50">
          {/* Key specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">基點/三角點</p>
              <p className="font-bold text-slate-800 mt-0.5 text-xs">
                {peak.triangulation || '無基石'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">步道難易度</p>
              <p className="font-bold text-slate-800 mt-0.5 text-xs">
                {peak.difficulty}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">經緯度座標</p>
              <p className="font-mono text-xs font-bold text-slate-700 mt-0.5">
                {peak.lat.toFixed(4)}, {peak.lng.toFixed(4)}
              </p>
            </div>
          </div>

          {/* Highlight description */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              <Flag className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>山容特色與展望</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm font-medium">
              {peak.highlight}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${peak.lat},${peak.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#2D5A27] hover:text-[#1B3A18] flex items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google 地圖路線</span>
            </a>

            <button
              onClick={onToggleComplete}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md cursor-pointer active:scale-95 ${
                isCompleted
                  ? 'bg-[#2D5A27] hover:bg-[#1B3A18] text-white border border-[#1B3A18]'
                  : 'bg-slate-900 hover:bg-black text-white'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>已完登 (點此取消)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>標記為已完登</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
