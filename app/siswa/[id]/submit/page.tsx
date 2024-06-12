"use client";

import { useState } from "react";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TugasCreatePayload } from "@/app/guru/interface";
import { SubmitPayload } from "../../interface";
import useSiswaModule from "../../lib/lindex";
import { useRouter } from "next/navigation";

export const CreateSubmitSchema = yup.object().shape({
  files: yup.string().nullable().default("").required(""),
});

const CreateTugas = ({ params }: { params: { id: string } }) => {
  const { useSubmitAssingmet } = useSiswaModule();
  const { mutate, isLoading } = useSubmitAssingmet(+params.id);
  const route = useRouter();

  const formik = useFormik<SubmitPayload>({
    initialValues: CreateSubmitSchema.getDefault(),
    validationSchema: CreateSubmitSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
    values,
    errors,
  } = formik;

  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <button onClick={() => route.push("/siswa/dashboard")}>
            <p className="text-2xl font-semibold">
              <FontAwesomeIcon icon={faArrowLeft} />
            </p>
          </button>
        </div>
      </header>
      <section className=" flex items-center justify-center">
        <div className="w-[600px]">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-2xl font-bold text-gray-800">
              Submit Assignment
            </h1>
          </div>
          <FormikProvider value={formik}>
            <Form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="file"
                className="block w-full border border-gray-200 rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                id="files"
                onChange={(event: any) => {
                  const file = event.target.files[0];

                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue("files", reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("file", file);
                }}
              />
              <Button
                title="Send Tugas"
                width="login"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </Form>
          </FormikProvider>
        </div>
      </section>
    </>
  );
};

export default CreateTugas;
