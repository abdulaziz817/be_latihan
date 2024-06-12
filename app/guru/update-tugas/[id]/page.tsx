"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import useGuruModule from "../../lib";
import { ClassUpdatePayload, TugasUpdatePayload } from "../../interface";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

const UpdateTugas = ({ params }: { params: { id: string } }) => {
  const { useUpdateTugas, useDetailTugas } = useGuruModule();
  const { mutate, isLoading } = useUpdateTugas(+params.id);
  const { data, isFetching } = useDetailTugas(params.id);
  const formik = useFormik<TugasUpdatePayload>({
    initialValues: {
      judul: data?.judul || "",
      subject: data?.subject || "",
      files: data?.files || "",
      file: undefined,
      id: data?.id || 0,
    },
    validationSchema: CreateTugasSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      window.location.href = `/guru/detail/${data?.id}`;
    },
  });
  const { handleChange, handleSubmit, setFieldValue, handleBlur, values, errors } = formik;

  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <Link href={`/guru/detail/${data?.id}`}>
            <p className="text-2xl font-semibold">
              <FontAwesomeIcon icon={faArrowLeft} />
            </p>
          </Link>
        </div>
      </header>
      <section className=" flex items-center justify-center">
        <div className="w-[600px]">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-2xl font-bold text-gray-800">Update Tugas</h1>
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
                  value={values.subject}
                  onChange={handleChange}
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
                title="Update Tugas"
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

export default UpdateTugas;
