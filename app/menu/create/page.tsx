'use client'
import React, { useState } from "react";
import { Item } from "@/app/interface/item";
import { useRouter } from 'next/navigation';

const CreateItemForm: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    description: "",
    img: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ทำสิ่งที่คุณต้องการกับข้อมูลใน formData
    try {
        const response = await fetch("http://localhost:3000/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
   console.log("Submitted:", formData);
      // ล้างข้อมูลฟอร์มหลังจากส่งข้อมูลสำเร็จ// เคลียร์ฟอร์มหลังจาก submit
      setFormData({ id: 0, name: "", description: "", img: "" })
      alert("Item added successfully!");
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
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
              <label htmlFor="img" className="block text-sm font-medium text-gray-700">Image /image.png:</label>
              <input
                type="text"
                id="img"
                name="img"
                value={formData.img}
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
