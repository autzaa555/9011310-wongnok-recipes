
  // 'use server'
'use client'
import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { Menu } from "@/app/interface/menu";
import { SessionProvider, useSession } from "next-auth/react";
import { authConfig, loginIsRequiredClient, loginIsRequiredServer } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next"
import SignInPage from "@/app/login/page";
// import { authConfig } from '@/app/lib/auth'





 function CreateItemForm(){

  const router = useRouter();
  const session = useSession();
    useEffect(() => {
    //  console.log(session) 
     if (session.status == "unauthenticated" ){ 
      alert("กรุณาเข้าสู่ระบบก่อน!");
     router.push("/login");
     }
    }, []);





  const [formData, setFormData] = useState<Menu>({
    id: 0,
    name: "",
    difficulty: "",
    period: "",
    description: "",
    step: "",
    img: ""
  });


 const test = () => {
  console.log(formData.img)
 }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });


  // If the input is for 'img', extract the filename from the path
    if (name == "img") {
      value = value.split("\\").pop() || "";
    }
       // Update the form data state with the updated value
    setFormData({ ...formData, [name]: value });

  };




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ทำสิ่งที่คุณต้องการกับข้อมูลใน formData
    try {





      const response = await fetch("http://localhost:3000/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // console.log("Submitted:", formData);

      // ล้างข้อมูลฟอร์มหลังจากส่งข้อมูลสำเร็จ// เคลียร์ฟอร์มหลังจาก submit
      // setFormData({ id: 0, name: "", difficulty: "", period: "", description: "", step: "", img: "" })
      alert("โพสต์เมนูอาหาร เรียบร้อย!");
      // Redirect.("/");
      router.push("/");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // console.log("Create FormData: ", formData)


  return (
 
    
    <div className="max-w-md mx-auto mt-20 bg-gradient-to-r from-violet-500 to-yellow-600 rounded-xl shadow-md overflow-hidden md:max-w-2x1 ">
      <div className="md:flex flex-col " >
 
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 ">ชื่อเมนู :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ชื่อเมนู"
                required
                className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-bold text-gray-700">ความยากง่ายขอเมนู :</label>
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
              <label htmlFor="period" className="block text-sm font-bold text-gray-700">ระยะเวลาที่ใช้ในการปรุงอาหาร :</label>
              <select id="period" name='period' value={formData.period} onChange={handleChange} className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                <option value="">เลือกประมาณเวลาที่ใช้</option>
                <option value="5 - 15 นาที">5 - 15 นาที</option>
                <option value="15 - 30 นาที">15 - 30 นาที</option>
                <option value="30 - 60 นาที">30 - 60 นาที</option>
                <option value="60+ นาที">60+ นาที</option>

              </select>
            </div>




            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700">วุตถุดิบ/ส่วนผสม :</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="วุตถุดิบ/ส่วนผสม"
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="step" className="block text-sm font-bold text-gray-700">ขั้นตอนการทำ :</label>
              <textarea
                id="step"
                name="step"
                value={formData.step}
                onChange={handleChange}
                placeholder="ขั้นตอนการทำ"
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="img" className="block text-sm font-bold text-gray-700">เลือกภาพเมนูอาหาร :</label>
              <input
                type="file"
                // type="text"
                accept="image/png, image/jpeg"
                id="img"
                name="img"
                // value={formData.img}
                // value={formData.img.split("\\").pop()}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />





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
