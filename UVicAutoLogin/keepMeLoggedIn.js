// console.log('setting keep logged in interval')
// setInterval(function(){
//   keepMeLoggedInClicked();
//   console.log('keeping logged in')
// }, 3000);

var actualCode = `
console.log('setting keep logged in interval')
setInterval(function(){
  keepMeLoggedInClicked();
  console.log('keeping logged in')
}, 900 * 1000);
`;

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');