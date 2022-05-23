import Swal from "sweetalert2";
const swal = {
  infoMessage(message: string) {
    Swal.fire(message);
  },
  confirmationMessage(message: string, callBackFunction: Function) {
    Swal.fire({
      title: "Confirmación",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) callBackFunction();
    });
  },
  errorMessage(message: string) {
    Swal.fire({
      icon: "error",
      title: "Alerta",
      text: message,
    });
  },
};

export default swal;
