export default class Api {
  baseAddress = "https://test-royalfut.com/";

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
}
