import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { BoCucChinh } from './components/BoCucChinh';
import { DangTai } from './components/TrangThaiDuLieu';
import { taiDanhSachSach } from './features/sach/booksSlice';
import { TrangDangMuon } from './features/sach/pages/TrangDangMuon';
import { TrangThuVien } from './features/sach/pages/TrangThuVien';

const TrangThongKe = lazy(() => import('./features/thong-ke/TrangThongKe'));

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const giaLapLoi = new URLSearchParams(window.location.search).get('loiApi') === '1';
    void dispatch(taiDanhSachSach(giaLapLoi));
  }, [dispatch]);

  return (
    <BoCucChinh>
      <Suspense fallback={<DangTai />}>
        <Routes>
          <Route path="/" element={<TrangThuVien />} />
          <Route path="/dang-muon" element={<TrangDangMuon />} />
          <Route path="/stats" element={<TrangThongKe />} />
          <Route
            path="*"
            element={
              <div className="ml-empty">
                <h1>Trang này chưa có trên kệ</h1>
                <p>Đường dẫn bạn tìm không tồn tại.</p>
                <Link className="ml-action" to="/">
                  Về thư viện sách
                </Link>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BoCucChinh>
  );
}
