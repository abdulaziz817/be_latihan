"use client";
import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import InputText from "@/components/InputText";
import { RegisterPayload } from "../interface";
import useAuthModule from "../lib";
import Select from "@/components/Select";

export const registerallSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("tolong isi terlebih dahulu"),

  username: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  role: yup
    .string()
    .nullable()
    .default(undefined)
    .required("tolong isi terlebih dahulu"),

  password: yup
    .string()
    .nullable()
    .default("")
    .min(8)
    .required("tolong isi terlebih dahulu"),

  avatar: yup
    .string()
    .nullable()
    .default(""),
});

export const userRole = [
  {
    value: 'Guru',
    label: 'guru',
  },
  {
    value: 'Siswa',
    label: 'siswa',
  }
];

const SiswaRegister = () => {
  const route = useRouter();
  const { useRegister } = useAuthModule();
  const { mutate, isLoading } = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerallSchema.getDefault(),
    validationSchema: registerallSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
  } = formik;

  return (
    <>
      <div className="flex w-full h-screen relative justify-center items-center">
        <FormikProvider value={formik}>
          <div data-hs-stepper="" className="">
            <ul className="relative flex opacity-0 flex-row gap-x-2">
              <li
                className="flex items-center gap-x-2  shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{  "index": 1 }'
              ></li>
              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{"index": 2}'
              ></li>
              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{"index": 3}'
              ></li>

              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{"index": 4}'
              ></li>

              <li
                className="flex items-center gap-x-2 shrink basis-0 flex-1 group"
                data-hs-stepper-nav-item='{"index": 5}'
              ></li>
            </ul>

            <Form onSubmit={handleSubmit}>
              <div className="relative">
                <div
                  data-hs-stepper-content-item='{"index": 1}'
                  style={{ display: "none" }}
                >
                  <div className="bg-white rounded-lg border border-gray-200 w-[440px] h-[339px]">
                    <section className="py-24 px-5">
                      <label
                        htmlFor="email"
                        className="block text-xl font-bold mb-2 "
                      >
                        Create account
                      </label>
                      <InputText
                        value={values.email}
                        placeholder="example@gmail.com"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={getIn(errors, "email")}
                        messageError={getIn(errors, "email")}
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      <p className="mt-4 text-sm">
                        You can only join the class because of your role as a
                        student
                      </p>
                    </section>
                  </div>
                </div>

                <div
                  data-hs-stepper-content-item='{"index": 2}'
                  style={{ display: "none" }}
                >
                  <div className="bg-white rounded-lg border border-gray-200 w-[440px] h-[339px]">
                    <section className="py-24 px-5">
                      <label
                        htmlFor="username"
                        className="block text-xl font-bold mt-5"
                      >
                        Username
                      </label>
                      <InputText
                        value={values.username}
                        placeholder="your username"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={getIn(errors, "username")}
                        messageError={getIn(errors, "username")}
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </section>
                  </div>
                </div>

                <div
                  data-hs-stepper-content-item='{"index": 3}'
                  style={{ display: "none" }}
                >
                  <div className="bg-white rounded-lg border border-gray-200 w-[440px] h-[339px]">
                    <section className="py-24 px-5">
                      <label
                        htmlFor="password"
                        className="block text-xl font-bold mb-2 "
                      >
                        Password
                      </label>
                      <InputText
                        value={values.password}
                        placeholder="******"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={getIn(errors, "password")}
                        messageError={getIn(errors, "password")}
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      <p className="mt-4 text-sm">
                        Enter the password you would like to use with your
                        account.
                      </p>
                    </section>
                  </div>
                </div>

                <div
                  data-hs-stepper-content-item='{"index": 4}'
                  style={{ display: "none" }}
                >
                  <div className="bg-white rounded-lg border border-gray-200 w-[440px] h-[339px]">
                    <section className="py-12 px-5">
                      <label
                        htmlFor="nama"
                        className="block text-xl font-bold mb-2 "
                      >
                        Nama
                      </label>
                      <InputText
                        value={values.nama}
                        placeholder="your name"
                        id="nama"
                        name="nama"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isError={getIn(errors, "nama")}
                        messageError={getIn(errors, "nama")}
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />

                      <label
                        htmlFor="role"
                        className="block text-xl font-bold mt-3 mb-2 "
                      >
                        Role
                      </label>
                      <Select
                        value={values.role}
                        onBlur={handleBlur}
                        id="role"
                        name="role"
                        options={userRole}
                        isError={getIn(errors, "role")}
                        messageError={getIn(errors, "role")}
                        onChange={handleChange}
                      />
                    </section>
                  </div>
                </div>
                <div
                  data-hs-stepper-content-item='{"index": 5}'
                  style={{ display: "none" }}
                >
                  <div className="bg-white rounded-lg border border-gray-200 w-[440px] h-[339px]">
                    <section className="py-12 px-5">
                      <label
                        htmlFor="jabatan"
                        className="block text-xl font-bold mb-2 "
                      >
                        Photo Profile
                      </label>
                      <picture className="justify-center my-5 flex">
                        <img
                          className="rounded-full w-20 h-20"
                          src={
                            values.avatar ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          }
                          alt="img"
                        />
                      </picture>
                      <div className="flex gap-3 m-3">
                        <input
                          type="file"
                          id="file"
                          className="block w-full text-sm text-gray-500
                        file:me-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-900 file:text-white
                        hover:file:bg-slate-700
                        file:disabled:opacity-50 file:disabled:pointer-events-none
                       "
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
                      </div>
                    </section>
                  </div>
                </div>

                <div className="absolute flex w-full justify-between bottom-6 pr-5 pl-5">
                  <button
                    className="hs-stepper-disabled:opacity-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50  disabled:pointer-events-none "
                    type="button"
                    data-hs-stepper-back-btn=""
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    data-hs-stepper-next-btn=""
                  >
                    Next
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
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    data-hs-stepper-content-item='{"index": 5}'
                    style={{ display: "none" }}
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </FormikProvider>
      </div>
    </>
  );
};

export default SiswaRegister;
