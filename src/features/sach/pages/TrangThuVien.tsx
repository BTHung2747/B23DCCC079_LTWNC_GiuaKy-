import { useCallback, useMemo, useState } from 'react';
import { ArrowRight, CaretUp } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { TieuDeTrang } from '../../../components/TieuDeTrang';
import { TrangThaiDuLieu } from '../../../components/TrangThaiDuLieu';
import { useDebounce } from '../../../hooks/useDebounce';
import { BoLocSach } from '../../bo-loc/BoLocSach';
import { useBoLocStore } from '../../bo-loc/boLocStore';
import { muonSach, traSach } from '../booksSlice';
import { DanhSachSach } from '../components/DanhSachSach';
import { KhungDangMuon } from '../components/KhungDangMuon';

export function TrangThuVien() {
  const dispatch = useAppDispatch();
  const { danhSach, dangMuon, trangThai } = useAppSelector((state) => state.sach);
  const tuKhoa = useBoLocStore((state) => state.tuKhoa);
  const theLoai = useBoLocStore((state) => state.theLoai);
  const xoaBoLoc = useBoLocStore((state) => state.xoaBoLoc);
  const tuKhoaDaDebounce = useDebounce(tuKhoa, 300);
  const [xemTatCa, datXemTatCa] = useState(false);

  const danhSachDaLoc = useMemo(() => {
    const tuTim = tuKhoaDaDebounce.trim().toLocaleLowerCase('vi');
    return danhSach.filter(
      (sach) =>
        (theLoai === 'Tất cả' || sach.theLoai === theLoai) &&
        (!tuTim ||
          sach.tenSach.toLocaleLowerCase('vi').includes(tuTim) ||
          sach.tacGia.toLocaleLowerCase('vi').includes(tuTim)),
    );
  }, [danhSach, tuKhoaDaDebounce, theLoai]);

  const danhSachHienThi = useMemo(
    () => (xemTatCa ? danhSachDaLoc : danhSachDaLoc.slice(0, 6)),
    [danhSachDaLoc, xemTatCa],
  );
  const xuLyMuon = useCallback(
    (id: number) => {
      dispatch(muonSach(id));
    },
    [dispatch],
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
        nhan="MỞ SÁCH, MỞ THÊM GÓC NHÌN"
        tieuDe="Khám phá thư viện"
        moTa="Tìm cuốn sách tiếp theo cho hành trình học tập của bạn."
      >
        {trangThai === 'thanh-cong' && (
          <div className="ml-heading-stamp">
            <strong>{danhSach.length}</strong> đầu sách · <strong>3</strong> thể loại
          </div>
        )}
      </TieuDeTrang>
      {trangThai !== 'thanh-cong' ? (
        <TrangThaiDuLieu />
      ) : (
        <div className="ml-catalog-layout">
          <div className="ml-catalog-main">
            <BoLocSach soKetQua={danhSachDaLoc.length} />
            <DanhSachSach
              danhSach={danhSachHienThi}
              dangMuon={dangMuon}
              onMuon={xuLyMuon}
              onTra={xuLyTra}
              onXoaBoLoc={xoaBoLoc}
            />
            {danhSachDaLoc.length > 0 && (
              <div className="ml-catalog-footer">
                <span>
                  Đang hiển thị {danhSachHienThi.length} / {danhSachDaLoc.length} đầu sách
                </span>
                {danhSachDaLoc.length > 6 && (
                  <button
                    type="button"
                    className="ml-more"
                    onClick={() => datXemTatCa((hienTai) => !hienTai)}
                  >
                    {xemTatCa ? 'Thu gọn' : `Xem thêm ${danhSachDaLoc.length - 6} đầu sách`}
                    {xemTatCa ? <CaretUp aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
                  </button>
                )}
              </div>
            )}
          </div>
          <KhungDangMuon />
        </div>
      )}
    </>
  );
}
