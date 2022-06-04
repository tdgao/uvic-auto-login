chrome.storage.local.get(['username', 'ps', 'extensionEnabled'], function(login) {
  if (login.extensionEnabled){
    uvicLogin(login.username, login.ps);

  }
});


function uvicLogin(username, ps) {
  // console.log('logging in with:', username, ps);

  const userInput = document.querySelector("#username");
  if (userInput) userInput.value = username;
  const psInput = document.querySelector("#password")
  if (psInput) psInput.value = ps;

  const rememberMe = document.querySelector("#rememberMe")
  if (rememberMe) rememberMe.checked = true;

  const submit = document.querySelector("#form-submit")
  if (submit) submit.click();
}