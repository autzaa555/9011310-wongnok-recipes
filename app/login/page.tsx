// "use client";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn } from "next-auth/react";
import {GoogleSignInButton} from "@/app/component/authButtons"; 

export default async function SignInPage() {
    const session = await getServerSession(authConfig);

    console.log("Session: ", session);

    if (session) return redirect("/login/profile");


    return (

            <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex flex-col items-center mt-10 p-10 shadow-md">
                    <h1 className="mt-10 mb-4 text-4xl font-bold">เข้าสู่ระบบ</h1>
                    <GoogleSignInButton />
        

                </div>
            </div>


    );
}

