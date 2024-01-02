const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let code in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = code;
    newOptions.value = code;

    if (select.name === "from" && code === "AED") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && code === "PKR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}
let updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
let updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  let url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = rate * amtVal;
  // let newValFrom=(Math.round(amtVal*100)/100).toFixed(2)
  let newValTo = (Math.round(finalAmount * 100) / 100).toFixed(2);
  msg.innerText = `${amtVal}${fromCurr.value} = ${newValTo}${toCurr.value}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
