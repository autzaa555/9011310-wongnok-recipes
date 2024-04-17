This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## flow chart
```bash
-หนัาหลัก = แสดงเมนูอาหารทั้งหมด เมื่อคลิ๊ก รายละเอียด จะไปที่ หน้ารายละเอียด

--ช่องค้นหา = ค้นหาชื่อเมนูอาหาร วัตถุดิบ ระยะเวลา ระดับความยากง่าย

--หน้ารายละเอียด = แสดงข้อมูลต่างๆ ภาพเมนู ชื่อเมนู ระยะเวลา ความยากง่าย วัตุดิบ ขั้นตอนการทำ

---กลับ = กลับไปที่หน้าหลัก

---ลบ = ลบข้อมูลทั้งหมด

---แก้ไข = แก้ไขรายละเอียดต่างๆ ชื่อเมนู ระยะเวลา ความยากง่าย วัตุดิบ ขั้นตอนการทำ  ภาพเมนู

-สร้างเมนู =สร้างข้อมูล ชื่อเมนู ระยะเวลา ความยากง่าย วัตุดิบ ขั้นตอนการทำ ภาพเมนู

-เข้าสู้ระบบ = เมื่อล็อคอินจึงจะสามารถโพสต์ ลบ แก้ไข ได้

```
## ขั้นตอนการรันโปรแกรม

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
