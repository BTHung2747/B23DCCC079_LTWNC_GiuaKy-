import { taoStore } from '../../app/store';
import { muonSach, traSach, taiDanhSachSach } from './booksSlice';
import { SACH_MAU } from './sachMau';

function storeDaCoSach() {
  const store = taoStore();
  store.dispatch(taiDanhSachSach.fulfilled(SACH_MAU, 'request', false));
  return store;
}

describe('middleware giới hạn mượn', () => {
  test('cho phép mượn đủ ba cuốn', () => {
    const store = storeDaCoSach();
    [1, 3, 4].forEach((id) => store.dispatch(muonSach(id)));
    expect(store.getState().sach.dangMuon).toEqual([1, 3, 4]);
  });

  test('chặn cuốn thứ tư, giữ nguyên số bản và phát cảnh báo', () => {
    const store = storeDaCoSach();
    [1, 3, 4, 5].forEach((id) => store.dispatch(muonSach(id)));
    const state = store.getState().sach;
    expect(state.dangMuon).toEqual([1, 3, 4]);
    expect(state.danhSach.find((sach) => sach.id === 5)?.soBanCon).toBe(5);
    expect(state.thongBao).toMatchObject({
      loai: 'canh-bao',
      noiDung: expect.stringContaining('đủ 3 cuốn'),
    });
  });

  test('cho mượn tiếp sau khi trả một cuốn', () => {
    const store = storeDaCoSach();
    [1, 3, 4].forEach((id) => store.dispatch(muonSach(id)));
    store.dispatch(traSach(3));
    store.dispatch(muonSach(5));
    expect(store.getState().sach.dangMuon).toEqual([1, 4, 5]);
    expect(store.getState().sach.danhSach.find((sach) => sach.id === 5)?.soBanCon).toBe(4);
  });
});
