import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { taoStore, type AppStore } from '../../../app/store';
import { taiDanhSachSach } from '../booksSlice';
import { SACH_MAU } from '../sachMau';
import { TrangDangMuon } from './TrangDangMuon';

function hienTrang(store: AppStore) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <TrangDangMuon />
      </MemoryRouter>
    </Provider>,
  );
}

test('đang tải API không hiển thị nhầm trạng thái tủ sách rỗng', () => {
  const store = taoStore();
  store.dispatch(taiDanhSachSach.pending('dang-tai', false));
  hienTrang(store);
  expect(screen.getByText('Đang tải...')).toBeInTheDocument();
  expect(screen.queryByText('Tủ sách đang chờ bạn')).not.toBeInTheDocument();
});

test('hiển thị lỗi API và thử lại thành công trên trang đang mượn', async () => {
  jest.useFakeTimers();
  try {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const store = taoStore();
    store.dispatch(taiDanhSachSach.rejected(null, 'loi-api', true, 'Không tải được sách'));
    hienTrang(store);
    expect(screen.getByRole('alert')).toHaveTextContent('Không tải được sách');
    expect(screen.queryByText('Tủ sách đang chờ bạn')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Thử lại' }));
    expect(screen.getByText('Đang tải...')).toBeInTheDocument();
    await act(() => jest.advanceTimersByTimeAsync(500));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Tủ sách đang chờ bạn')).toBeInTheDocument();
    expect(store.getState().sach.danhSach).toHaveLength(SACH_MAU.length);
  } finally {
    jest.useRealTimers();
  }
});

test('chỉ hiển thị tủ sách rỗng sau khi API tải thành công', () => {
  const store = taoStore();
  store.dispatch(taiDanhSachSach.fulfilled(SACH_MAU, 'da-tai', false));
  hienTrang(store);
  expect(screen.getByText('Tủ sách đang chờ bạn')).toBeInTheDocument();
  expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument();
});
