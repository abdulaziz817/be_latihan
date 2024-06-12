"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../interface";
import useAuthModule from "../lib";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  role: yup.number().nullable().default(undefined),
  password: yup
    .string()
    .nullable()
    .default("")
    .min(8)
    .required("tolong isi terlebih dahulu"),
});

const Login = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  const route = useRouter();
  const { useLogin } = useAuthModule();
  const { mutate, isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <FormikProvider value={formik}>
        <div className="flex items-center">
          <div className="bg-white border w-[500px] border-gray-200 rounded-xl">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 ">
                   Sign in
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Dont have an account yet?
                  <button
                    onClick={() => route.push("/register")}
                    className="text-blue-600 pl-1 decoration-2 hover:underline font-medium dark:text-blue-500"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
              <div className="mt-5">
                <Form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm mb-2 ">
                      Username
                      </label>
                      <div className="relative">
                        <InputText
                          value={values.username}
                          placeholder="your username"
                          id="username"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                          isError={getIn(errors, "username")}
                          messageError={getIn(errors, "username")}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 "
                        >
                          Password
                        </label>
                        <button
                          onClick={() => route.push("/auth/forgot-password")}
                          className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <InputText
                          value={values.password}
                          placeholder="*******"
                          id="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={getIn(errors, "password")}
                          messageError={getIn(errors, "password")}
                          className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
};

export default Login;
