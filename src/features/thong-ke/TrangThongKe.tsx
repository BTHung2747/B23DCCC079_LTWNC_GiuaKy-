import { useMemo } from 'react';
import { ArrowRight, BookmarkSimple, Books, Stack } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { TieuDeTrang } from '../../components/TieuDeTrang';
import { TrangThaiDuLieu } from '../../components/TrangThaiDuLieu';
import { CAC_THE_LOAI, SO_SACH_MUON_TOI_DA, type ThongKeTheLoai } from '../sach/kieuSach';
import { loiNhacMuon } from '../sach/tienIchSach';

export default function TrangThongKe() {
  const { danhSach, dangMuon, trangThai } = useAppSelector((state) => state.sach);
  const thongKe = useMemo(
    () =>
      danhSach.reduce<ThongKeTheLoai>(
        (ketQua, sach) => {
          ketQua[sach.theLoai] += 1;
          return ketQua;
        },
        { CNTT: 0, 'Kinh tế': 0, 'Ngoại ngữ': 0 },
      ),
    [danhSach],
  );

  return (
    <>
      <TieuDeTrang
        nhan="THƯ VIỆN QUA NHỮNG CON SỐ"
        tieuDe="Tổng quan thư viện"
        moTa="Một góc nhìn về kho sách và hoạt động mượn của bạn."
      />
      {trangThai !== 'thanh-cong' ? (
        <TrangThaiDuLieu />
      ) : (
        <>
          <div className="ml-stat-cards">
            <div className="ml-stat-card">
              <div className="ml-stat-top">
                Tổng đầu sách
                <Books aria-hidden="true" />
              </div>
              <div className="ml-stat-value">
                {String(danhSach.length).padStart(2, '0')}
                <small>đầu sách</small>
              </div>
              <p className="ml-stat-note">Trong thư viện của khoa</p>
            </div>
            <div className="ml-stat-card">
              <div className="ml-stat-top">
                Thể loại sách
                <Stack aria-hidden="true" />
              </div>
              <div className="ml-stat-value">
                03<small>thể loại</small>
              </div>
              <p className="ml-stat-note">CNTT, Kinh tế, Ngoại ngữ</p>
            </div>
            <div className="ml-stat-card">
              <div className="ml-stat-top">
                Bạn đang mượn
                <BookmarkSimple aria-hidden="true" />
              </div>
              <div className="ml-stat-value">
                {String(dangMuon.length).padStart(2, '0')}
                <small>cuốn sách</small>
              </div>
              <p className="ml-stat-note">Tối đa 3 cuốn cùng lúc</p>
            </div>
          </div>
          <div className="ml-stats-layout">
            <section className="ml-panel" aria-labelledby="tieu-de-thong-ke">
              <h2 id="tieu-de-thong-ke">Đầu sách theo thể loại</h2>
              <p className="ml-panel-description">
                Tỷ trọng trong tổng số {danhSach.length} đầu sách
              </p>
              <div className="ml-bars">
                {CAC_THE_LOAI.map((loai) => {
                  const tyLe = danhSach.length ? (thongKe[loai] / danhSach.length) * 100 : 0;
                  return (
                    <div className="ml-bar-row" key={loai}>
                      <div className="ml-bar-label">
                        <span>{loai === 'CNTT' ? 'Công nghệ thông tin' : loai}</span>
                        <span className="ml-bar-value">
                          {thongKe[loai]} đầu sách · {Math.round(tyLe)}%
                        </span>
                      </div>
                      <div className="ml-bar-track" aria-hidden="true">
                        <div className="ml-bar-fill" style={{ width: `${tyLe}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="ml-panel ml-ring-area">
              <h2>Tình trạng mượn của bạn</h2>
              <div
                className="ml-ring"
                style={{
                  background: `conic-gradient(var(--ml-accent) ${(dangMuon.length / SO_SACH_MUON_TOI_DA) * 360}deg, var(--ml-soft) 0deg)`,
                }}
                role="img"
                aria-label={`Đang mượn ${dangMuon.length} trên tối đa 3 cuốn`}
              >
                <div className="ml-ring-center">
                  <strong>
                    {dangMuon.length}
                    <span className="ml-ring-denominator"> / 3</span>
                  </strong>
                  <span>CUỐN ĐANG MƯỢN</span>
                </div>
              </div>
              <p className="ml-ring-note">{loiNhacMuon(dangMuon.length)}</p>
              <Link to="/dang-muon" className="ml-action ml-secondary">
                Xem sách đang mượn
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>
          </div>
        </>
      )}
    </>
  );
}
