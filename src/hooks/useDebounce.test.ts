import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('chỉ cập nhật từ khóa cuối cùng sau đủ 300ms', () => {
    const { result, rerender } = renderHook(({ tuKhoa }) => useDebounce(tuKhoa, 300), {
      initialProps: { tuKhoa: '' },
    });
    rerender({ tuKhoa: 'rea' });
    act(() => jest.advanceTimersByTime(200));
    rerender({ tuKhoa: 'react' });
    act(() => jest.advanceTimersByTime(299));
    expect(result.current).toBe('');
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe('react');
  });

  test('generic hỗ trợ object và dọn timer khi unmount', () => {
    const { result, rerender, unmount } = renderHook(({ giaTri }) => useDebounce(giaTri, 300), {
      initialProps: { giaTri: { trang: 1 } },
    });
    rerender({ giaTri: { trang: 2 } });
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toEqual({ trang: 2 });
    rerender({ giaTri: { trang: 3 } });
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  test('lưu giá trị kiểu hàm thay vì thực thi hàm như state updater', () => {
    const hamDau = jest.fn(() => 1);
    const hamSau = jest.fn(() => 2);
    const { result, rerender } = renderHook(({ giaTri }) => useDebounce(giaTri, 300), {
      initialProps: { giaTri: hamDau },
    });
    expect(result.current).toBe(hamDau);
    rerender({ giaTri: hamSau });
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe(hamSau);
    expect(hamDau).not.toHaveBeenCalled();
    expect(hamSau).not.toHaveBeenCalled();
  });
});
