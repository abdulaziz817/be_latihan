import { useToast as chakraUseToast } from "@chakra-ui/react";

export const useToast = () => {
  const toast = chakraUseToast(); // Gunakan useToast dari Chakra UI

  const toastSuccess = (message: any) => {
    toast({
      title: message,
      status: "success",
      position: "bottom-right",
      isClosable: true,
    });
  };

  const toastWarning = (message: any) => {
    toast({
      title: message,
      status: "warning",
      position: "bottom-right",
      isClosable: true,
    });
  };

  const toastError = () => {
    toast({
      title: "Maaf ada kesalahan",
      status: "error",
      position: "bottom-right",
      isClosable: true,
    });
  };

  return { toastError, toastWarning, toastSuccess };
};
