import { create } from 'zustand';
import type { TheLoai } from '../sach/kieuSach';

export type TheLoaiBoLoc = TheLoai | 'Tất cả';

interface TrangThaiBoLoc {
  tuKhoa: string;
  theLoai: TheLoaiBoLoc;
  datTuKhoa: (tuKhoa: string) => void;
  datTheLoai: (theLoai: TheLoaiBoLoc) => void;
  xoaBoLoc: () => void;
}

export const useBoLocStore = create<TrangThaiBoLoc>((set) => ({
  tuKhoa: '',
  theLoai: 'Tất cả',
  datTuKhoa: (tuKhoa) => set({ tuKhoa }),
  datTheLoai: (theLoai) => set({ theLoai }),
  xoaBoLoc: () => set({ tuKhoa: '', theLoai: 'Tất cả' }),
}));
