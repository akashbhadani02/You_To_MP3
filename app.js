const express = require('express');
const fetch = require('node-fetch');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/convert-mp3", async (req, res) => {
    const videoId = req.body.videoId;
    console.log("ok",  videoId);

    
    if (
        videoId === undefined ||
        videoId === "" ||
        videoId === null
    ) {
        return res.render("index", { success: false, message: "Please enter valid video ID" });
    } else {
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": process.env.API_HOST

            }
        });
        console.log(fetchAPI);
        ;
        const fetchResponse = await fetchAPI.json();

        if (fetchResponse.status === "ok")
            return res.render("index", { success: true, song_title: fetchResponse.title, song_link: fetchResponse.song_link});
        else
        return res.render("index", {success: false, message : fetchResponse.msg})
    }
})

app.listen(PORT, () => {
    console.log(`server started on : http://localhost:${PORT}`)
})


