import QRCode from "qrcode";

// Функция для отображения QR-кода
const displayQRCode = (data) => {
  console.log("data: ", data);
  const modal = document.querySelector(".modal");
  const canvas = document.getElementById("qrCanvas");
  const closeButton = document.querySelector(".close-button");

  QRCode.toCanvas(canvas, data, function (error) {
    if (error) console.error(error);
    console.log("QR код успешно создан!");
  });

  modal.classList.add("modal_show");

  closeButton.addEventListener("click", () => {
    modal.classList.remove("modal_show");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.remove("modal_show");
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
  });
};

export const showQrController = (bookingPerfomance) => {
  bookingPerfomance.addEventListener("click", ({ target }) => {
    if (target.closest(".booking__hall")) {
      const bookingData = target.dataset.booking;
      displayQRCode(bookingData); // Функция для отображения QR-кода
    }
  });
};
