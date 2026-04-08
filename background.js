// This extension forces Azure/Microsoft login to always show the account picker
// by appending prompt=select_account to the login URL query parameters.
// Uses declarativeNetRequest rules (defined in rules.json) for MV3 compatibility.

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Azure Account Picker] Extension installed - account selection will be forced on Azure login.");
});
