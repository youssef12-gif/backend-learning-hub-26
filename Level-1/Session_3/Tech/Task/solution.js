// ======================================================
// Part 1 — Student Weather Example (Callback Basics)
// ======================================================

// Simulate fetching weather using callback
function getWeather(city, callback) {
  console.log("Fetching weather...");

  setTimeout(() => {
    if (!city) {
      return callback("City name missing", null);
    }

    const temp = 27; // Example temperature
    callback(null, temp);
  }, 2000);
}

// Example callback usage:
getWeather("Cairo", (err, temp) => {
  if (err) return console.log("Error:", err);
  console.log(`Weather in Cairo: ${temp}°C`);
});

// ======================================================
// Part 2 — Callback Hell
// ======================================================

function getUser(callback) {
  console.log("Getting user...");
  setTimeout(() => {
    callback(null, { name: "Ahmed" });
  }, 1000);
}

function getLocation(user, callback) {
  console.log("Getting location...");
  setTimeout(() => {
    callback(null, "Cairo");
  }, 1000);
}

// Nested callbacks (callback hell)
getUser((err, user) => {
  if (err) return console.log(err);

  getLocation(user, (err, city) => {
    if (err) return console.log(err);

    getWeather(city, (err, temp) => {
      if (err) return console.log(err);

      console.log(
        `Final Result: ${user.name} lives in ${city} | Temp: ${temp}°C`
      );
    });
  });
});

// ======================================================
// Part 3 — Convert Weather to Promise
// ======================================================

function getWeatherPromise(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!city) return reject("City name missing");
      resolve(27);
    }, 1500);
  });
}

getWeatherPromise("Cairo")
  .then((temp) => console.log(`Promise resolved → Cairo: ${temp}°C`))
  .catch((err) => console.log(err));

// ======================================================
// Part 4 — Async / Await Version
// ======================================================

async function showWeather() {
  try {
    const temp = await getWeatherPromise("Cairo");
    console.log(`Weather (Async): ${temp}°C`);
  } catch (error) {
    console.log("Error:", error);
  }
}

showWeather();

// ======================================================
// Part 5 — Promise Chaining
// ======================================================

function getUserPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Ahmed" }), 1000);
  });
}

function getLocationPromise(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Cairo"), 1000);
  });
}

// Promise chain
getUserPromise()
  .then((user) => {
    console.log("User:", user.name);
    return getLocationPromise(user);
  })
  .then((city) => {
    console.log("Location:", city);
    return getWeatherPromise(city);
  })
  .then((temp) => console.log("Temp:", temp + "°C"))
  .catch((err) => console.log(err));

// ======================================================
// Part 6 — Async/Await Chain
// ======================================================

async function generateReport() {
  try {
    const user = await getUserPromise();
    const city = await getLocationPromise(user);
    const temp = await getWeatherPromise(city);

    console.log(
      `User ${user.name} | City: ${city} | Temperature: ${temp}°C`
    );
  } catch (error) {
    console.log("Error:", error);
  }
}

generateReport();

// ======================================================
// Part 7 — Bonus Full Report
// ======================================================

async function generateFullReport() {
  try {
    const user = await getUserPromise();
    const city = await getLocationPromise(user);
    const temp = await getWeatherPromise(city);

    console.log(`
╔════════════════════════════╗
║     WEATHER DATA REPORT    ║
╚════════════════════════════╝

User: ${user.name.toUpperCase()}
City: ${city.toUpperCase()}
Temperature: ${temp}°C

Status: Data fetched successfully ✔️
`);
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

generateFullReport();
