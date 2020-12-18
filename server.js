const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(4060, () => {
  console.log("App Listening in port 4060");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", async (req, resp) => {
  const { lat, lon } = req.body; //Get the request sent by the client
  const apiResp = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=77eeaba722cdfb450fbd4e680edabd2e`
  );
  const jsonApi = await apiResp.json();

  resp.json(jsonApi);
  resp.end(); //END the response
});
