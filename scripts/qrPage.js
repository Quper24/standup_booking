// Импортируем необходимые функции
import { Notification } from "./Notification";
import { getClients, getComedians } from "./api";
import { displayClientInfo, displayBooking } from "./display"; // Предполагается, что эти функции у вас есть
import { showQrController } from "./showQrController";

// Получение номера билета из URL
const getTicketNumberFromUrl = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("t");
};

// Функция для инициализации страницы qr.html
export const initQrPage = async () => {
  const clientInfo = document.querySelector(".booking__client-info"); // Предполагается, что у вас есть такой элемент в HTML
  const bookingPerfomance = document.querySelector(".booking__perfomance"); // Предполагается, что у вас есть такой элемент в HTML

  const ticketNumber = getTicketNumberFromUrl();
  if (ticketNumber) {
    const clientData = await getClients(ticketNumber);
    displayClientInfo(clientInfo, clientData);
    const comediansData = await getComedians();
    displayBooking(bookingPerfomance, clientData, comediansData);

    showQrController(bookingPerfomance);
  } else {
    Notification.getInstance().show("Произошла ошибка, проверьте ссылку");
  }
};
