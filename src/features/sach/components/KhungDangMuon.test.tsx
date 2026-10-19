import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { taoStore } from '../../../app/store';
import { muonSach, taiDanhSachSach } from '../booksSlice';
import { SACH_MAU } from '../sachMau';
import { KhungDangMuon } from './KhungDangMuon';

function taoKhung(dangMuon: number[] = []) {
  const store = taoStore();
  store.dispatch(taiDanhSachSach.fulfilled(SACH_MAU, 'test-khung-muon', false));
  dangMuon.forEach((id) => store.dispatch(muonSach(id)));
  render(
    <Provider store={store}>
      <MemoryRouter>
        <KhungDangMuon />
      </MemoryRouter>
    </Provider>,
  );
  return store;
}

test('hiển thị trạng thái chưa mượn và liên kết đến tủ sách', () => {
  taoKhung();
  expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '0');
  expect(screen.getByText('Còn chỗ cho 3 cuốn sách.')).toBeInTheDocument();
  expect(screen.getByText(/Bạn chưa mượn cuốn sách nào/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Xem sách đang mượn' })).toHaveAttribute(
    'href',
    '/dang-muon',
  );
});

test('trả nhanh cập nhật danh sách, giới hạn và hoàn lại số bản trong Redux', async () => {
  const user = userEvent.setup();
  const store = taoKhung([1, 4]);
  expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '2');
  expect(screen.getByRole('heading', { name: 'English Grammar in Use' })).toBeInTheDocument();
  await user.click(
    screen.getByRole('button', { name: 'Trả sách English Grammar in Use từ khung đang mượn' }),
  );
  expect(screen.queryByRole('heading', { name: 'English Grammar in Use' })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Lập trình TypeScript' })).toBeInTheDocument();
  expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '1');
  expect(screen.getByText('Còn chỗ cho 2 cuốn sách.')).toBeInTheDocument();
  expect(store.getState().sach.dangMuon).toEqual([1]);
  expect(store.getState().sach.danhSach.find((sach) => sach.id === 4)?.soBanCon).toBe(3);
});
