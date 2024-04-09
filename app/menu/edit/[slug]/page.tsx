'use client'
import React, { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';
import { Menu } from "@/app/interface/menu";



async function getBlog(slug: string) {
  const response = await fetch(`http://localhost:3000/api/menus?id=${slug}`);

  if (!response.ok) {
    throw new Error('cannot fetch blog');
  }

  return response.json();
}

interface PageProps {
  params: {
    slug: string;
  };
}



function CreateItemForm({ params }: PageProps) {
  const [blog, setBlog] = useState<Menu[]>([]);

  const router = useRouter();
  const [formData, setFormData] = useState<Menu>({
    id: 0,
    name: "",
    difficulty: "",
    period: "",
    description: "",
    step: "",
    img: ""
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    if (name == "img") {
      value = value.split("\\").pop() || "";
    }
    setFormData({ ...formData, [name]: value });
  };



  const [isChangeImage, setIsChangeImage] = useState<boolean>(false)

 


  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getBlog(params.slug);
      // console.log(fetchedData)
      setFormData(fetchedData[0])

    };

    fetchData();
  }, []);




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault();

    // ทำสิ่งที่คุณต้องการกับข้อมูลใน formData
    try {
      const response = await fetch("http://localhost:3000/api/menus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      //  console.log("Submitted:", formData);
      // ล้างข้อมูลฟอร์มหลังจากส่งข้อมูลสำเร็จ
      // setFormData({ id: 0, name: "", difficulty: "", period: "", description: "", step: "", img: ""  })
      alert("อัพเดทข้อมูล เรียบร้อย!");
      router.push("/");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };





  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md overflow-hidden md:max-w-2x1">
      <div className="md:flex flex-col" >
        {/* <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-48" src={formData.img} alt="Item Image" /> 
      </div> */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อเมนู :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">ความยากง่ายขอเมนู :</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                <option value="">เลือกระดับ</option>
                <option value="ง่าย">ง่าย</option>
                <option value="ปานกลาง">ปานกลาง</option>
                <option value="ยาก">ยาก</option>
              </select>

            </div>

            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">ระยะเวลาที่ใช้ในการปรุงอาหาร :</label>
              <select id="period" name='period' value={formData.period} onChange={handleChange} className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                <option value="">เลือกประมาณเวลาที่ใช้</option>
                <option value="5 - 15 นาที">5 - 15 นาที</option>
                <option value="15 - 30 นาที">15 - 30 นาที</option>
                <option value="30 - 60 นาที">30 - 60 นาที</option>
                <option value="60+ นาที">60+ นาที</option>

              </select>
            </div>




            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">วุตถุดิบ/ส่วนผสม :</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="step" className="block text-sm font-medium text-gray-700">ขั้นตอนการทำ :</label>
              <textarea
                id="step"
                name="step"
                value={formData.step}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>






            <div>
              <label htmlFor="img" className="block text-sm font-medium text-gray-700">เลือกภาพเมนูอาหาร :</label>
              <div className="flex items-center">
                {
                  !isChangeImage ? (
                    <input
                      disabled={true}
                      type="text"
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  ) : (
                    <>
                      {/* <label htmlFor="img" className="block text-sm font-medium text-gray-700">เลือกภาพเมนูอาหาร :</label> */}
                      <input
                        disabled={false}
                        type="file"
                        id="img"
                        name="img"
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </>
                  )
                }

                {
                  !isChangeImage && <button onClick={() => { setIsChangeImage(true) }} type="button" className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">X</button>
                }

  
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              โพสต์สูตรอาหาร
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItemForm;
