export default class Api {
  baseAddress = "https://test-royalfut.com/";

  getStock = async () => {
    let urlForStock =
      window.location.origin.indexOf("localhost") >= 0 ||
      window.location.origin.indexOf("vercel") >= 0 ||
      window.location.origin.indexOf("192.168") >= 0 ||
      window.location.origin.indexOf("linestest.com") >= 0 ||
      window.location.origin.indexOf("ngrok.io") >= 0 ||
      window.location.origin.indexOf("bs-local.com") >= 0
        ? "https://test-royalfut.com"
        : window.location.origin;

    const res = await fetch(`${urlForStock}/api/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: '{"ip": ""}',
    });
    const result = await res.json();
    return result;
  };

  registration = async (userEmail, userPass) => {
    console.log("apiapi");
    let headers = {
      "Content-Type": "application/json",
    };
    const res = await fetch(`${this.baseAddress}api/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          userLocale: "ru",
          region: "RU",
          email: userEmail,
          password: userPass,
          signUpCheck: "on",
        },
      }),
    });
    const result = await res.json();
    return result;
  };
  login = async (userEmail, userPass) => {
    console.log("login");
    let headers = {
      "Content-Type": "application/json",
    };
    const res = await fetch(`${this.baseAddress}api/users/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          userLocale: "ru",
          region: "RU",
          email: userEmail,
          password: userPass,
        },
      }),
    });
    const result = await res.json();
    return result;
  };
}
