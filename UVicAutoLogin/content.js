chrome.storage.local.get(['username', 'ps', 'extensionEnabled'], function(login) {
  if (login.extensionEnabled){
    // uvicLogin(login.username, login.ps);
  }

  console.log('running')
  
  const loginInterval = setInterval(function(){
    const userInput = document.querySelector("#username");
    const psInput = document.querySelector("#password");

    document.querySelector('[for="username"]').click();

    console.log('running')
    if ((userInput.value !== '') && (psInput.value !== '')){
      loginSubmit();
      clearInterval(loginInterval);
    }
  }, 300);

  // timeout after 5 seconds of trying
  setTimeout(function(){
    clearInterval(loginInterval)
  }, 15000)
  
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

function uvicLogin2(){

}


function loginSubmit(){
  const submit = document.querySelector("#form-submit")
  if (submit) submit.click();
}
