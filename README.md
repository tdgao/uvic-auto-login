# UVic Auto Login
Since UVic does not have a 'stay signed in' option, it can get annoying to sign in everyday. This Chrome Extension automates the UVic login process so the user can stay signed in continuously.

It is strongly encouraged to change your UVic password so it's not the same as your other passwords.

## Features
* Automatically log into UVic services.
* Prevent session from expiring in LIM (works without saving login).

## Security risks
* Login is stored only on your local disk drive and is NOT encrypted.
*  Data is vulnerable if you have installed any other extensions that have permissions to the chrome.debugger API. 
* To permanently remove saved credentials, simply remove the extension.

## Installation
Use the following instructions to install this extenion manually.

1. Download and unzip files.
2. In Chrome, open the Extensions settings. (Wrench button -> Tools -> Extensions. Or type `chrome://extensions` in the address bar.)
3. On the Extensions settings page, click the "Developer Mode" checkbox.
4. Click the now-visible "Load unpacked extension…" button. Navigate to the directory of download and select the uvic-auto-login folder.
5. The extension should now be visible in your extensions list.
