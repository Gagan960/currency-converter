const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BRL: "BR",
  BSD: "BS",
  CAD: "CA",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  EGP: "EG",
  EUR: "FR",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KRW: "KR",
  LKR: "LK",
  MAD: "MA",
  MXN: "MX",
  MYR: "MY",
  NOK: "NO",
  NZD: "NZ",
  PHP: "PH",
  PKR: "PK",
  RUB: "RU",
  SAR: "SA",
  SEK: "SE",
  SGD: "SG",
  USD: "US",
  ZAR: "ZA",
};

// Populate the dropdowns
const dropdowns = document.querySelectorAll(".dropdown select");
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}

// Update flags dynamically
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Add change event listener to update flag when the currency is changed
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

// Get exchange rate on button click
const btn = document.getElementById("convert-btn");
const msg = document.querySelector(".msg");

// Use ExchangeRate-API to fetch exchange rates
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  try {
    // Use ExchangeRate-API to get the rate
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`);
    const data = await response.json();
    const rate = data.rates[toCurr.value];
    const finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Error fetching exchange rate. Please try again.";
  }
};

// Add event listener to the button
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Update exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
