// This extension forces Azure/Microsoft login to always show the account picker
// by appending prompt=select_account to the login URL query parameters.

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    // Skip if already has prompt=select_account or prompt=login
    const currentPrompt = url.searchParams.get("prompt");
    if (currentPrompt === "select_account" || currentPrompt === "login") {
      return;
    }

    // Skip non-authorize endpoints (token exchanges, logout, etc.)
    if (!url.pathname.includes("/oauth2") || 
        (!url.pathname.includes("/authorize") && !url.pathname.includes("/v2.0/authorize"))) {
      // Also handle common login paths
      if (!url.pathname.includes("/login") && !url.pathname.includes("/reprocess")) {
        return;
      }
    }

    // Force account selection
    url.searchParams.set("prompt", "select_account");

    console.log("[Azure Account Picker] Redirecting to account selection:", url.toString());

    return { redirectUrl: url.toString() };
  },
  {
    urls: [
      "https://login.microsoftonline.com/*",
      "https://login.live.com/*",
      "https://login.windows.net/*"
    ],
    types: ["main_frame", "sub_frame"]
  },
  ["blocking"]
);

// Manifest V3 fallback: use declarativeNetRequest rules (defined in rules.json)
// The webRequest listener above works as a secondary mechanism.
// Primary interception is via declarative rules for MV3 compatibility.

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Azure Account Picker] Extension installed - account selection will be forced on Azure login.");
});
