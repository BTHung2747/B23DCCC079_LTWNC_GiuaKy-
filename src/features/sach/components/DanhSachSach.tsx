import { MagnifyingGlass } from '@phosphor-icons/react';
import type { Sach } from '../kieuSach';
import { TheSach } from './TheSach';

interface DanhSachSachProps {
  danhSach: Sach[];
  dangMuon: Sach['id'][];
  onMuon: (id: Sach['id']) => void;
  onTra: (id: Sach['id']) => void;
  onXoaBoLoc: () => void;
}

export function DanhSachSach({ danhSach, dangMuon, onMuon, onTra, onXoaBoLoc }: DanhSachSachProps) {
  return (
    <div className="ml-books">
      {danhSach.length > 0 ? (
        danhSach.map((sach) => (
          <TheSach
            key={sach.id}
            sach={sach}
            dangMuon={dangMuon.includes(sach.id)}
            onMuon={onMuon}
            onTra={onTra}
          />
        ))
      ) : (
        <div className="ml-empty">
          <MagnifyingGlass aria-hidden="true" />
          <h2>Chưa tìm thấy cuốn sách phù hợp</h2>
          <p>Thử tên sách, tác giả khác hoặc đổi thể loại.</p>
          <button type="button" className="ml-action ml-secondary" onClick={onXoaBoLoc}>
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
