const form = document.querySelector("#my-form");
console.log(form);
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const contact = form.elements["contact"].value;
  const image = form.elements["image"].files[0];
  const price = form.elements["price"].value;

  if (name === "" || email === "" || contact === "" || image === undefined) {
    alert("Please fill in all required fields");
    return;
  }

  if (isNaN(parseInt(contact))) {
    alert("Please enter a valid contact number");
    return;
  }
  if (isNaN(parseInt(price))) {
    alert("Please enter a valid price");
    return;
  }
  // console.log(`Name: ${name}`);
  // console.log(`Email: ${email}`);
  // console.log(`Contact: ${contact}`);
  // console.log(`Image File:`, image);
});

// back button
function goHome() {
  location.replace(".././index.html");
}
