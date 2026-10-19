export type KetQuaApi<T> = { ok: true; data: T } | { ok: false; error: string };

export function laKetQuaThanhCong<T>(
  ketQua: KetQuaApi<T>,
): ketQua is Extract<KetQuaApi<T>, { ok: true }> {
  return ketQua.ok;
}
