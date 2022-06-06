// set login info to chrome session storage
// assume username and password inputs exist
async function setLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // save login to storage (local disk)
  await chrome.storage.local.set({
    'username': username,
    'password': password,
    // 'extensionEnabled': false
  });
}


function goToPage(pageId){
  const page = document.querySelector(`[data-page-id="${pageId}"]`)
  if (!page){
    console.error('Error, page not found by pageId');
    return;
  }

  // all pages hidden except current
  // remove 'current' tag from all pages
  document.querySelectorAll('.current[data-page-id]').forEach(page => {
    page.classList.remove('current');
  });
  // add 'current' to given page
  page.classList.add('current');
}


//toggle password visibility
function showPassword(checkbox){
  var password = document.getElementById("password");
  if (checkbox.checked) password.type = "text";
  else password.type = "password";
}


async function toggleExtension(forceToggle = false){
  const enabledObj = await chrome.storage.local.get('extensionEnabled');
  const enabled = enabledObj["extensionEnabled"];

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


async function to_postSetupState(){
  // change all save btns to update btns
  document.getElementById('goto-set-up-login').classList.add('hidden');
  document.getElementById('goto-update-login').classList.remove('hidden');

  document.getElementById('save-login').classList.add('hidden');
  document.getElementById('update-login').classList.remove('hidden');

  // show toggle extension btn
  document.getElementById('toggle-extension').classList.remove('hidden');

  await chrome.storage.local.set({
    'state': 'postSetup'
  });
}


// event listeners //
function addListeners(){
  // set login listener //
  // add on both save and update login btns
  const saveLogin = document.getElementById('save-login');
  const updateLogin = document.getElementById('update-login');
  [saveLogin, updateLogin].forEach(btn => {
  
    btn.addEventListener('click', () => {
      setLogin().then( () => {
        document.getElementById('login-set-msg').classList.remove('hidden'); // show saved! msg
    
        to_postSetupState(); // always to non-onboard state
        toggleExtension(true); // force extension enabled
      });
    });
  
  });

  // show password
  document.getElementById('showPassword').addEventListener('click', (e) => {
    showPassword(e.target);
  });

  // toggle extension
  document.getElementById('toggle-extension').addEventListener('click', () =>{
    toggleExtension();
  });


  // page nav listeners //
  // go to set login page/form
  document.getElementById('goto-set-up-login').addEventListener('click', () => {
    goToPage('login-form');
  });
  document.getElementById('goto-update-login').addEventListener('click', () => {
    goToPage('login-form');
  });
  // go back to main
  document.getElementById('login-form-back-btn').addEventListener('click', () => {
    goToPage('main');
    document.getElementById('login-set-msg').classList.add('hidden'); // hide login saved msg
  });
}



// init
async function init(){
  addListeners()

  const state = await chrome.storage.local.get('state');
  if (state.state === 'postSetup'){
    await to_postSetupState();
    
    // setting extension status display to match storage value
    const enabledObj = await chrome.storage.local.get('extensionEnabled');
    const enabled = enabledObj["extensionEnabled"];

    const statusDiv = document.getElementById('extension-status');
    if (enabled) statusDiv.classList.remove('disabled');
    else statusDiv.classList.add('disabled');
  }

}
init();