"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import useGuruModule from "../../lib";
import { ClassUpdatePayload } from "../../interface";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const CreateClassSchema = yup.object().shape({
  nama_kelas: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
  subject: yup.string().nullable().default(""),
});

const UpdateClass = ({ params }: { params: { id: string } }) => {
  const { useUpdateClass, useDetailClass } = useGuruModule();
  const { mutate, isLoading } = useUpdateClass(+params.id);
  const { data, isFetching } = useDetailClass(params.id);
  const formik = useFormik<ClassUpdatePayload>({
    initialValues: {
      nama_kelas: data?.nama_kelas || "",
      subject: data?.subject || "",
      id: data?.id || 0,
    },
    validationSchema: CreateClassSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      window.location.href = "/guru";
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

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
          <h1 className="text-2xl font-bold text-gray-800">Update Class</h1>
        </div>
        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="nama_kelas" title="Nama kelas" />
              <InputText
                value={values.nama_kelas}
                placeholder="nama kelas"
                id="nama_kelas"
                name="nama_kelas"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={getIn(errors, "nama_kelas")}
                messageError={getIn(errors, "nama_kelas")}
              />
            </section>

            <section>
              <Label htmlFor="subject" title="Subject" />
              <InputText
                value={values.subject}
                placeholder="subject"
                id="subject"
                name="subject"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={getIn(errors, "subject")}
                messageError={getIn(errors, "subject")}
              />
            </section>

            <Button
              title="Update Class"
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

export default UpdateClass;
