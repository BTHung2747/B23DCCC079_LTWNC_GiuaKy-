import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { layDanhSachSach } from '../../api/booksApi';
import { laKetQuaThanhCong } from '../../types/ketQuaApi';
import type { Sach, ThongBaoSach, TrangThaiSach } from './kieuSach';

export const trangThaiBanDau: TrangThaiSach = {
  danhSach: [],
  dangMuon: [],
  trangThai: 'chua-tai',
  loi: null,
  thongBao: null,
};

export const taiDanhSachSach = createAsyncThunk<
  Sach[],
  boolean | undefined,
  { state: { sach: TrangThaiSach }; rejectValue: string }
>(
  'sach/taiDanhSachSach',
  async (giaLapLoi = false, { rejectWithValue }) => {
    const ketQua = await layDanhSachSach(giaLapLoi);
    if (laKetQuaThanhCong(ketQua)) return ketQua.data;
    return rejectWithValue(ketQua.error);
  },
  {
    condition: (_, { getState }) => getState().sach.trangThai !== 'dang-tai',
  },
);

const booksSlice = createSlice({
  name: 'sach',
  initialState: trangThaiBanDau,
  reducers: {
    muonSach(state, action: PayloadAction<Sach['id']>) {
      const sach = state.danhSach.find((item) => item.id === action.payload);
      if (!sach || sach.soBanCon <= 0 || state.dangMuon.includes(sach.id)) return;
      sach.soBanCon -= 1;
      state.dangMuon.push(sach.id);
      state.thongBao = {
        loai: 'thanh-cong',
        noiDung: `Đã thêm “${sach.tenSach}” vào tủ sách của bạn.`,
      };
    },
    traSach(state, action: PayloadAction<Sach['id']>) {
      const sach = state.danhSach.find((item) => item.id === action.payload);
      if (!sach || !state.dangMuon.includes(sach.id)) return;
      sach.soBanCon += 1;
      state.dangMuon = state.dangMuon.filter((id) => id !== sach.id);
      state.thongBao = { loai: 'thanh-cong', noiDung: `Đã trả sách “${sach.tenSach}”.` };
    },
    hienThongBao(state, action: PayloadAction<ThongBaoSach>) {
      state.thongBao = action.payload;
    },
    dongThongBao(state) {
      state.thongBao = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(taiDanhSachSach.pending, (state) => {
        state.trangThai = 'dang-tai';
        state.loi = null;
      })
      .addCase(taiDanhSachSach.fulfilled, (state, action) => {
        state.trangThai = 'thanh-cong';
        state.danhSach = action.payload.map((sach) => ({
          ...sach,
          soBanCon: sach.soBanCon - (state.dangMuon.includes(sach.id) ? 1 : 0),
        }));
        state.loi = null;
      })
      .addCase(taiDanhSachSach.rejected, (state, action) => {
        state.trangThai = 'that-bai';
        state.loi = action.payload ?? 'Đã xảy ra lỗi khi tải sách. Vui lòng thử lại.';
      });
  },
});

export const { muonSach, traSach, hienThongBao, dongThongBao } = booksSlice.actions;
export default booksSlice.reducer;
