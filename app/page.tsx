"use client";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie";
import LandingPageAnimation from "@/public/animation_landing_page.json";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LandingPageAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const route = useRouter();
  return (
    <>
      <header className="flex sticky top-0 flex-wrap sm:justify-start sm:flex-col z-50 w-full bg-white border-b border-gray-200 text-sm pb-2 sm:pb-0">
        {/* Topbar */}
        <div className="max-w-[85rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-x-5 w-full py-2 sm:pt-2 sm:pb-0">
            <button
              className="inline-flex justify-center items-center gap-2 font-medium text-gray-600 hover:text-neutral-500 text-sm"
              onClick={() => route.push("/login")}
            >
              Sign In
            </button>
            <button
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-slate-950 text-slate-950  disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => route.push("/register")}
            >
              Get started
            </button>
          </div>
        </div>
        <nav
          className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold"
              href="#"
              aria-label="Brand"
            >
              ClassMeet
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              <a
                className="py-3 ps-px sm:px-3 sm:py-6 font-medium text-slate-950"
                href="#"
                aria-current="page"
              >
                Why us
              </a>
              <a
                className="py-3 ps-px sm:px-3 sm:py-6 font-medium text-gray-800 hover:text-gray-500"
                href="#"
              >
                Started
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 flex md:flex-row flex-col justify-between items-center py-20">
          <div className="mx-auto px-6 text-left md:w-1/2">
            <h2 className="text-4xl font-bold mb-4">
              A place where learning activities are easier
            </h2>
            <p className="mb-8">
              With the Classroom application, we not only facilitate simple
              classes between teachers and students, but also open up space for
              students to experience more structured and organized learning.
            </p>
            <button
              onClick={() => route.push("/login")}
              className="bg-slate-950 text-white px-6 py-3 rounded-full"
            >
              Login
            </button>
          </div>
          <Lottie isPaused={false} options={defaultOptions} height={500} width={500} />
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                0 million people worldwide use ClassMeet
              </h2>
              <p className="mb-8">
                ClassMeet was designed with input from the education community,
                which influenced the development of new features that allow
                educators to focus on teaching and students to focus on
                learning.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-10 justify-center -mx-4">
              <div className="w-full md:w-1/4 h-32 flex items-center justify-center border hover:border-2 cursor-pointer border-slate-950 rounded-md px-4 mb-8 md:mb-0">
                <p className="text-xl text-center font-semibold">
                  0 million users
                </p>
              </div>
              <div className="w-full md:w-1/4 h-32 flex items-center justify-center border hover:border-2 cursor-pointer border-slate-950 rounded-md px-4 mb-8 md:mb-0">
                <p className="text-xl text-center font-semibold">
                  Around the world
                </p>
              </div>
              <div className="w-full md:w-1/4 h-32 flex items-center justify-center border hover:border-2 cursor-pointer border-slate-950 rounded-md px-4 mb-8 md:mb-0">
                <p className="text-xl text-center font-semibold">
                  Using ClassMeet
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-fixed bg-cover py-20 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4">
              Ready to use this website?
            </h2>
            <button
              onClick={() => route.push("/register")}
              className="bg-white text-slate-950 px-6 py-3 rounded-full"
            >
              Start Now
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
