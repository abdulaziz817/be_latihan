"use client";

import { signOut, useSession } from "next-auth/react";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JoinPayload } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGuruModule from "@/app/guru/lib";
import useSiswaModule from "../lib/lindex";
import useAuthModule from "@/app/auth/lib";
import Loading from "@/components/loading";

export const JoinSchema = yup.object().shape({
  code: yup.string().nullable().default("").required("isi code class"),
});

export const ProfileSiswaSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")

    .required("tolong isi terlebih dahulu"),
  avatar: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
});

const Dashboard = () => {
  const { data: siswasession, status } = useSession();
  const { useClassList } = useGuruModule();
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { useJoinClass } = useSiswaModule();
  const { mutate: profilemutate } = useUpdateProfile();
  const { data: profile } = useProfile();
  const { data, isFetching } = useClassList();
  const { mutate } = useJoinClass();
  const router = useRouter();
  const formik = useFormik<JoinPayload>({
    initialValues: JoinSchema.getDefault(),
    validationSchema: JoinSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const profileformik = useFormik<any>({
    initialValues: {
      nama: profile?.data.nama,
      avatar: profile?.data.avatar,
      file: undefined,
      id: profile?.data.id,
    },
    validationSchema: ProfileSiswaSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      profilemutate(values);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;
  const {
    handleChange: handleChangeprofile,
    handleSubmit: handleSubmitprofile,
    handleBlur: blurprofile,
    values: valueprofile,
    errors: erorprofile,
    setFieldValue,
  } = profileformik;

  if(isFetching) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading/>
      </div>
    )
  }


  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <Link href={""}>
            <p className="text-3xl font-bold">ClassMeet</p>
          </Link>
        </div>
        <div className="flex gap-7">
          <button
            type="button"
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#hs-vertically-centered-modal"
          >
            Join Class
          </button>
          <div className="hs-dropdown inline-flex">
            <button
              id="hs-dropdown-unstyled"
              type="button"
              className="hs-dropdown-toggle hover:bg-white/20  transition-all duration-75 w-10 h-10 text-white inline-flex justify-center items-center gap-x-2"
            >
              <picture>
                <img
                  className="rounded-full object-cover w-10 h-10"
                  src={
                    profile?.data.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt=""
                  draggable="false"
                />
              </picture>
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-auto hidden z-10 mt-2  bg-white shadow-md rounded-lg p-2 "
              aria-labelledby="hs-dropdown-unstyled"
            >
              <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                {profile?.data.nama}
              </p>
              <button
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => {
                  router.push("/siswa/personal-info");
                }}
              >
                Personal Info
              </button>
              <button
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                data-hs-overlay="#hs-vertically-centered-modal-1"
              >
                Edit Profile
              </button>
              <button
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    router.push("/login");
                  });
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="hs-vertically-centered-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Join Class</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-vertically-centered-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <FormikProvider value={formik}>
                <Form className="space-y-5" onSubmit={handleSubmit}>
                  <section>
                    <Label htmlFor="code" title="Code" />
                    <InputText
                      value={values.code}
                      placeholder="code"
                      id="code"
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={getIn(errors, "code")}
                      messageError={getIn(errors, "code")}
                    />
                  </section>
                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      data-hs-overlay="#hs-vertically-centered-modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Join Class
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>

      <div
        id="hs-vertically-centered-modal-1"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Update Profile</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-vertically-centered-modal-1"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <picture className="justify-center flex">
                <img
                  className="rounded-full w-20 h-20"
                  src={
                    valueprofile.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="img"
                />
              </picture>
              <FormikProvider value={profileformik}>
                <Form className="space-y-5" onSubmit={handleSubmitprofile}>
                  <section className="relative">
                    <div className="flex gap-2 items-center">
                      <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500">
                        <svg
                          className="flex-shrink-0 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" x2="12" y1="3" y2="15"></line>
                        </svg>
                      </span>
                      <p>Upload Image</p>
                    </div>
                    <input
                      type="file"
                      id="file"
                      className="opacity-0 absolute top-0"
                      onChange={(event: any) => {
                        const file = event.target.files[0];

                        // if (file.type !== "image/jpeg") {
                        //   return alert("type tidak sesauai");
                        // }

                        let reader = new FileReader();
                        reader.onloadend = () => {
                          setFieldValue("avatar", reader.result);
                        };
                        reader.readAsDataURL(file);
                        setFieldValue("file", file);

                        console.log(file);
                      }}
                    />
                  </section>
                  <section>
                    <Label htmlFor="nama" title="Nama" />
                    <InputText
                      value={valueprofile.nama}
                      placeholder="nama"
                      id="nama"
                      name="nama"
                      onChange={handleChangeprofile}
                      onBlur={handleBlur}
                      isError={getIn(erorprofile, "nama")}
                      messageError={getIn(erorprofile, "nama")}
                    />
                  </section>

                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      data-hs-overlay="#hs-vertically-centered-modal-1"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-wrap gap-7 justify-start px-10">
        {data?.data
          .filter((itemclass) =>
            itemclass.join_by.some(
              (student) => student.id === siswasession?.user.id
            )
          )
          .map((itemclass, index) => (
            <section key={index} className="relative">
              <div
                onClick={() => {
                  router.push(`/siswa/detail/${itemclass.id}`);
                }}
                className="border-[1px] cursor-pointer flex justify-between flex-col rounded-md w-[302px] h-[296px] border-slate-4000"
              >
                <div className="bg-[url('https://i.ibb.co.com/wrT9QPt/img-class.jpg')]  px-[1rem] pt-[1rem] pb-[0.75rem] flex relative flex-col justify-between rounded-t-md h-[5rem] bg-center bg bg-cover">
                  <div className="flex justify-between items-center">
                    <div className="text-white">
                      <h1 className="hover:underline">
                        {itemclass.nama_kelas}
                      </h1>
                      <span>
                        <p>{itemclass.subject}</p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t h-[2rem] border-slate-4000 px-[1rem]">
                  code :
                  <h3 className="float-right font-semibold">
                    {itemclass.code}
                  </h3>
                </div>
              </div>
              <div className="hs-dropdown top-5 right-3 z-20 absolute inline-flex">
                <button
                  type="button"
                  id="hs-dropdown-default"
                  className="hs-dropdown-toggle hover:bg-white/20  transition-all duration-75 w-10 h-10 rounded-full text-white inline-flex justify-center items-center gap-x-2"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-auto hidden z-10 mt-2 min-w-auto bg-white shadow-md rounded-lg p-2 "
                  aria-labelledby="hs-dropdown-default"
                >
                  <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                    Out
                  </button>
                </div>
              </div>
            </section>
          ))}
      </main>
    </>
  );
};

export default Dashboard;
