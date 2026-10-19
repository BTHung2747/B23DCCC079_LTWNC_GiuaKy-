import { BookOpen, BookmarkSimple, Books, ChartBar, Moon, Sun } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { SO_SACH_MUON_TOI_DA } from '../features/sach/kieuSach';
import { loiNhacMuon } from '../features/sach/tienIchSach';
import { useTheme } from '../hooks/useTheme';

export function ThanhDieuHuong() {
  const soLuong = useAppSelector((state) => state.sach.dangMuon.length);
  const { theme, doiTheme } = useTheme();

  return (
    <aside className="ml-sidebar" aria-label="Điều hướng chính">
      <LinkThuongHieu />
      <div className="ml-nav-label">KHÔNG GIAN CỦA BẠN</div>
      <nav className="ml-nav" aria-label="Các trang">
        <NavLink to="/" end className="ml-nav-item">
          <Books aria-hidden="true" />
          <span>Thư viện sách</span>
        </NavLink>
        <NavLink
          to="/dang-muon"
          className="ml-nav-item"
          aria-label={`Sách đang mượn: ${soLuong} cuốn`}
        >
          <BookmarkSimple aria-hidden="true" />
          <span>Đang mượn</span>
          <span className="ml-nav-badge">{soLuong}</span>
        </NavLink>
        <NavLink to="/stats" className="ml-nav-item">
          <ChartBar aria-hidden="true" />
          <span>Thống kê</span>
        </NavLink>
      </nav>
      <div className="ml-side-loans">
        <div className="ml-side-loans-label">
          <span>Sách đang mượn</span>
          <strong>
            {soLuong} / {SO_SACH_MUON_TOI_DA}
          </strong>
        </div>
        <div
          className="ml-capacity"
          role="meter"
          aria-label="Số sách đang mượn"
          aria-valuenow={soLuong}
          aria-valuemin={0}
          aria-valuemax={SO_SACH_MUON_TOI_DA}
        >
          {[1, 2, 3].map((viTri) => (
            <span key={`vi-tri-${viTri}`} className={viTri <= soLuong ? 'ml-filled' : ''} />
          ))}
        </div>
        <div className="ml-side-note">{loiNhacMuon(soLuong)}</div>
      </div>
      <div className="ml-sidebar-bottom">
        <button
          type="button"
          className="ml-theme"
          onClick={doiTheme}
          aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}
        >
          {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          <span>Giao diện {theme === 'light' ? 'tối' : 'sáng'}</span>
        </button>
        <div className="ml-person">
          <div className="ml-avatar">BH</div>
          <div>
            <strong>Bùi Tuấn Hưng</strong>
            <small>Góc đọc của bạn</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LinkThuongHieu() {
  return (
    <div className="ml-brand">
      <div className="ml-brand-mark">
        <BookOpen aria-hidden="true" />
      </div>
      <div>
        <div className="ml-brand-name">
          mini library<span className="ml-brand-dot">.</span>
        </div>
        <div className="ml-brand-sub">THƯ VIỆN CỦA KHOA</div>
      </div>
    </div>
  );
}
