import { layDanhSachSach } from './booksApi';
import { laKetQuaThanhCong } from '../types/ketQuaApi';

describe('API sách giả lập', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('chỉ trả dữ liệu sau đủ 500ms', async () => {
    const daHoanTat = jest.fn();
    const promise = layDanhSachSach().then((ketQua) => {
      daHoanTat();
      return ketQua;
    });
    await jest.advanceTimersByTimeAsync(499);
    expect(daHoanTat).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1);
    const ketQua = await promise;
    expect(laKetQuaThanhCong(ketQua)).toBe(true);
    if (laKetQuaThanhCong(ketQua)) expect(ketQua.data).toHaveLength(9);
  });

  test('tham số giả lập lỗi trả về nhánh ok: false', async () => {
    const promise = layDanhSachSach(true);
    await jest.advanceTimersByTimeAsync(500);
    const ketQua = await promise;
    expect(laKetQuaThanhCong(ketQua)).toBe(false);
    if (!laKetQuaThanhCong(ketQua)) expect(ketQua.error).toContain('Không thể tải');
  });
});
