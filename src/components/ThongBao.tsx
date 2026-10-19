import { useEffect } from 'react';
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { dongThongBao } from '../features/sach/booksSlice';

export function ThongBao() {
  const dispatch = useAppDispatch();
  const thongBao = useAppSelector((state) => state.sach.thongBao);

  useEffect(() => {
    if (!thongBao) return;
    const timer = setTimeout(() => dispatch(dongThongBao()), 5000);
    return () => clearTimeout(timer);
  }, [thongBao, dispatch]);

  if (!thongBao) return null;
  const canhBao = thongBao.loai === 'canh-bao';
  return (
    <div
      className={`ml-toast${canhBao ? ' ml-toast-warning' : ''}`}
      role={canhBao ? 'alert' : 'status'}
    >
      {canhBao ? <WarningCircle aria-hidden="true" /> : <CheckCircle aria-hidden="true" />}
      <span>{thongBao.noiDung}</span>
      <button
        type="button"
        className="ml-clear"
        onClick={() => dispatch(dongThongBao())}
        aria-label="Đóng thông báo"
      >
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
