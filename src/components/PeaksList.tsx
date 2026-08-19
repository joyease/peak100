import React, { useState, useMemo } from 'react';
import { SmallPeak, Region } from '../types';
import { Search, CheckCircle2, Circle, Mountain, SlidersHorizontal, ArrowUpDown, Check, MapPin, Grid } from 'lucide-react';

interface PeaksListProps {
  peaks: SmallPeak[];
  completedPeakIds: Set<number>;
  selectedPeak: SmallPeak | null;
  onSelectPeak: (peak: SmallPeak) => void;
  onToggleComplete: (peakId: number) => void;
}

export const PeaksList: React.FC<PeaksListProps> = ({
  peaks,
  completedPeakIds,
  selectedPeak,
  onSelectPeak,
  onToggleComplete
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | '全部'>('全部');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [sortBy, setSortBy] = useState<'number' | 'elevationAsc' | 'elevationDesc'>('number');
  const [viewLayout, setViewLayout] = useState<'matrix' | 'grouped' | 'cards'>('matrix');

  // Filtered and sorted peaks
  const filteredPeaks = useMemo(() => {
    return peaks
      .filter((peak) => {
        // Status filter
        const isDone = completedPeakIds.has(peak.id);
        if (filterStatus === 'completed' && !isDone) return false;
        if (filterStatus === 'uncompleted' && isDone) return false;

        // Region filter
        if (selectedRegion !== '全部' && peak.region !== selectedRegion) return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchName = peak.name.toLowerCase().includes(q);
          const matchAlt = peak.altName?.toLowerCase().includes(q) || false;
          const matchCounty = peak.county.toLowerCase().includes(q);
          const matchNumber = peak.number.includes(q);
          if (!matchName && !matchAlt && !matchCounty && !matchNumber) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'elevationAsc') return a.elevation - b.elevation;
        if (sortBy === 'elevationDesc') return b.elevation - a.elevation;
        return a.id - b.id;
      });
  }, [peaks, completedPeakIds, filterStatus, selectedRegion, searchQuery, sortBy]);

  // Grouped by region for "grouped" view
  const regionsOrder: Region[] = ['北部', '中部', '南部', '東部', '離島'];
  const groupedPeaks = useMemo(() => {
    return regionsOrder.map((reg) => ({
      region: reg,
      list: filteredPeaks.filter((p) => p.region === reg)
    })).filter((group) => group.list.length > 0);
  }, [filteredPeaks]);

  return (
    <section id="small100-peaks-section" className="bg-white rounded-[1.5rem] p-5 sm:p-7 shadow-sm border border-slate-200">
      {/* Header matching High Density theme */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
              小百岳完登明細
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2D5A27] text-white font-bold">
              {completedPeakIds.size} / 100
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            已完成以深綠顯示，未完成以灰標顯示；點選可查看資訊
          </p>
        </div>

        {/* High Density Status Indicator */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-4 text-[10px] font-bold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-[#2D5A27] border border-[#1B3A18]"></div>
              <span className="text-slate-700">已完登 ({completedPeakIds.size})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300"></div>
              <span className="text-slate-400">未完成 ({100 - completedPeakIds.size})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="my-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋山名、編號 (001~100) 或縣市..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#2D5A27] focus:bg-white focus:ring-2 focus:ring-[#2D5A27]/20 text-slate-800 placeholder:text-slate-400 outline-none text-xs font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              全部 ({peaks.length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-[#2D5A27] ${
                filterStatus === 'completed'
                  ? 'bg-[#2D5A27] text-white shadow-xs'
                  : 'hover:bg-slate-200'
              }`}
            >
              ✓ 已完登 ({completedPeakIds.size})
            </button>
            <button
              onClick={() => setFilterStatus('uncompleted')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterStatus === 'uncompleted'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              未完成 ({peaks.length - completedPeakIds.size})
            </button>
          </div>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region | '全部')}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:border-[#2D5A27] outline-none cursor-pointer"
          >
            <option value="全部">全區小百岳</option>
            <option value="北部">北部小百岳</option>
            <option value="中部">中部小百岳</option>
            <option value="南部">南部小百岳</option>
            <option value="東部">東部小百岳</option>
            <option value="離島">離島小百岳</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold focus:border-[#2D5A27] outline-none cursor-pointer"
          >
            <option value="number">編號 (001~100)</option>
            <option value="elevationDesc">海拔高至低</option>
            <option value="elevationAsc">海拔低至高</option>
          </select>

          {/* Layout Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewLayout('matrix')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                viewLayout === 'matrix' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="10欄高密度矩陣"
            >
              高密度矩陣
            </button>
            <button
              onClick={() => setViewLayout('grouped')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                viewLayout === 'grouped' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="按地區分組"
            >
              分區表
            </button>
            <button
              onClick={() => setViewLayout('cards')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                viewLayout === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
              title="詳細卡片"
            >
              卡片
            </button>
          </div>
        </div>
      </div>

      {/* Render Peaks based on view layout */}
      {filteredPeaks.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
          <Mountain className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="font-bold text-slate-600">無符合條件之小百岳</p>
        </div>
      ) : viewLayout === 'matrix' ? (
        /* ================= 10-COLUMN HIGH DENSITY MATRIX ================= */
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-1.5 pt-2">
          {filteredPeaks.map((peak) => {
            const isCompleted = completedPeakIds.has(peak.id);
            const isSelected = selectedPeak?.id === peak.id;
            return (
              <div
                key={peak.id}
                onClick={() => onSelectPeak(peak)}
                onDoubleClick={() => onToggleComplete(peak.id)}
                className={`p-1.5 rounded-lg text-[10px] text-center transition cursor-pointer select-none truncate relative group ${
                  isCompleted
                    ? 'bg-[#2D5A27] text-white font-bold border border-[#1B3A18] shadow-xs hover:bg-[#1B3A18]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-500 font-medium border border-slate-200'
                } ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-1 z-10' : ''}`}
                title={`#${peak.number} ${peak.name} (${peak.elevation}m) - 點擊查看詳情，雙擊切換完登`}
              >
                <div className="truncate">
                  <span className={`font-mono text-[9px] mr-1 ${isCompleted ? 'text-yellow-300' : 'text-slate-400'}`}>
                    {peak.number}
                  </span>
                  <span>{peak.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewLayout === 'grouped' ? (
        /* ================= GROUPED VIEW BY REGION ================= */
        <div className="space-y-4 pt-2">
          {groupedPeaks.map((group) => {
            const groupDone = group.list.filter((p) => completedPeakIds.has(p.id)).length;
            return (
              <div key={group.region} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]"></div>
                    <h5 className="font-extrabold text-slate-800 text-sm">{group.region}地區</h5>
                    <span className="text-[11px] text-slate-400 font-medium">({group.list.length} 座)</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 rounded-full">
                    {groupDone} / {group.list.length} 完登
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {group.list.map((peak) => {
                    const isCompleted = completedPeakIds.has(peak.id);
                    const isSelected = selectedPeak?.id === peak.id;
                    return (
                      <div
                        key={peak.id}
                        onClick={() => onSelectPeak(peak)}
                        className={`p-2 rounded-xl text-xs transition cursor-pointer select-none border ${
                          isCompleted
                            ? 'bg-[#2D5A27] text-white border-[#1B3A18] shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        } ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
                      >
                        <div className="flex items-center justify-between text-[10px] mb-0.5">
                          <span className={`font-mono font-bold ${isCompleted ? 'text-yellow-300' : 'text-slate-400'}`}>
                            #{peak.number}
                          </span>
                          <span className={`text-[9px] ${isCompleted ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {peak.elevation}m
                          </span>
                        </div>
                        <p className="font-bold truncate text-xs">{peak.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= DETAILED CARDS VIEW ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {filteredPeaks.map((peak) => (
            <PeakCard
              key={peak.id}
              peak={peak}
              isCompleted={completedPeakIds.has(peak.id)}
              isSelected={selectedPeak?.id === peak.id}
              onSelect={() => onSelectPeak(peak)}
              onToggle={() => onToggleComplete(peak.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

/* Individual Mountain Card */
interface PeakCardProps {
  peak: SmallPeak;
  isCompleted: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}

const PeakCard: React.FC<PeakCardProps> = ({
  peak,
  isCompleted,
  isSelected,
  onSelect,
  onToggle
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-4 transition-all duration-200 cursor-pointer border select-none ${
        isCompleted
          ? 'bg-[#2D5A27] text-white border-[#1B3A18] shadow-md'
          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
      } ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
            isCompleted ? 'bg-[#1B3A18] text-yellow-300' : 'bg-slate-100 text-slate-500'
          }`}
        >
          #{peak.number}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer ${
            isCompleted
              ? 'bg-[#1B3A18] text-yellow-300 border border-yellow-400/30'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200'
          }`}
          title={isCompleted ? '點擊取消完登' : '點擊標記為已完登'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-yellow-300" />
              <span>已完登</span>
            </>
          ) : (
            <>
              <Circle className="w-3 h-3 text-slate-400" />
              <span>未登</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-1">
        <h5 className="text-base font-extrabold flex items-center justify-between">
          <span>{peak.name}</span>
          <span
            className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
              isCompleted ? 'text-yellow-300 bg-[#1B3A18]' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {peak.elevation}m
          </span>
        </h5>
        {peak.altName && (
          <p className={`text-[11px] truncate mt-0.5 ${isCompleted ? 'text-emerald-100' : 'text-slate-400'}`}>
            別稱: {peak.altName}
          </p>
        )}
      </div>

      <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
        isCompleted ? 'border-emerald-800 text-emerald-100' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{peak.county}</span>
        </div>
        <span className={`px-2 py-0.5 rounded font-bold ${
          isCompleted ? 'bg-[#1B3A18] text-yellow-300' : 'bg-slate-100 text-slate-600'
        }`}>
          {peak.difficulty}
        </span>
      </div>
    </div>
  );
};
