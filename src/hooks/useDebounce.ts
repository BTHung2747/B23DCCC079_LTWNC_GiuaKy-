import { useEffect, useState } from 'react';

export function useDebounce<T>(giaTri: T, doTre = 300): T {
  const [giaTriDaDebounce, datGiaTriDaDebounce] = useState<T>(() => giaTri);

  useEffect(() => {
    const timer = setTimeout(() => datGiaTriDaDebounce(() => giaTri), doTre);
    return () => clearTimeout(timer);
  }, [giaTri, doTre]);

  return giaTriDaDebounce;
}
