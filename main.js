
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let exist = document.getElementById("exist");


let users = JSON.parse(localStorage.getItem("users")) || [];

function signUp() {
  let name = signupName.value.trim();
  let email = signupEmail.value.trim();
  let password = signupPassword.value;

  if (name === "" || email === "" || password === "") {
    exist.innerText = "All fields are required";
    exist.classList.add("text-danger");
    return;
  }

  let isExist = users.some((user) => user.email === email);
  if (isExist) {
    exist.innerText = "Email already exists. Try another one.";
    exist.classList.add("text-danger");
    return;
  }

  if (!validateEmail(email)) {
    exist.innerText = "Email is not valid";
    exist.classList.add("text-danger");
    return;
  }

  let newUser = { name, email, password };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  exist.innerText = "✅ Registered Successfully!";
  exist.classList.remove("text-danger");
  exist.classList.add("text-success");
};


function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


// loginPage
function login() {
  let email = document.getElementById("signinEmail").value.trim();
  let password = document.getElementById("signinPassword").value;
  let message = document.getElementById("signinMessage");

  
  let users = JSON.parse(localStorage.getItem("users")) || [];

  
  let currentUser = users.find((user) => user.email === email && user.password === password);

  if (email === "" || password === "") {
    message.innerText = "All fields are required";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  } else if (!currentUser) {
    message.innerText = "Incorrect email or password";
    message.classList.remove("text-success");
    message.classList.add("text-danger");
  } else {
    
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    window.location.href = "home.html";
  }
};

//homePage
window.addEventListener("DOMContentLoaded", () => {
  
  if (document.getElementById("home")) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const username = document.getElementById("username");
    if (!user) {
      window.location.href = "index.html";
    } else {
      username.innerText = `Welcome ${user.name}`;
    }
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
});
