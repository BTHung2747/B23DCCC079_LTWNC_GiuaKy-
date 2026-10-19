import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { CAC_THE_LOAI } from '../sach/kieuSach';
import { useBoLocStore, type TheLoaiBoLoc } from './boLocStore';

const CAC_BO_LOC: TheLoaiBoLoc[] = ['Tất cả', ...CAC_THE_LOAI];

export function BoLocSach({ soKetQua }: { soKetQua: number }) {
  const tuKhoa = useBoLocStore((state) => state.tuKhoa);
  const theLoai = useBoLocStore((state) => state.theLoai);
  const datTuKhoa = useBoLocStore((state) => state.datTuKhoa);
  const datTheLoai = useBoLocStore((state) => state.datTheLoai);

  return (
    <>
      <label className="ml-search" htmlFor="tim-sach">
        <MagnifyingGlass aria-hidden="true" />
        <span className="ml-sr">Tìm theo tên sách hoặc tác giả</span>
        <input
          id="tim-sach"
          type="search"
          autoComplete="off"
          placeholder="Tìm theo tên sách hoặc tác giả..."
          value={tuKhoa}
          onChange={(event) => datTuKhoa(event.target.value)}
        />
        {tuKhoa && (
          <button
            type="button"
            className="ml-clear"
            onClick={() => datTuKhoa('')}
            aria-label="Xóa từ khóa tìm kiếm"
          >
            <X aria-hidden="true" />
          </button>
        )}
      </label>
      <div className="ml-filter-line">
        <div className="ml-filters" role="group" aria-label="Lọc thể loại">
          {CAC_BO_LOC.map((loai) => (
            <button
              type="button"
              key={loai}
              className="ml-filter"
              aria-pressed={theLoai === loai}
              onClick={() => datTheLoai(loai)}
            >
              {loai}
            </button>
          ))}
        </div>
        <span className="ml-results-label" role="status" aria-live="polite">
          {soKetQua} đầu sách
        </span>
      </div>
    </>
  );
}
