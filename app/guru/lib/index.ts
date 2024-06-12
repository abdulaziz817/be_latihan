"use client";
import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import {
  ClassCreatePayload,
  ClassDetailResponse,
  ClassList,
  ClassListFilter,
  ClassUpdatePayload,
  ClassUpdateResponse,
  TugasCreatePayload,
  TugasDetailResponse,
  TugasList,
  TugasUpdatePayload,
  TugasUpdateResponse,
} from "../interface";
import useUploadFile from "@/hook/useUploadFile";

const useGuruModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };
  const getClasslist = async (params: ClassListFilter): Promise<ClassList> => {
    return axiosAuthClient
      .get("/class/list", { params })
      .then((res) => res.data);
  };
  const useClassList = () => {
    const { filterParams } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/class/list", [filterParams]],
      () => getClasslist(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };

  const getTugaslist = async (params: ClassListFilter): Promise<TugasList> => {
    return axiosAuthClient
      .get("/tugas/list", { params })
      .then((res) => res.data);
  };
  const useTugasList = () => {
    const { filterParams } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/tugas/list", [filterParams]],
      () => getTugaslist(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };

  const createClass = (
    payload: ClassCreatePayload
  ): Promise<ClassUpdateResponse> => {
    return axiosAuthClient
      .post(`/class/create-class`, payload)
      .then((res) => res.data);
  };

  const useCreateClass = () => {
    const { isLoading, mutate } = useMutation(
      (payload: ClassCreatePayload) => createClass(payload),
      {
        onSuccess: (response) => {
          console.log("first");
          queryClient.invalidateQueries(["/class/list"]);
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const createTugas = async (
    payload: TugasCreatePayload,
    id: number
  ): Promise<ClassUpdateResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        files: res.data.file_url,
      };
    }
    return axiosAuthClient
      .post(`/tugas/${id}/create-tugas`, payload)
      .then((res) => res.data);
  };

  const useTugasClass = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: TugasCreatePayload) => createTugas(payload, id),
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

  const getDetailClass = async (id: string): Promise<ClassDetailResponse> => {
    return axiosAuthClient
      .get(`/class/detail/${id}`)
      .then((res) => res.data.data);
  };

  const useDetailClass = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/class/detail", { id }],
      () => getDetailClass(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const updateClass = (
    payload: ClassUpdatePayload,
    id: number
  ): Promise<ClassUpdateResponse> => {
    return axiosAuthClient
      .put(`/class/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateClass = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: ClassUpdatePayload) => updateClass(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const updateTugas = (
    payload: TugasUpdatePayload,
    id: number
  ): Promise<TugasUpdateResponse> => {
    return axiosAuthClient
      .put(`/tugas/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateTugas = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: TugasUpdatePayload) => updateTugas(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          console.log("error", gagal);
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

  const useDelete = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/class/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/class/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const useDeleteTugas = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/tugas/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/tugas/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useClassList,
    useDetailClass,
    useCreateClass,
    useDelete,
    useUpdateClass,
    useTugasClass,
    useTugasList,
    useDeleteTugas,
    useUpdateTugas,
    useDetailTugas,
  };
};

export default useGuruModule;
