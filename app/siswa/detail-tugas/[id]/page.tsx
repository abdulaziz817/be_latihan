"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSiswaModule from "../../lib/lindex";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import striptags from "striptags";
import { string } from "yup";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const DetailTugas = ({ params }: { params: { id: string } }) => {
  const { useDetailTugas } = useSiswaModule();
  const { data, isFetching } = useDetailTugas(params.id);
  const route = useRouter();

  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <Link href={`/siswa/dashboard`}>
            <p className="text-2xl font-semibold">
              <FontAwesomeIcon icon={faArrowLeft} />
            </p>
          </Link>
        </div>
      </header>
      <div className=" flex justify-between p-4">
        <div className=" p-4 bg-white rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {data?.judul}
              </h1>
              <p className="text-gray-500">{data?.created_by.nama}</p>
            </div>
          </div>
          <div className="mt-4 text-gray-700">
            <p>
              <strong>Subject:</strong>
            </p>
            <p>{striptags(data?.subject)}</p>
          </div>
          <div className="mt-4">
            <p>
              <strong>Files:</strong>
            </p>
            <div className="flex items-center justify-center border border-slate-200 p-2 rounded-md">
              {data?.files ? (
                <a
                  href={data?.files}
                  target="_blank"
                  className="font-semibold"
                >
                  {data?.files.split("/").pop()}
                </a>
              ) : (
                <span className="font-semibold">No file available</span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white border  border-gray-200 h-[150px] p-4 rounded-md w-[300px]">
          <h2 className="text-lg font-bold">Your work</h2>
          <div className="space-y-4 mt-5">
            <button
              onClick={() => route.push(`/siswa/${data?.id}/submit`)}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTugas;
