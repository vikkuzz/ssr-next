export async function fbAuth() {
  // eslint-disable-next-line no-unused-vars
  function testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    FB.api("/me", () => {});
  }

  function statusChangeCallback(response) {
    // Called with the results from FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your webpage and Facebook.
      // gtm dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        action: "Registration",
        category: "SignUp",
        event: "CustomEvent",
      });

      // testAPI();
    } else {
      // Not logged into your webpage or we are unable to tell.
      // console.debug(response);
    }
  }

  let fbScript = document.createElement("script");
  fbScript.onload = async () => {
    await FB.init({
      appId: "498453708184424",
      status: true,
      cookie: true, // Enable cookies to allow the server to access the session.
      xfbml: true, // Parse social plugins on this webpage.
      version: "v12.0", // Use this Graph API version for this call.
    });

    await FB.getLoginStatus((response) => {
      // Called after the JS SDK has been initialized.
      statusChangeCallback(response); // Returns the login status.
    });

    await FB.login(
      (response) => {
        if (response.status === "connected") {
          authToken(response.authResponse.accessToken, "facebook");
        } else {
          // The person is not logged into your webpage or we are unable to tell.
        }
      },
      { scope: "public_profile,email" }
    );
  };

  fbScript.src = `https://connect.facebook.net/en-EN/sdk.js`;
  fbScript.defer = true;
  fbScript.crossOrigin = "anonymous";
  document.head.appendChild(fbScript);
}
