"use client";
import useAuthModule from "@/app/auth/lib";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function PersonalInfo() {
  const { useProfile } = useAuthModule();
  const { data: profile } = useProfile();
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
      <section className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Personal info</h2>
          <p className="text-gray-600 mb-6">
            Some info may be visible to other people using .
          </p>
          <div className="mb-6">
            <div className="flex flex-col gap-2 items-center">
              <picture>
                <img
                  className="rounded-full object-cover w-[100px] h-[100px]"
                  src={
                    profile?.data.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt=""
                  draggable="false"
                />
              </picture>
              <span className="ml-4">
                A profile picture helps personalize your account
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Name</span>
              <span className="font-medium">{profile?.data.nama}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{profile?.data.email}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Jabatan</span>
              <span className="font-medium">{profile?.data.username}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Role</span>
              <span className="font-medium">{profile?.data.role}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
