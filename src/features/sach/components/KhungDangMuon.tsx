import { useCallback, useMemo, useState } from 'react';
import { ArrowRight, ArrowUUpLeft, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { traSach } from '../booksSlice';
import { SO_SACH_MUON_TOI_DA } from '../kieuSach';
import { loiNhacMuon } from '../tienIchSach';
import { BiaSach } from './BiaSach';
import './KhungDangMuon.css';

export function KhungDangMuon() {
  const dispatch = useAppDispatch();
  const danhSach = useAppSelector((state) => state.sach.danhSach);
  const dangMuon = useAppSelector((state) => state.sach.dangMuon);
  const [moRong, datMoRong] = useState(false);
  const sachDangMuon = useMemo(
    () =>
      dangMuon.flatMap((id) => {
        const sach = danhSach.find((item) => item.id === id);
        return sach ? [sach] : [];
      }),
    [danhSach, dangMuon],
  );
  const xuLyTra = useCallback(
    (id: number) => {
      dispatch(traSach(id));
    },
    [dispatch],
  );

  return (
    <aside className="ml-quick-loans" aria-labelledby="muon-nhanh-title" data-expanded={moRong}>
      <div className="ml-quick-loans-header">
        <h2 id="muon-nhanh-title">Đang mượn</h2>
        <strong aria-live="polite" aria-atomic="true">
          {dangMuon.length} / {SO_SACH_MUON_TOI_DA}
        </strong>
        <button
          type="button"
          className="ml-quick-loans-toggle"
          aria-expanded={moRong}
          aria-controls="danh-sach-muon-nhanh"
          aria-label={`${moRong ? 'Thu gọn' : 'Mở'} danh sách đang mượn nhanh`}
          onClick={() => datMoRong((hienTai) => !hienTai)}
        >
          {moRong ? <CaretUp aria-hidden="true" /> : <CaretDown aria-hidden="true" />}
        </button>
      </div>
      <div
        className="ml-quick-loans-capacity"
        role="meter"
        aria-label="Số sách đang mượn trong khung nhanh"
        aria-valuenow={dangMuon.length}
        aria-valuemin={0}
        aria-valuemax={SO_SACH_MUON_TOI_DA}
      >
        {[1, 2, 3].map((viTri) => (
          <span key={`cho-muon-${viTri}`} className={viTri <= dangMuon.length ? 'ml-filled' : ''} />
        ))}
      </div>
      <p className="ml-quick-loans-note">
        {dangMuon.length >= SO_SACH_MUON_TOI_DA
          ? loiNhacMuon(dangMuon.length)
          : `Còn chỗ cho ${SO_SACH_MUON_TOI_DA - dangMuon.length} cuốn sách.`}
      </p>
      <div className="ml-quick-loans-body" id="danh-sach-muon-nhanh">
        <div className="ml-quick-loans-list">
          {sachDangMuon.length ? (
            sachDangMuon.map((sach) => (
              <article className="ml-quick-loans-book" key={sach.id}>
                <BiaSach sach={sach} nho />
                <div className="ml-quick-loans-copy">
                  <h3>{sach.tenSach}</h3>
                  <p>{sach.tacGia}</p>
                  <button
                    type="button"
                    className="ml-quick-loans-return"
                    aria-label={`Trả sách ${sach.tenSach} từ khung đang mượn`}
                    onClick={() => xuLyTra(sach.id)}
                  >
                    Trả sách
                    <ArrowUUpLeft aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="ml-quick-loans-empty">
              Bạn chưa mượn cuốn sách nào. Chọn một cuốn trong thư viện để bắt đầu.
            </p>
          )}
        </div>
        <div className="ml-quick-loans-footer">
          <Link to="/dang-muon">
            Xem sách đang mượn
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
