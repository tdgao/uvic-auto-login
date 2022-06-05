chrome.storage.local.get(['username', 'ps', 'savedLogin'], function(login) {
  if (login.savedLogin){
    setLogin(login.username, login.ps);
  }
  
  // submit login form if inputs are not empty
  // attempt for 15 seconds
  const loginInterval = setInterval(function(){
    const userInput = document.querySelector("#username");
    const psInput = document.querySelector("#password");

    if ((userInput.value !== '') && (psInput.value !== '')){
      loginSubmit();
      clearInterval(loginInterval);
    }

  }, 300);

  // timeout after 15 seconds of login submits
  setTimeout(function(){
    clearInterval(loginInterval);
  }, 15000);
  
});


function setLogin(username, ps) {
  const userInput = document.querySelector("#username");
  if (userInput) userInput.value = username;

  const psInput = document.querySelector("#password")
  if (psInput) psInput.value = ps;

  const rememberMe = document.querySelector("#rememberMe")
  if (rememberMe) rememberMe.checked = true;
}

function loginSubmit(){
  const submit = document.querySelector("#form-submit")
  if (submit) submit.click();
}
