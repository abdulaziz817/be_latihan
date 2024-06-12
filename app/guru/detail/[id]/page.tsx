/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import "react-tabs/style/react-tabs.css";
import useGuruModule from "../../lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import striptags from "striptags";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { dateUtil } from "@/utils";

export default function UpdateKategori({ params }: { params: { id: string } }) {
  const { useDetailClass, useTugasList, useDeleteTugas } = useGuruModule();
  const { data: session, status } = useSession();
  const route = useRouter();
  const { data, isFetching } = useDetailClass(params.id);
  const { data: datatugas } = useTugasList();

  const { mutate: mutases, isLoading: loading } = useDeleteTugas();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutases(id);
    },
  });

  return (
    <>
    <header className="sticky z-50 top-0 bg-white w-full">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-950 hs-tab-active:text-slate-950 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-950 focus:outline-none focus:text-slate-950 disabled:opacity-50 disabled:pointer-events-none  active"
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
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-950 hs-tab-active:text-slate-950 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-950 focus:outline-none focus:text-slate-950 disabled:opacity-50 disabled:pointer-events-none "
            id="unstyled-tabs-item-2"
            data-hs-tab="#unstyled-tabs-2"
            aria-controls="unstyled-tabs-2"
          >
            Classwork
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-slate-950 hs-tab-active:text-slate-950 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-950 focus:outline-none focus:text-slate-950 disabled:opacity-50 disabled:pointer-events-none "
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
        <div className="flex flex-col items-center min-h-screen ">
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
                  <button className="text-slate-900 text-lg font-mono">
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
                    src={data?.created_by.avatar}
                    className="w-10 h-10 rounded-full object-cover  flex items-center justify-center text-xl font-bold text-gray-600"
                  />
                  <p>Announce something to your class</p>
                </div>
              </div>

              {/* Assignment Section */}
              {data?.tugas_by?.map((tugas) => (
                <div
                  key={tugas.id}
                  className=" hover:bg-slate-50 rounded-md p-4 flex items-center gap-3 w-full md:col-span-3 relative"
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
        <div className="flex justify-center w-full mt-10 h-full">
          <button
            className="w-[133px] h-[48px] text-center justify-center inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-slate-600 text-white hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => route.push(`/guru/${data?.id}/tugas-create`)}
          >
            Create Tugas
          </button>
          <div className="flex justify-center mt-20 items-center gap-4 flex-col">
            {data?.tugas_by?.map((tugas) => (
              <div
                key={tugas.id}
                className=" hover:bg-slate-50 rounded-md p-4 flex items-center gap-3 w-[760px] md:col-span-3 relative"
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
                <div className="flex justify-between w-full">
                  <h2 className="text-lg font-bold">{tugas.judul}</h2>
                  <div className="flex gap-2">
                    <p>post {dateUtil.formatDateIndLong(tugas.created_at)}</p>
                    <Menu>
                      <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none 0 data-[focus]:outline-1 data-[focus]:outline-white">
                        <svg
                          className="flex-none size-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </MenuButton>
                      <Transition
                        enter="transition ease-out duration-75"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <MenuItems
                          anchor="bottom end"
                          className="w-52 origin-top-right rounded-xl bg-white shadow-sm p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                        >
                          <MenuItem>
                            <button
                              onClick={() => {
                                route.push(`/guru/update-tugas/${tugas.id}`);
                              }}
                              className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                              Edit
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => {
                                handleDelete(tugas.id || 0);
                              }}
                              className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                              Delete
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  src={data?.created_by.avatar}
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
                      src={classmate.avatar}
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
