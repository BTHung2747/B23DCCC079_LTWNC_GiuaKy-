import type { KetQuaApi } from '../types/ketQuaApi';
import type { Sach } from '../features/sach/kieuSach';
import { SACH_MAU } from '../features/sach/sachMau';

export function layDanhSachSach(giaLapLoi = false): Promise<KetQuaApi<Sach[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (giaLapLoi) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách. Bạn hãy thử lại nhé.' });
        return;
      }

      resolve({
        ok: true,
        data: SACH_MAU.map((sach) => ({
          ...sach,
          biaSach: { ...sach.biaSach, dongTieuDe: [...sach.biaSach.dongTieuDe] },
        })),
      });
    }, 500);
  });
}
