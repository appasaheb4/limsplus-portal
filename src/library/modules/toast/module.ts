import {toast} from 'react-toastify';
class Toast {
  success = async details => {
    toast.success(details.message, {
      position: 'bottom-right',
      autoClose: details.timer || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  error = async details => {
    toast.error(details.message, {
      position: 'bottom-right',
      autoClose: details.timer || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  warning = async details => {
    toast.warning(details.message, {
      position: 'bottom-right',
      autoClose: details.timer || 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
}
export default new Toast();
