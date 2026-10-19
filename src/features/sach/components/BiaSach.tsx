import type { CSSProperties } from 'react';
import { BookmarkSimple } from '@phosphor-icons/react';
import type { ThongTinBiaSach } from '../kieuSach';

type MauBia = CSSProperties &
  Record<'--ml-cover-color' | '--ml-cover-ink' | '--ml-cover-back', string>;

interface BiaSachProps {
  sach: ThongTinBiaSach;
  nho?: boolean;
  dangMuon?: boolean;
}

export function BiaSach({ sach, nho = false, dangMuon = false }: BiaSachProps) {
  const bia = sach.biaSach;
  const style: MauBia = {
    '--ml-cover-color': bia.mauBia,
    '--ml-cover-ink': bia.mauChu,
    '--ml-cover-back': `light-dark(${bia.nenSang}, ${bia.nenToi})`,
  };

  return (
    <div className={nho ? 'ml-loan-cover' : 'ml-cover-stage'} style={style} aria-hidden="true">
      <div className={`ml-cover-book ml-cover-${bia.kieu}`}>
        <span className="ml-cover-publisher">THE READING COLLECTION</span>
        <span className="ml-cover-title">
          {bia.dongTieuDe.map((dong) => (
            <span className="ml-cover-title-line" key={dong}>
              {dong}
            </span>
          ))}
        </span>
        <span className="ml-cover-symbol">{bia.kyHieu}</span>
        <span className="ml-cover-author">{bia.tenTacGia}</span>
      </div>
      {!nho && dangMuon && (
        <span className="ml-loaned-label">
          <BookmarkSimple />
          Đang mượn
        </span>
      )}
    </div>
  );
}
