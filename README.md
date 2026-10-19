# Mini Library

Ứng dụng tra cứu, mượn và trả sách cho thư viện khoa.

## Chạy dự án

Yêu cầu Node.js 22.12+ hoặc 24+ và npm.

```bash
npm install
npm run dev
```

Mở http://127.0.0.1:5173/.

## Kiểm thử và build

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

## Các trang

| Đường dẫn    | Chức năng                      |
| ------------ | ------------------------------ |
| `/`          | Tra cứu, lọc, mượn và trả sách |
| `/dang-muon` | Danh sách sách đang mượn       |
| `/stats`     | Thống kê thư viện              |

Thử lỗi API tại http://127.0.0.1:5173/?loiApi=1.
