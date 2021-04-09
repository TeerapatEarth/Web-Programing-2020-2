const axios = require("axios");

// Make a request for a user with a given ID
axios
  .get("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
  .then(function (response) {
    // handle success
    // console.log(response.data);
    console.log("Axios - promise:", response.data.joke);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

async function getJoke() {
  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    console.log("Axios - async/await:", response.data.joke);
  } catch (err) {
    console.log(err)
  }
}

getJoke()
