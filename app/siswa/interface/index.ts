import { Tugas } from "@/app/guru/interface";
import { BaseResponseSuccess } from "@/lib/axiosClient";
interface JoinClass {
  code?: string | number;
}

interface SubmitTugas {
  id?: number;
  files?: string;
}

export interface JoinPayload extends Pick<JoinClass, "code"> {}

export interface SubmitPayload extends Pick<SubmitTugas, "files"> {
  file? : File
}

export interface SiswaResponse {
  status: string;
  message: string;
  data?: JoinClass;
}

export interface TugasDetailResponse extends Tugas {}


export interface SubmitResponse {
  status: string;
  message: string;
  data?: SubmitTugas;
}
