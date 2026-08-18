export type Region = '北部' | '中部' | '南部' | '東部' | '離島';

export interface SmallPeak {
  id: number;
  number: string; // e.g. "001"
  name: string;
  altName?: string;
  county: string;
  region: Region;
  elevation: number; // in meters
  lat: number;
  lng: number;
  triangulation?: string; // 三角點 e.g. "一等三角點", "二等三角點 No.1061"
  difficulty: '親民級' | '健行級' | '挑戰級';
  highlight: string;
}

export interface HikerProfile {
  nickname: string;
  email: string;
  avatar?: string;
  completedPeakIds: number[];
  certId: string;
  finishDate?: string;
  levelTitle: string;
  motto?: string;
}
