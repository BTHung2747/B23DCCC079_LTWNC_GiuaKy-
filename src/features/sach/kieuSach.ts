export const CAC_THE_LOAI = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;
export const SO_SACH_MUON_TOI_DA = 3;

export type TheLoai = (typeof CAC_THE_LOAI)[number];

export interface BiaSach {
  dongTieuDe: string[];
  kyHieu: string;
  tenTacGia: string;
  mauBia: string;
  mauChu: string;
  nenSang: string;
  nenToi: string;
  kieu: 'code' | 'geometric' | 'serif';
}

export interface Sach {
  id: number;
  tenSach: string;
  tacGia: string;
  theLoai: TheLoai;
  namXuatBan: number;
  soBanCon: number;
  biaSach: BiaSach;
}

export type ThongTinBiaSach = Pick<Sach, 'tenSach' | 'biaSach'>;
export type ThongKeTheLoai = Record<TheLoai, number>;

export interface ThongBaoSach {
  loai: 'thanh-cong' | 'canh-bao';
  noiDung: string;
}

export interface TrangThaiSach {
  danhSach: Sach[];
  dangMuon: Sach['id'][];
  trangThai: 'chua-tai' | 'dang-tai' | 'thanh-cong' | 'that-bai';
  loi: string | null;
  thongBao: ThongBaoSach | null;
}
