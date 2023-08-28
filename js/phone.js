const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const container = document.getElementById("container");

  container.textContent = "";

  const shoMoreBtn = document.getElementById("shoMoreBtn");

  if (phones.length > 15) {
    shoMoreBtn.classList.remove("hidden");
  } else {
    shoMoreBtn.classList.add("hidden");
  }

  phones = phones.slice(0, 15);

  phones.forEach((phones) => {
    // console.log(phones);

    const { brand, image, phone_name, slug } = phones;
    const phoneCards = document.createElement("div");
    phoneCards.innerHTML = `<div class="card p-4 bg-base-100 shadow-xl">
    <figure><img src="${image}" alt="Shoes" /></figure>
    <div class="card-body text-center">
      <h2 class="card-title justify-center">${phone_name}</h2>
      <p>${brand}</p>
      <div class="card-actions justify-center">
      <button onclick="showMore('${slug}');" class="btn btn-primary">Show Details</button>
      </div>
    </div>
  </div>`;
    container.appendChild(phoneCards);
  });
  loadingSpinner(false);
};

// !handle search button

const searchBtnClick = () => {
  // const searchBtn = document.getElementById("searchBtn");
  loadingSpinner(true);
  const inputValue = document.getElementById("inputValue");
  const inputText = inputValue.value;
  //   console.log(inputText);
  loadPhone(inputText);
};

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const showMore = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerHTML = phone.name;

  const showDetailContainer = document.getElementById("showDetailContainer");
  showDetailContainer.innerHTML = `
  <img class="text-center" src="${phone.image}" alt="">
  <p><span><b>Storege</b> :${phone?.mainFeatures.storage}</span></p>
  <p><b>Display Size</b> :${phone.mainFeatures.displaySize}</p>
  <p><b>ChipSet</b> :${phone.mainFeatures.chipSet}</p>
  <p><b>Brand</b> :${phone.brand}</p>
  `;

  show_details_modal.showModal();
  console.log(phone);
};
