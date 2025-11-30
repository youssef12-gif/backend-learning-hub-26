//-----------------------------------------------------------
// Part 1 — Callback Basics (TypeScript)
//-----------------------------------------------------------

function getWeather(
  city: string,
  callback: (err: string | null, temp: number | null) => void
): void {
  console.log("Fetching weather...");

  setTimeout(() => {
    if (!city) return callback("City name missing", null);
    const temp: number = 27;
    callback(null, temp);
  }, 2000);
}

// Example
getWeather("Cairo", (err, temp) => {
  if (err) return console.log("Error:", err);
  console.log(`Weather in Cairo: ${temp}°C`);
});

//-----------------------------------------------------------
// Part 2 — Callback Hell Simulation
//-----------------------------------------------------------

interface User {
  name: string;
}

function getUser(callback: (err: string | null, user: User | null) => void): void {
  console.log("Getting user...");
  setTimeout(() => callback(null, { name: "Ahmed" }), 1000);
}

function getLocationCallback(
  user: User,
  callback: (err: string | null, city: string | null) => void
): void {
  console.log("Getting location...");
  setTimeout(() => callback(null, "Cairo"), 1000);
}

// Nested Callbacks
getUser((err, user) => {
  if (err || !user) return console.log(err);

  getLocationCallback(user, (err, city) => {
    if (err || !city) return console.log(err);

    getWeather(city, (err, temp) => {
      if (err || temp === null) return console.log(err);

      console.log(`Final Result: ${user.name} lives in ${city} | Temp: ${temp}°C`);
    });
  });
});

//-----------------------------------------------------------
// Part 3 — Convert Callback to Promise
//-----------------------------------------------------------

function getWeatherPromise(city: string): Promise<number> {
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

//-----------------------------------------------------------
// Part 4 — Async / Await Version
//-----------------------------------------------------------

async function showWeather(): Promise<void> {
  try {
    const temp = await getWeatherPromise("Cairo");
    console.log(`Weather (Async): ${temp}°C`);
  } catch (error) {
    console.log("Error:", error);
  }
}

showWeather();

//-----------------------------------------------------------
// Part 5 — Promise Chaining
//-----------------------------------------------------------

function getUserPromise(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Ahmed" }), 1000);
  });
}

function getLocationPromise(user: User): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Cairo"), 1000);
  });
}

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

//-----------------------------------------------------------
// Part 6 — Async / Await Chain
//-----------------------------------------------------------

async function generateReport(): Promise<void> {
  try {
    const user = await getUserPromise();
    const city = await getLocationPromise(user);
    const temp = await getWeatherPromise(city);

    console.log(`User ${user.name} | City: ${city} | Temperature: ${temp}°C`);
  } catch (error) {
    console.log("Error:", error);
  }
}

generateReport();

//-----------------------------------------------------------
// Part 7 — Bonus: Full Report
//-----------------------------------------------------------

async function generateFullReport(): Promise<void> {
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
