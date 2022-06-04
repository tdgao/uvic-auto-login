// set login info to chrome session storage
async function setLogin() {
  const usernameInput = document.getElementById('username');
  let username = null;
  if (usernameInput) username = usernameInput.value;

  const passwordInput = document.getElementById('password');
  let password = null;
  if (passwordInput) password = passwordInput.value;

  // writing
  console.log('setting to session:', username, password);
  await chrome.storage.local.set({
    'username': username,
    'ps': password,
    // 'extensionEnabled': false
  });

  return true
}


function goToPage(pageId){
  const page = document.querySelector(`[data-page-id="${pageId}"]`)
  if (!page){
    console.error('Error, page not found');
    return;
  }

  // remove 'current' tag from all pages & add 'current' to given page
  document.querySelectorAll('.current[data-page-id]').forEach(page => {
    page.classList.remove('current');
  });
  page.classList.add('current');
}

//toggle to show/hide password
function showPS(checkbox){
  var ps = document.getElementById("password");
  if (checkbox.checked) ps.type = "text";
  else ps.type = "password";
}


async function toggleExtension(forceToggle = false){
  let enabled = await chrome.storage.local.get('extensionEnabled');
  console.log(enabled)

  enabled = enabled["extensionEnabled"];
  console.log(enabled)

  // change status
  const status = document.getElementById('extension-status');
  if (!enabled || forceToggle) {
    status.classList.remove('disabled');
    await chrome.storage.local.set({ 'extensionEnabled': true });
  }
  else {
    status.classList.add('disabled');
    await chrome.storage.local.set({ 'extensionEnabled': false });
  }
}

async function to_nonOnboardState(){
  // change all save btns to update btns
  document.getElementById('goto-set-up-login').classList.add('hidden');
  document.getElementById('goto-update-login').classList.remove('hidden');

  document.getElementById('save-login').classList.add('hidden');
  document.getElementById('update-login').classList.remove('hidden');

  // show toggle extension btn
  document.getElementById('toggle-extension').classList.remove('hidden');

  await chrome.storage.local.set({
    'state': 'nonOnboard'
  });
}


// event listeners //
// set/save/update login info, added to both save and update btns
[document.getElementById('save-login'), document.getElementById('update-login')].forEach(btn => {

  btn.addEventListener('click', () => {
    setLogin().then( res => {
      if (!res){
        console.log('Error, login failed');
        return;
      }
  
      console.log('login saved');
      document.getElementById('login-set-msg').classList.remove('hidden'); // show saved! msg
  
      // always to non-onboard state
      to_nonOnboardState();
        
      // set extension enabled
      toggleExtension(true);
    });
  });

});




// go to set login page
document.getElementById('goto-set-up-login').addEventListener('click', () => {
  goToPage('login-form');
});
document.getElementById('goto-update-login').addEventListener('click', () => {
  goToPage('login-form');
});
document.getElementById('login-form-back-btn').addEventListener('click', () => {
  goToPage('main');
  document.getElementById('login-set-msg').classList.add('hidden'); // hide saved! msg
});

// toggle extension
document.getElementById('toggle-extension').addEventListener('click', () =>{
  toggleExtension();
});

// show ps
document.getElementById('showPS').addEventListener('click', (e) => {
  showPS(e.target);
});


// init
async function init(){
  const state = await chrome.storage.local.get('state');
  if (state.state === 'nonOnboard'){
    await to_nonOnboardState();

    // setting extension status - to match storage value
    let enabled = await chrome.storage.local.get('extensionEnabled');
    enabled = enabled["extensionEnabled"];

    const status = document.getElementById('extension-status');
    if (enabled) status.classList.remove('disabled');
    else status.classList.add('disabled');
  }
}
init();