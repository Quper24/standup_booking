export const displayClientInfo = (parent, clientData) => {
  parent.innerHTML += `
      <p class="booking__client-item">Имя: ${clientData.fullName}</p>
      <p class="booking__client-item">Телефон: ${clientData.phone}</p>
      <p class="booking__client-item">Номер билета: ${clientData.ticketNumber}</p>
  `;
};

export const displayBooking = (parent, clientData, comedians) => {
  const bookingList = document.createElement("ul");
  bookingList.classList.add("booking__list");
  // Формирование и добавление списка комиков
  const bookingComedians = clientData.booking.map((bookingComedian) => {
    const comedian = comedians.find(
      (comedian) => bookingComedian.comedian === comedian.id,
    );

    const performance = comedian.performances.find(
      (data) => bookingComedian.time === data.time,
    );

    return { comedian, performance };
  });

  bookingComedians.sort((a, b) => {
    return a.performance.time.localeCompare(b.performance.time);
  });

  const comedianElements = bookingComedians.map(({ comedian, performance }) => {
    const comedianElement = document.createElement("li");
    comedianElement.className = "booking__item";
    comedianElement.innerHTML += `
      <h3>${comedian.comedian}</h3>
      <p>Время: ${performance.time}</p>
      <button 
        class="booking__hall" type="button" 
        data-booking="${clientData.fullName} ${clientData.ticketNumber} ${clientData.ticketNumber} ${comedian.comedian} ${performance.time}">
          ${performance.hall}
      </button>
    `;
    return comedianElement;
  });

  bookingList.append(...comedianElements);
  parent.append(bookingList);
};
