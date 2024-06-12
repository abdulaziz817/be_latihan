import useAxiosAuth from "@/hook/useAuthAxios";
import { useToast } from "@/hook/useToast";
import useUploadFile from "@/hook/useUploadFile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JoinPayload, SiswaResponse, SubmitPayload, SubmitResponse, TugasDetailResponse } from "../interface";
import { ClassUpdateResponse } from "@/app/guru/interface";

const useSiswaModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };


  const JoinClass = async (
    payload: JoinPayload,
  ): Promise<SiswaResponse> => {
    return axiosAuthClient
      .post(`/class/join`, payload)
      .then((res) => res.data);
  };

  const useJoinClass = () => {
    const { isLoading, mutate } = useMutation(
      (payload: JoinPayload) => JoinClass(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries(["/class/list"]);
        },
        onError: (gagal) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const getDetailTugas = async (id: string): Promise<TugasDetailResponse> => {
    return axiosAuthClient
      .get(`/tugas/detail-tugas/${id}`)
      .then((res) => res.data.data);
  };

  const useDetailTugas = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/tugas/detail-tugas", { id }],
      () => getDetailTugas(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  
  const createSubmit = async (
    payload: SubmitPayload,
    id: number
  ): Promise<SubmitResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        files: res.data.file_url,
      };
    }
    return axiosAuthClient
      .post(`/pengumpulan/${id}/submit`, payload)
      .then((res) => res.data);
  };

  const useSubmitAssingmet = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: SubmitPayload) => createSubmit(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries(["/tugas/list"]);
        },
        onError: (gagal) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };


  return {
    useJoinClass,
    useDetailTugas,
    useSubmitAssingmet
  }
};


export default useSiswaModule;
