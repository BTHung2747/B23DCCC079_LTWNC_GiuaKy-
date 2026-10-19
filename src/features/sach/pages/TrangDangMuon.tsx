import { useCallback, useMemo } from 'react';
import { ArrowRight, ArrowUUpLeft, BookOpen, Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { TieuDeTrang } from '../../../components/TieuDeTrang';
import { TrangThaiDuLieu } from '../../../components/TrangThaiDuLieu';
import { traSach } from '../booksSlice';
import { BiaSach } from '../components/BiaSach';
import { loiNhacMuon } from '../tienIchSach';

export function TrangDangMuon() {
  const dispatch = useAppDispatch();
  const danhSach = useAppSelector((state) => state.sach.danhSach);
  const dangMuon = useAppSelector((state) => state.sach.dangMuon);
  const trangThai = useAppSelector((state) => state.sach.trangThai);
  const sachDangMuon = useMemo(
    () => danhSach.filter((sach) => dangMuon.includes(sach.id)),
    [danhSach, dangMuon],
  );
  const xuLyTra = useCallback(
    (id: number) => {
      dispatch(traSach(id));
    },
    [dispatch],
  );

  return (
    <>
      <TieuDeTrang
        nhan="GÓC ĐỌC CÁ NHÂN"
        tieuDe="Tủ sách của bạn"
        moTa="Những cuốn sách đang đồng hành cùng bạn."
      />
      {trangThai !== 'thanh-cong' ? (
        <TrangThaiDuLieu />
      ) : (
        <>
          <div className="ml-loan-banner">
            <div>
              <div className="ml-banner-label">SÁCH ĐANG MƯỢN</div>
              <div className="ml-banner-number">
                {String(dangMuon.length).padStart(2, '0')} <span>/ 03 cuốn</span>
              </div>
              <p className="ml-banner-note">{loiNhacMuon(dangMuon.length)}</p>
            </div>
            <div className="ml-book-slots" aria-hidden="true">
              {[1, 2, 3].map((viTri) => (
                <div
                  key={`vi-tri-muon-${viTri}`}
                  className={`ml-book-slot${viTri <= dangMuon.length ? ' ml-occupied' : ''}`}
                >
                  {viTri <= dangMuon.length ? <BookOpen /> : <Plus />}
                </div>
              ))}
            </div>
          </div>
          <div className="ml-section-heading">
            <h2>Sách đang mượn</h2>
            <span className="ml-section-count">{dangMuon.length} cuốn sách</span>
          </div>
          <div className="ml-loan-list">
            {sachDangMuon.length ? (
              sachDangMuon.map((sach) => (
                <article className="ml-loan-row" key={sach.id}>
                  <BiaSach sach={sach} nho />
                  <div className="ml-loan-text">
                    <h3>{sach.tenSach}</h3>
                    <p>{sach.tacGia}</p>
                    <div className="ml-loan-tags">
                      <span className="ml-loan-tag">{sach.theLoai}</span>
                      <span>Xuất bản {sach.namXuatBan}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-action ml-secondary"
                    onClick={() => xuLyTra(sach.id)}
                    aria-label={`Trả sách ${sach.tenSach}`}
                  >
                    <ArrowUUpLeft aria-hidden="true" />
                    Trả sách
                  </button>
                </article>
              ))
            ) : (
              <div className="ml-empty">
                <BookOpen aria-hidden="true" />
                <h2>Tủ sách đang chờ bạn</h2>
                <p>Khám phá thư viện và chọn một cuốn sách để bắt đầu.</p>
                <Link to="/" className="ml-action">
                  Khám phá sách
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          <div className="ml-loan-bottom">
            <Link className="ml-action" to="/">
              <Plus aria-hidden="true" />
              Khám phá thêm sách
            </Link>
          </div>
        </>
      )}
    </>
  );
}
