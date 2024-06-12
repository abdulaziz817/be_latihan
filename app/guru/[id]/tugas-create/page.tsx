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
import { TugasCreatePayload } from "../../interface";
import useGuruModule from "../../lib";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CreateTugasSchema = yup.object().shape({
  judul: yup
    .string()
    .nullable()
    .default("")
    .required("Tolong isi terlebih dahulu"),
  subject: yup
    .string()
    .nullable()
    .default("")
    .required("Tolong isi terlebih dahulu"),
  files: yup.string().nullable().default(""),
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

const CreateTugas = ({ params }: { params: { id: string } }) => {
  const { useTugasClass } = useGuruModule();
  const { mutate, isLoading } = useTugasClass(+params.id);
  const [subjectContent, setSubjectContent] = useState("");

  const formik = useFormik<TugasCreatePayload>({
    initialValues: CreateTugasSchema.getDefault(),
    validationSchema: CreateTugasSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      window.location.href = `/guru`;
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

  const handleSubjectChange = (content: string) => {
    setSubjectContent(content);
    setFieldValue("subject", content);
  };

  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <Link href={"/guru"}>
            <p className="text-2xl font-semibold">
              <FontAwesomeIcon icon={faArrowLeft} />
            </p>
          </Link>
        </div>
      </header>
      <section className=" flex items-center justify-center">
        <div className="w-[600px]">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-2xl font-bold text-gray-800">Assignment</h1>
          </div>
          <FormikProvider value={formik}>
            <Form className="space-y-5" onSubmit={handleSubmit}>
              <section>
                <InputText
                  value={values.judul}
                  placeholder="Judul"
                  id="judul"
                  name="judul"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "judul")}
                  messageError={getIn(errors, "judul")}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </section>
              <section className="space-y-3">
                <Label htmlFor="subject" title="Subject" />
                <ReactQuill
                  value={subjectContent}
                  onChange={handleSubjectChange}
                  modules={modules}
                  formats={formats}
                  onBlur={handleBlur}
                />
                {/* {errors.subject && (
                  <div className="text-red-500">{errors.subject}</div>
                )} */}
              </section>
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
                title="Create Tugas"
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
