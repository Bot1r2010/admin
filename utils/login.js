const elForm = document.querySelector(".form");
const api = "https://fakestoreapi.com/auth/login";

const handleSubmit = (e) => {
  e.preventDefault();

  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();

  const user = {
    username,
    password,
  };

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("success");
        window.location.href = "../pages/dashboard.html";
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Login error");
    });

  console.log(username, password);
};

elForm.addEventListener("submit", handleSubmit);