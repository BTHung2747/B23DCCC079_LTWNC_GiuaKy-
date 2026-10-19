import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TheSach } from './TheSach';
import { SACH_MAU } from '../sachMau';

const sachMau = SACH_MAU.find((sach) => sach.id === 1);
if (!sachMau) throw new Error('Thiếu sách mẫu cho kiểm thử.');
const sach = sachMau;

describe('TheSach', () => {
  test('hiển thị tên, tác giả, thể loại, năm và số bản còn', () => {
    render(<TheSach sach={sach} dangMuon={false} onMuon={jest.fn()} onTra={jest.fn()} />);
    expect(screen.getByRole('heading', { name: 'Lập trình TypeScript' })).toBeInTheDocument();
    expect(screen.getByText('Boris Cherny')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Xuất bản 2019')).toBeInTheDocument();
    expect(screen.getByText('Còn 5 bản')).toBeInTheDocument();
  });

  test('click Mượn gọi đúng callback với đúng id', async () => {
    const user = userEvent.setup();
    const onMuon = jest.fn();
    render(<TheSach sach={sach} dangMuon={false} onMuon={onMuon} onTra={jest.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Mượn sách Lập trình TypeScript' }));
    expect(onMuon).toHaveBeenCalledTimes(1);
    expect(onMuon).toHaveBeenCalledWith(sach.id);
  });

  test('nút Mượn bị vô hiệu hóa khi hết bản và không gọi callback', async () => {
    const user = userEvent.setup();
    const onMuon = jest.fn();
    render(
      <TheSach
        sach={{ ...sach, soBanCon: 0 }}
        dangMuon={false}
        onMuon={onMuon}
        onTra={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: 'Mượn sách Lập trình TypeScript' });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onMuon).not.toHaveBeenCalled();
    expect(screen.getByText('Hết bản')).toBeInTheDocument();
  });

  test('sách đang mượn hiển thị nút Trả và gọi đúng id', async () => {
    const user = userEvent.setup();
    const onTra = jest.fn();
    render(<TheSach sach={sach} dangMuon onMuon={jest.fn()} onTra={onTra} />);
    await user.click(screen.getByRole('button', { name: 'Trả sách Lập trình TypeScript' }));
    expect(onTra).toHaveBeenCalledWith(sach.id);
    expect(screen.queryByRole('button', { name: /^Mượn sách/ })).not.toBeInTheDocument();
  });
});
