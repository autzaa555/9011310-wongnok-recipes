'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Item } from "@/app/interface/item";




export default function Navbar(){




  return (
    <nav className="bg-purple-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* <div className="flex space-x-1">
          <input
            type="text"
            placeholder="กรุณาพิมพ์ชื่ออาหาร"
            className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="text-white font-bold" style={{ paddingTop: 5 }}>
            <Link href={`/search/${searchQuery}`}>ค้นหา</Link>
          </div>
        </div> */}

        <div className="flex space-x-10">
          <Link href="/" className="text-white">
            หน้าแรก
          </Link>

          <Link href="/menu/create" className="text-white">
            สร้างเมนู
          </Link>

          <Link href="/" className="text-white">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </nav>
  );
};









// import Link from "next/link"
// const Navbar = () => {
//   return ( 
//     <nav className="bg-purple-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
       
//       <div className="flex space-x-1">
//         <input type="text" placeholder="กรุณาพิมพ์ชื่ออาหาร" className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none" />
//          <div className="text-white font-bold"style={{ paddingTop: 5 }} >   
//            <Link href="/" 
//             >ค้นหา</Link>  
//         </div>
//         </div>

//         <div className="flex space-x-10">
//           <Link href="/"
//              className="text-white">หน้าแรก</Link>
          
//           <Link href="/menu"
//              className="text-white">เมนู</Link>

//            <Link href="/"
//              className="text-white">เข้าสู่ระบบ</Link>
          
//         </div>

//       </div>
//     </nav>

//   );
// };
// export default Navbar;