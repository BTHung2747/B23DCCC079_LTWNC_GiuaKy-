import { useEffect, type PropsWithChildren } from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { ThanhDieuHuong } from './ThanhDieuHuong';
import { ThongBao } from './ThongBao';

const TEN_TRANG: Record<string, string> = {
  '/': 'Thư viện sách',
  '/dang-muon': 'Sách đang mượn',
  '/stats': 'Thống kê',
};

export function BoCucChinh({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const tenTrang = TEN_TRANG[pathname] ?? 'Không tìm thấy trang';
  useEffect(() => {
    document.title = `${tenTrang} · Mini Library`;
  }, [tenTrang]);

  return (
    <div className="ml-app">
      <a className="ml-skip-link" href="#noi-dung">
        Đến nội dung chính
      </a>
      <div className="ml-shell">
        <ThanhDieuHuong />
        <div className="ml-main">
          <header className="ml-topbar">
            <div className="ml-breadcrumb">
              <span>Thư viện khoa</span>
              <CaretRight aria-hidden="true" />
              <span className="ml-breadcrumb-current">{tenTrang}</span>
            </div>
            <div className="ml-top-status">
              <span className="ml-status-dot" />
              Học hỏi mỗi ngày
            </div>
          </header>
          <main className="ml-content" id="noi-dung">
            {children}
          </main>
          <ThongBao />
        </div>
      </div>
    </div>
  );
}
