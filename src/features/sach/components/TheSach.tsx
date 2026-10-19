import { memo } from 'react';
import { ArrowUUpLeft, Plus, Prohibit } from '@phosphor-icons/react';
import type { Sach } from '../kieuSach';
import { BiaSach } from './BiaSach';

export interface TheSachProps {
  sach: Sach;
  dangMuon: boolean;
  onMuon: (id: Sach['id']) => void;
  onTra: (id: Sach['id']) => void;
}

export const TheSach = memo(function TheSach({ sach, dangMuon, onMuon, onTra }: TheSachProps) {
  const hetBan = sach.soBanCon === 0;

  return (
    <article className="ml-book-card" aria-label={sach.tenSach}>
      <BiaSach sach={sach} dangMuon={dangMuon} />
      <div className="ml-book-details">
        <div className="ml-book-category">{sach.theLoai}</div>
        <h3 className="ml-book-title">{sach.tenSach}</h3>
        <p className="ml-book-author">{sach.tacGia}</p>
        <div className="ml-book-meta">
          <span>Xuất bản {sach.namXuatBan}</span>
          <span className={`ml-stock${hetBan ? ' ml-unavailable' : ''}`}>
            {hetBan ? 'Hết bản' : `Còn ${sach.soBanCon} bản`}
          </span>
        </div>
        {dangMuon ? (
          <button
            type="button"
            className="ml-action ml-secondary"
            onClick={() => onTra(sach.id)}
            aria-label={`Trả sách ${sach.tenSach}`}
          >
            <ArrowUUpLeft aria-hidden="true" />
            Trả sách
          </button>
        ) : (
          <button
            type="button"
            className="ml-action"
            onClick={() => onMuon(sach.id)}
            disabled={hetBan}
            aria-label={`Mượn sách ${sach.tenSach}`}
          >
            {hetBan ? <Prohibit aria-hidden="true" /> : <Plus aria-hidden="true" />}Mượn sách
          </button>
        )}
      </div>
    </article>
  );
});
