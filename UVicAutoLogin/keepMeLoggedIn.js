// using following stack overflow guide to inject code into document (to access keepMeLoggedInClicked)
// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879

const actualCode = `
console.log('setting keep logged in interval')
setInterval(function(){
  keepMeLoggedInClicked();
  console.log('keeping logged in')
}, 900 * 1000);
`;

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');