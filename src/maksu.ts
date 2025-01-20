import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe("YOUR_PUBLIC_STRIPE_KEY");

const paymentForm = document.getElementById("paymentForm") as HTMLFormElement;
paymentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const product = (document.getElementById("product") as HTMLInputElement).value;
  const amount = parseFloat((document.getElementById("amount") as HTMLInputElement).value);

  const cardElement = stripe!.elements().create("card");
  cardElement.mount("#card-element");

  const { token, error } = await stripe!.createToken(cardElement);

  if (error) {
    const cardErrors = document.getElementById("card-errors")!;
    cardErrors.textContent = error.message!;
  } else {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, product, amount, token }),
    });

    if (response.ok) {
      alert("Payment successful!");
    } else {
      alert("Payment failed.");
    }
  }
});
