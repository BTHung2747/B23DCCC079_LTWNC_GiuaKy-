import { ArrowClockwise, CircleNotch, WarningCircle } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { taiDanhSachSach } from '../features/sach/booksSlice';

export function DangTai() {
  return (
    <div className="ml-data-state" role="status">
      <CircleNotch className="ml-spinner" aria-hidden="true" />
      <p>Đang tải...</p>
    </div>
  );
}

export function TrangThaiDuLieu() {
  const dispatch = useAppDispatch();
  const loi = useAppSelector((state) => state.sach.loi);
  const trangThai = useAppSelector((state) => state.sach.trangThai);

  if (trangThai !== 'that-bai') return <DangTai />;

  return (
    <div className="ml-data-state ml-error-state" role="alert">
      <WarningCircle aria-hidden="true" />
      <h2>Chưa tải được thư viện</h2>
      <p>{loi}</p>
      <button
        type="button"
        className="ml-action"
        onClick={() => {
          void dispatch(taiDanhSachSach(false));
        }}
      >
        <ArrowClockwise aria-hidden="true" />
        Thử lại
      </button>
    </div>
  );
}
