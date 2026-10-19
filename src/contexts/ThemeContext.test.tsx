import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from '../hooks/useTheme';

function NutTheme() {
  const { theme, doiTheme } = useTheme();
  return <button onClick={doiTheme}>{theme}</button>;
}

test('khôi phục theme đã lưu, đổi giao diện và lưu lựa chọn mới', async () => {
  const user = userEvent.setup();
  localStorage.setItem('mini-library-theme', 'dark');
  document.documentElement.dataset.theme = 'light';
  render(
    <ThemeProvider>
      <NutTheme />
    </ThemeProvider>,
  );
  expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument();
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  await user.click(screen.getByRole('button', { name: 'dark' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(localStorage.getItem('mini-library-theme')).toBe('light');
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});
