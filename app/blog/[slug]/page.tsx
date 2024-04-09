'use client'
import { Menu } from "@/app/interface/menu";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

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

export default function Page({ params }: PageProps) {
    const [blog, setBlog] = useState<Menu[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getBlog(params.slug);
            setBlog(fetchedData);
        };

        fetchData();
    }, []);

    const router = useRouter();

    const handleDelete = async () => {
        // ทำการลบโพสต์ที่มี id เป็น params.slug ที่ต้องการลบ
        try {
            const response = await fetch(`http://localhost:3000/api/menus?id=${params.slug}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            alert("Item deleted successfully!");
            // อัปเดตข้อมูลหลังจากลบสำเร็จ
            router.push("/"); // พากลับไปที่หน้าแรก
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Please try again.");
        }
    };
    
    return (
        <div className="container mx-auto px-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* id: {params.slug} */}
                    {blog.map(item => (
                        <div key={item.id}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <Image src={`/image/${item.img}`} width={500} height={500} alt={item.name} className="w-full h-full object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                    <p className="text-gray-700">ระดับ : {item.difficulty}</p>
                                    <p className="text-gray-700">ใช้เวลา : {item.period}</p>
                                    <h2 className="text-xl font-bold mb-2">ส่วนผสม</h2>
                                    <p className="text-gray-700">{item.description}</p>
                                    <h2 className="text-xl font-bold mb-2">ขั้นตอนการทำ</h2>
                                    <p className="text-gray-700">{item.step}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <Link href="/" passHref>
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                                                กลับ
                                            </button>
                                        </Link>
                                        <div>
                                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                                ลบ
                                            </button>
                                            <button onClick={() => router.push(`/menu/edit/${item.id}`)} className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                                แก้ไข
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
