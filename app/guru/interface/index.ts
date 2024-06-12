import { BaseResponseSuccess } from "@/lib/axiosClient";
import { number, string } from "yup";

interface Class {
  id?: number;
  nama_kelas: string;
  subject?: string;
  code?: string;
  created_by: {
    id: number;
    nama: string;
    avatar?: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };

  tugas_by: tugas_by[];
  join_by: join_by[];

}

interface tugas_by {
  id: number;
  judul: string;
  subject: string;
  created_at: string;
  updated_at: string;
}

interface join_by {
  id: number;
  username: string;
  avatar?: string;
}

export interface Tugas {
  id?: number;
  judul: string;
  files?: string | any;
  subject?: string | any;
  created_by: {
    id: number;
    nama: string;
  };

  class_by: {
    id: number;
    nama_kelas: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };

  created_at: string;
  updated_at: string;
}

export interface ClassList extends BaseResponseSuccess {
  data: Class[];
}

export interface TugasList extends BaseResponseSuccess {
  data: Tugas[];
}

export interface ClassListFilter extends Partial<Class> {
  page: number;
  pageSize: number;
}

export interface ClassCreatePayload
  extends Pick<Class, "nama_kelas" | "subject"> {}

export interface TugasCreatePayload
  extends Pick<Tugas, "judul" | "subject" | "files"> {
  file?: File;
}

export interface TugasUpdatePayload
  extends Pick<Tugas, "judul" | "subject" | "files" | "id"> {
  file?: File;
}

export interface TugasDetailResponse extends Tugas {}

export interface ClassDetailResponse extends Class {}
export interface ClassUpdateResponse {
  status: string;
  message: string;
  data?: Class;
}

export interface TugasUpdateResponse {
  status: string;
  message: string;
  data?: Tugas;
}

export interface ClassUpdatePayload
  extends Pick<Class, "nama_kelas" | "subject" | "id"> {}
