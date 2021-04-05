import { useToasts } from "react-toast-notifications";

export const ShowToastMsg = ({ data }) => {
  const { addToast } = useToasts();
  addToast(`${data.message}`, {
    appearance: `${data.status}`,
    autoDismiss: true,
  });
};
