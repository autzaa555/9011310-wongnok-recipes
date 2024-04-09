'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link"
import { Menu } from "./interface/menu";
import Image from 'next/image'


async function getData() {
  const res = await fetch('http://localhost:3000/api/menus')
  return res.json()
}



export default function Home() {
  //  const data = await getData()
  const [data, setData] = useState<Menu[]>([]); // Initialize state for items
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      // console.log(fetchedData)
      setData(fetchedData);
    };
    fetchData();
  }, []); // Empty dependency array ensures data is fetched only once

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchItems = () => {
    if (searchQuery == "") {
      return data
    }
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  //ชื่อเมนู
      item.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) || //ระดับความยาก
      item.period.toLowerCase().includes(searchQuery.toLowerCase()) || //ระยะเวลา
      item.description.toLowerCase().includes(searchQuery.toLowerCase())  //วัตถุดิบ
    );
    return results;
  };

  const searchResults = searchItems();

  // ตรวจสอบผลลัพธ์การค้นหา
  // console.log(searchResults);


  return (
    <>
      <div className="container mx-auto flex justify-between items-center">
        <input
          type="text"
          placeholder="กรุณาพิมพ์ชื่อ เมนูอาหาร,วัตถุดิบ,ระยะเวลา,ความยากง่าย..."
          className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            borderTopWidth: '5px',
            marginTop: '5px'
          }} // ใช้ object syntax ในการกำหนด style
        />
      </div>
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchResults.map((blog: Menu) => (
            <div key={blog.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={`/image/${blog.img}`}
                  alt={blog.name}
                  className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{blog.name}</h2>

                  <p className="text-gray-700">ระดับ : {blog.difficulty}</p>
                  <p className="text-gray-700">ใช้เวลา : {blog.period}</p>
                

                  <br></br><Link href={`/blog/${blog.id}`} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">รายละเอียด</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


