import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

export type Theme = 'light' | 'dark';
export interface GiaTriTheme {
  theme: Theme;
  doiTheme: () => void;
}

export const ThemeContext = createContext<GiaTriTheme | undefined>(undefined);

function layThemeBanDau(): Theme {
  try {
    const themeDaLuu = localStorage.getItem('mini-library-theme');
    if (themeDaLuu === 'light' || themeDaLuu === 'dark') return themeDaLuu;
  } catch {}
  const themeTrenTrang = document.documentElement.dataset.theme;
  if (themeTrenTrang === 'light' || themeTrenTrang === 'dark') return themeTrenTrang;
  return 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, datTheme] = useState<Theme>(layThemeBanDau);
  const doiTheme = useCallback(
    () => datTheme((hienTai) => (hienTai === 'light' ? 'dark' : 'light')),
    [],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('mini-library-theme', theme);
    } catch {}
  }, [theme]);

  const value = useMemo<GiaTriTheme>(() => ({ theme, doiTheme }), [theme, doiTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
