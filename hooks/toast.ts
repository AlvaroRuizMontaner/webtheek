import { useEffect } from "react"
import { toast } from "react-toastify";

export const useToastSuccess = (id="customId"): void => {
    useEffect(() => {
        const message = localStorage.getItem('toastMessage');
        if (message) {
          console.log(message)
            toast.success(message, {
                toastId: id
            });
            setTimeout(() => {
              localStorage.removeItem('toastMessage');
            },1000)
        }
    }, []);
}