import { SO_SACH_MUON_TOI_DA } from './kieuSach';

export function loiNhacMuon(soLuong: number): string {
  return soLuong >= SO_SACH_MUON_TOI_DA
    ? 'Bạn đã mượn đủ 3 cuốn.'
    : `Bạn còn có thể mượn ${SO_SACH_MUON_TOI_DA - soLuong} cuốn.`;
}
