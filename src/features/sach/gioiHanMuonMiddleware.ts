import type { Middleware } from '@reduxjs/toolkit';
import { hienThongBao, muonSach } from './booksSlice';
import { SO_SACH_MUON_TOI_DA, type TrangThaiSach } from './kieuSach';

export const gioiHanMuonMiddleware: Middleware<object, { sach: TrangThaiSach }> =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (muonSach.match(action)) {
      const { danhSach, dangMuon } = getState().sach;
      const sach = danhSach.find((item) => item.id === action.payload);
      const coTheMuon = sach && sach.soBanCon > 0 && !dangMuon.includes(sach.id);

      if (coTheMuon && dangMuon.length >= SO_SACH_MUON_TOI_DA) {
        dispatch(
          hienThongBao({
            loai: 'canh-bao',
            noiDung: 'Bạn đã mượn đủ 3 cuốn. Hãy trả một cuốn trước khi mượn thêm.',
          }),
        );
        return;
      }
    }

    return next(action);
  };
