
import { authConfig, loginIsRequiredServer } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {GoogleSignOut} from "@/app/component/authButtons"; 

const wait = (ms: number) => new Promise((rs) => setTimeout(rs, ms));

export default async function Page() {
  await loginIsRequiredServer();

  const session = await getServerSession(authConfig);


  await wait(1000);

  return (
    <>


      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex flex-col items-center mt-10 p-10 shadow-md">
                    <h1 className="mt-10 mb-4 text-4xl font-bold">Profile</h1>
             {session?.user?.image && <img src={session?.user?.image} alt="" />}
      <h3> {session?.user?.email}</h3>    
      <GoogleSignOut/>

                </div>
            </div>


    </>
  );
}