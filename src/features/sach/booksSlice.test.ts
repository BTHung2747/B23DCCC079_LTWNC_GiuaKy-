import booksReducer, { muonSach, traSach, taiDanhSachSach, trangThaiBanDau } from './booksSlice';
import { SACH_MAU } from './sachMau';
import type { TrangThaiSach } from './kieuSach';

function daTaiSach(): TrangThaiSach {
  return booksReducer(undefined, taiDanhSachSach.fulfilled(SACH_MAU, 'request-thu-nghiem', false));
}

describe('booksSlice', () => {
  test('khởi tạo danh sách và sách đang mượn rỗng', () => {
    expect(booksReducer(undefined, { type: 'khong-xac-dinh' })).toEqual(trangThaiBanDau);
  });

  test('pending bật trạng thái tải và xóa lỗi trước đó', () => {
    const state: TrangThaiSach = { ...trangThaiBanDau, loi: 'Lỗi cũ', trangThai: 'that-bai' };
    expect(booksReducer(state, taiDanhSachSach.pending('request', false))).toMatchObject({
      trangThai: 'dang-tai',
      loi: null,
    });
  });

  test('fulfilled lưu sách và trạng thái thành công', () => {
    expect(daTaiSach()).toMatchObject({ danhSach: SACH_MAU, trangThai: 'thanh-cong', loi: null });
  });

  test('rejected lưu thông báo lỗi từ API', () => {
    const action = taiDanhSachSach.rejected(null, 'request', true, 'Không tải được sách');
    expect(booksReducer(undefined, action)).toMatchObject({
      trangThai: 'that-bai',
      loi: 'Không tải được sách',
    });
  });

  test('mượn sách giảm một bản và thêm đúng id vào sách đang mượn', () => {
    const truoc = daTaiSach();
    const sau = booksReducer(truoc, muonSach(1));
    expect(sau.dangMuon).toEqual([1]);
    expect(sau.danhSach.find((sach) => sach.id === 1)?.soBanCon).toBe(4);
    expect(truoc.danhSach.find((sach) => sach.id === 1)?.soBanCon).toBe(5);
  });

  test('không mượn được sách đã hết bản hoặc id không tồn tại', () => {
    const state = daTaiSach();
    expect(booksReducer(state, muonSach(2))).toEqual(state);
    expect(booksReducer(state, muonSach(999))).toEqual(state);
  });

  test('không mượn trùng cùng một đầu sách', () => {
    const state = booksReducer(daTaiSach(), muonSach(1));
    expect(booksReducer(state, muonSach(1))).toEqual(state);
  });

  test('trả sách tăng lại một bản và xóa id khỏi sách đang mượn', () => {
    const state = booksReducer(booksReducer(daTaiSach(), muonSach(1)), traSach(1));
    expect(state.dangMuon).toEqual([]);
    expect(state.danhSach.find((sach) => sach.id === 1)?.soBanCon).toBe(5);
  });

  test('trả sách chưa mượn không làm tăng số bản', () => {
    const state = daTaiSach();
    expect(booksReducer(state, traSach(1))).toEqual(state);
  });

  test('tải lại vẫn giữ đúng số bản cho cuốn đang mượn', () => {
    const state = booksReducer(daTaiSach(), muonSach(1));
    const sau = booksReducer(state, taiDanhSachSach.fulfilled(SACH_MAU, 'tai-lai', false));
    expect(sau.dangMuon).toEqual([1]);
    expect(sau.danhSach.find((sach) => sach.id === 1)?.soBanCon).toBe(4);
  });
});
