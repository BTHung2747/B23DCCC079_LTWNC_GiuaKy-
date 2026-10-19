import type { ReactNode } from 'react';

interface TieuDeTrangProps {
  nhan: string;
  tieuDe: string;
  moTa: string;
  children?: ReactNode;
}

export function TieuDeTrang({ nhan, tieuDe, moTa, children }: TieuDeTrangProps) {
  return (
    <div className="ml-heading">
      <div>
        <div className="ml-eyebrow">{nhan}</div>
        <h1>{tieuDe}</h1>
        <p className="ml-description">{moTa}</p>
      </div>
      {children}
    </div>
  );
}
