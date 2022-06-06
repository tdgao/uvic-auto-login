chrome.storage.local.get(['username', 'password', 'extensionEnabled'], function(login) {
  if (login.extensionEnabled){
    uvicLogin(login.username, login.password);
  }
});

function uvicLogin(username, password) {
  const userInput = document.querySelector("#username");
  if (userInput) userInput.value = username;

  const passwordInput = document.querySelector("#password")
  if (passwordInput) passwordInput.value = password;

  const rememberMe = document.querySelector("#rememberMe")
  if (rememberMe) rememberMe.checked = true;

  const submit = document.querySelector("#form-submit")
  if (submit) submit.click();
}
