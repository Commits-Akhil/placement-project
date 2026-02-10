"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerComponent } from "./core/authLogic";

export default function Login() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <>

      <div className="bg-zinc-100 h-full  dark:bg-neutral-900 overflow-x-hidden">
        <div className="w-full px-3  md:px-20 flex flex-col md:flex-row py-8 border-0 md:mb-32 overflow-x-hidden">
          <div className="md:w-1/2">
            <img
              src="https://restan-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimg%2Fthumb%2F14.jpg&w=1920&q=75"
              className="rounded-t-lg md:rounded-l-xl md:rounded-t-none shadow-xl/40 "
            />
          </div>
          <div className="bg-white md:w-1/2 pb-4 px-2 pt-4 md:pt-15 text-center md:text-start md:pl-24 flex flex-col gap-5 rounded-b-lg md:rounded-r-xl shadow-xl/30 dark:bg-neutral-700/60 md:rounded-bl-none">
            <div className="font-[Marcellus]  text-2xl bg-gradient-to-r from-emerald-900 via-yellow-600 to-lime-400 text-transparent bg-clip-text font-semibold  dark:from-blue-400 dark:via-fuchsia-500 dark:to-lime-400">
              CREATE AN ACCOUNT
            </div>
            <div className=" font-[Marcellus] text-gray-400">
              Enter your details to create a new account
            </div>
            <input
              type="email"
              className="bg-sky-200 h-10 md:w-120  border-0 rounded-lg font-[Marcellus] text-gray-950 px-10"
              placeholder="Email"
              onChange={(event) => setemail(event.target.value)}
            />

            <input
              type="password"
              className="bg-sky-200 h-10 md:w-120  border-0 rounded-lg font-[Marcellus] text-gray-950 px-10"
              placeholder="Password*"
              onChange={(event) => setpassword(event.target.value)}
            />
            <input
              type="password"
              className="bg-sky-200 h-10 md:w-120  border-0 rounded-lg font-[Marcellus] text-gray-950 px-10"
              placeholder="Confirm Password*"
            />

            <button
              className="bg-green-700 h-10 md:w-120  p-2 border-0 rounded-lg w-full text-white"
              onClick={async (event) => {
                try {
                  await registerComponent(email, password);
                  await router.push("/Login");
                } catch {
                  console.log("/error");
                }
              }}
            >
              REGISTER
            </button>

            <div className="font-[Marcellus] text-2xl font-semibold text-black md:ml-36 dark:text-white">
              Or Register With
            </div>
            <div className="flex flex-col space-y-2 md:flex-row items-center">
              <div className="flex flex-row bg-white w-50 mx-6 text-black font-semibold pl-5 h-13 border-1 rounded-lg border-blue-200">
                <div>
                  <img
                    src="https://img.icons8.com/?size=100&id=go8tkRsylXuu&format=png&color=FA5252"
                    className="w-13 h-13"
                  />
                </div>
                <div className="pt-3 pl-3 text-lg">Google</div>
              </div>

              <div className="flex flex-row bg-white w-50 mx-6 text-black font-semibold pl-5 h-13 border-1 rounded-lg border-blue-200">
                <div>
                  <img
                    src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                    className="w-13 h-13"
                  />
                </div>
                <div className="pt-3 pl-3 text-lg">Facebook</div>
              </div>
            </div>
            <div className="text-center font-[Marcellus]">
              <span className="text-gray-400"> Already have an account?</span>{" "}
              <span className="text-red-600">
                <u onClick={() => router.push("/Login")}>Login Now</u>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
