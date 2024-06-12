/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import "react-tabs/style/react-tabs.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import striptags from "striptags";
import useGuruModule from "@/app/guru/lib";
import { useState } from "react";
import { useToast } from "@/hook/useToast";
import { dateUtil } from "@/utils";

export default function UpdateKategori({ params }: { params: { id: string } }) {
  const { useDetailClass, useTugasList } = useGuruModule();
  const { data: session, status } = useSession();
  const { toastSuccess } = useToast();
  const route = useRouter();
  const { data, isFetching } = useDetailClass(params.id);
  const { data: datatugas } = useTugasList();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (data?.code) {
      navigator.clipboard
        .writeText(data.code)
        .then(() => {
          setCopied(true);
          toastSuccess("Class code copied to clipboard!");
          setTimeout(() => setCopied(false), 2000); 
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  return (
    <>
      <header className="sticky z-50 top-0 bg-white w-full">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-900 hs-tab-active:text-slate-900 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-900 focus:outline-none focus:text-slate-900 disabled:opacity-50 disabled:pointer-events-none  active"
            id="unstyled-tabs-item-1"
            data-hs-tab="#unstyled-tabs-1"
            aria-controls="unstyled-tabs-1"
            role="tab"
          >
            Class
          </button>
          <button
            type="button"
            role="tab"
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-900 hs-tab-active:text-slate-900 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-900 focus:outline-none focus:text-slate-900 disabled:opacity-50 disabled:pointer-events-none "
            id="unstyled-tabs-item-2"
            data-hs-tab="#unstyled-tabs-2"
            aria-controls="unstyled-tabs-2"
          >
            Classwork
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-900 hs-tab-active:text-slate-900 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-900 focus:outline-none focus:text-slate-900 disabled:opacity-50 disabled:pointer-events-none "
            id="unstyled-tabs-item-3"
            data-hs-tab="#unstyled-tabs-3"
            aria-controls="unstyled-tabs-3"
            role="tab"
          >
            People
          </button>
        </nav>
      </header>

      <div
        id="unstyled-tabs-1"
        role="tabpanel"
        aria-labelledby="tabs-with-underline-item-1"
      >
        <div className="flex flex-col items-center min-h-screen">
          <header className="w-full bg-slate-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">{data?.nama_kelas}</h1>
            </div>
          </header>
          <main className="container mx-auto mt-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Class Code Section */}
              <div className="bg-white p-4 rounded shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Class code</h2>
                  <button   onClick={copyToClipboard} className="text-slate-900 text-lg font-mono">
                    {data?.code}
                  </button>
                </div>
              </div>

              {/* Upcoming Section */}
              <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">Upcoming</h2>
                <p>No work due soon</p>
                <button className="text-slate-900 mt-2">View all</button>
              </div>

              {/* Announcement Section */}
              <div className="bg-white p-4 rounded shadow-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={data?.created_by.avatar ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    className="w-10 h-10 rounded-full object-cover  flex items-center justify-center text-xl font-bold text-gray-600"
                  />
                  <p>Announce something to your class</p>
                </div>
              </div>

              {/* Assignment Section */}
              {data?.tugas_by?.map((tugas) => (
                <div
                  key={tugas.id}
                  onClick={() => route.push(`/siswa/detail-tugas/${tugas.id}`)}
                  className=" cursor-pointer hover:bg-slate-50 rounded-md p-4 flex items-center gap-3  md:col-span-3 relative"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-center bg-slate-900">
                <svg
                  focusable="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-white flex items-center justify-center text-center"
                >
                  <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                </svg>
              </div>
                  <h2 className="text-lg font-bold">
                    {
                      datatugas?.data?.find((mydata) => mydata.id)?.created_by
                        .nama
                    }{" "}
                    posted an assignment: {tugas.judul}
                  </h2>
                  <span className="absolute right-3">post {dateUtil.formatDateIndLong(tugas.created_at)}</span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <div
        id="unstyled-tabs-2"
        className="hidden"
        role="tabpanel"
        aria-labelledby="tabs-with-underline-item-2"
      >
        <div className="text-center">
          <h2 className="font-bold text-3xl hover:underline">
            ClassWork Assigment All
          </h2>
        </div>
        <div className="flex justify-center mt-10 items-center gap-4 flex-col">
          {data?.tugas_by?.map((tugas) => (
            <div
              key={tugas.id}
              onClick={() => route.push(`/siswa/detail-tugas/${tugas.id}`)}
              className="cursor-poiter hover:bg-slate-50 rounded-md p-4 flex items-center gap-3 w-[760px] md:col-span-3 relative"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-center bg-slate-900">
                <svg
                  focusable="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-white flex items-center justify-center text-center"
                >
                  <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">
                {datatugas?.data?.find((mydata) => mydata.id)?.created_by.nama}{" "}
                posted an assignment: {tugas.judul}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div
        id="unstyled-tabs-3"
        className="hidden"
        role="tabpanel"
        aria-labelledby="tabs-with-underline-item-3"
      >
        <div className="max-w-2xl mx-auto p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-600">Teachers</h2>
            <hr className="border-t-2 border-gray-600" />
            <div className="mt-4 flex items-center">
              <picture className="rounded-full w-10 h-10 flex items-center justify-center text-white">
                <img
                  src={data?.created_by.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                  alt=""
                  className="w-10 rounded-full h-10 object-cover"
                />
              </picture>
              <span className="ml-4">{data?.created_by.nama}</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-600">Classmates</h2>
            <span className="text-gray-600">
              {data?.join_by.length} students
            </span>
            <hr className="border-t-2 border-gray-600" />
            <ul className="mt-4">
              {data?.join_by.map((classmate, index) => (
                <li key={index} className="flex items-center mb-4">
                  <picture className="rounded-full w-10 h-10 flex items-center justify-center text-white">
                    <img
                      src={classmate.avatar ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                      alt=""
                      className="w-10 rounded-full h-10 object-cover"
                    />
                  </picture>
                  <span className="ml-4">{classmate.username}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
