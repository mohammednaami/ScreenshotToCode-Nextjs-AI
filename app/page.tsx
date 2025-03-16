"use client";
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import { Footer } from "./_components/Footer";

export default function Home() {
  // const user = auth?.currentUser;
  // console.log(user)
  const user = useAuthContext();
  console.log(user?.user);
  return (
    <div>
      <header className="flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav
          className="relative  p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global">
          <div className="flex items-center justify-between">
            {/* <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a> */}
            <div>
              {/* <button type="button" className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> */}
              <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
              {/* </button> */}
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              {!user?.user?.email ? (
                <Authentication>
                  <div className="mt-8 gap-3 flex justify-center">
                    <a
                      className="inline-flex justify-center items-center 
      gap-x-3 text-center bg-gradient-to-tl from-blue-600
       to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                      >
                      Get started
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </a>
                  </div>
                </Authentication>
              ) : (
                <div className="mt-8 gap-3 flex justify-center">
                <Link href="/dashboard"
                  className="inline-flex justify-center items-center 
  gap-x-3 text-center bg-gradient-to-tl from-green-600
   to-black hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                  >
                  Dashboard
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Build User Interfaces 10x Faster
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Convert any screenshot or design to clean code (with support for
              most frameworks)
            </p>
          </div>
          {!user?.user?.email ? (
                <Authentication>
                  <div className="mt-8 gap-3 flex justify-center">
                    <a
                      className="inline-flex justify-center items-center 
      gap-x-3 text-center bg-gradient-to-tl from-blue-600
       to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                      >
                      Get started
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </a>
                  </div>
                </Authentication>
              ) : (
                <div className="mt-8 gap-3 flex justify-center">
                <Link href="/dashboard"
                  className="inline-flex justify-center items-center 
  gap-x-3 text-center bg-gradient-to-tl from-green-600
   to-black hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                  >
                  Dashboard
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
              )}
        </div>
      </div>

      <Footer />


    </div>
  );
}
