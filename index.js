const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

const api_key = "RGAPI-ed302f57-ea9d-4da8-8cbd-ae3182aa2f6e";
let Champions = {
    1: "Annie",
    2: "Olaf",
    3: "Galio",
    4: "TwistedFate",
    5: "XinZhao",
    6: "Urgot",
    7: "Leblanc",
    8: "Vladimir",
    9: "Fiddlesticks",
    10: "Kayle",
    11: "MasterYi",
    12: "Alistar",
    13: "Ryze",
    14: "Sion",
    15: "Sivir",
    16: "Soraka",
    17: "Teemo",
    18: "Tristana",
    19: "Warwick",
    20: "Nunu",
    21: "MissFortune",
    22: "Ashe",
    23: "Tryndamere",
    24: "Jax",
    25: "Morgana",
    26: "Zilean",
    27: "Singed",
    28: "Evelynn",
    29: "Twitch",
    30: "Karthus",
    31: "Chogath",
    32: "Amumu",
    33: "Rammus",
    34: "Anivia",
    35: "Shaco",
    36: "DrMundo",
    37: "Sona",
    38: "Kassadin",
    39: "Irelia",
    40: "Janna",
    41: "Gangplank",
    42: "Corki",
    43: "Karma",
    44: "Taric",
    45: "Veigar",
    48: "Trundle",
    50: "Swain",
    51: "Caitlyn",
    53: "Blitzcrank",
    54: "Malphite",
    55: "Katarina",
    56: "Nocturne",
    57: "Maokai",
    58: "Renekton",
    59: "JarvanIV",
    60: "Elise",
    61: "Orianna",
    62: "MonkeyKing",
    63: "Brand",
    64: "LeeSin",
    67: "Vayne",
    68: "Rumble",
    69: "Cassiopeia",
    72: "Skarner",
    74: "Heimerdinger",
    75: "Nasus",
    76: "Nidalee",
    77: "Udyr",
    78: "Poppy",
    79: "Gragas",
    80: "Pantheon",
    81: "Ezreal",
    82: "Mordekaiser",
    83: "Yorick",
    84: "Akali",
    85: "Kennen",
    86: "Garen",
    89: "Leona",
    90: "Malzahar",
    91: "Talon",
    92: "Riven",
    96: "KogMaw",
    98: "Shen",
    99: "Lux",
    101: "Xerath",
    102: "Shyvana",
    103: "Ahri",
    104: "Graves",
    105: "Fizz",
    106: "Volibear",
    107: "Rengar",
    110: "Varus",
    111: "Nautilus",
    112: "Viktor",
    113: "Sejuani",
    114: "Fiora",
    115: "Ziggs",
    117: "Lulu",
    119: "Draven",
    120: "Hecarim",
    121: "Khazix",
    122: "Darius",
    126: "Jayce",
    127: "Lissandra",
    131: "Diana",
    133: "Quinn",
    134: "Syndra",
    136: "AurelionSol",
    141: "Kayn",
    142: "Zoe",
    143: "Zyra",
    145: "Kaisa",
    150: "Gnar",
    154: "Zac",
    157: "Yasuo",
    161: "Velkoz",
    163: "Taliyah",
    164: "Camille",
    201: "Braum",
    202: "Jhin",
    203: "Kindred",
    222: "Jinx",
    223: "TahmKench",
    236: "Lucian",
    238: "Zed",
    240: "Kled",
    245: "Ekko",
    254: "Vi",
    266: "Aatrox",
    267: "Nami",
    268: "Azir",
    412: "Thresh",
    420: "Illaoi",
    421: "RekSai",
    427: "Ivern",
    429: "Kalista",
    432: "Bard",
    497: "Rakan",
    498: "Xayah",
    516: "Ornn",
    555: "Pyke"
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//Return safe Account ID
app.get("/api/accountId/:summonerName", (req, res) => {
    //LOG
    console.log("JSONP AccountId Request");
    console.log(req.params.summonerName);

    var url =
        "https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + req.params.summonerName + "?api_key=" + api_key;
    console.log(url);
    axios
        .get(url)
        .then(response => {
            res.header("Access-Control-Allow-Origin", "*");
            res.jsonp({ accountId: response.data.accountId });
            //console.log("Input:", req.params.summonerName, "Output:", response.data.accountId);
        })
        .catch(error => {
            console.log(error);
            console.log("You probably need to update your API Key");
        });
});

//Return safe Match History
app.get("/api/matchHistory/:accountId", (req, res) => {
    //LOG
    console.log("JSONP Match History request");

    var url = "https://oc1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + req.params.accountId + "?api_key=" + api_key;
    console.log(url);
    axios
        .get(url)
        .then(response => {
            res.header("Access-Control-Allow-Origin", "*");
            res.jsonp(response.data.matches);
            //console.log("Input:", req.params.accountId, "Output:"); //, response.data.matches);
        })
        .catch(error => {
            console.log(error);
            console.log("You probably need to update your API Key");
        });
});

//Return safe Champion Name
app.get("/api/champName/:champNum", (req, res) => {
    //LOG
    console.log("JSONP Champion Name request");
    //console.log("Input:", req.params.champNum, "Output:", Champions[req.params.champNum]);
    res.header("Access-Control-Allow-Origin", "*");
    if (Champions[req.params.champNum]) res.jsonp({ champions: Champions });
    else {
        var url = "http://ddragon.leagueoflegends.com/cdn/8.19.1/data/en_US/champion.json";
        console.log(url);
        axios
            .get(url)
            .then(response => {
                //res.header("Access-Control-Allow-Origin", "*");
                console.log(typeof response.data.data);
                Object.keys(response.data.data).forEach(champion => {
                    //console.log(response.data.data[champion].key + ": " + "'" + response.data.data[champion].id + "'");
                    if (response.data.data[champion].key === req.params.champNum)
                        res.jsonp({ champName: response.data.data[champion].id });
                });
            })
            .catch(error => {
                console.log(error);
                console.log("You probably need to update your API Key");
            });
    }
});

//Return safe Match
app.get("/api/match/:matchId", (req, res) => {
    //LOG
    console.log("JSONP Match request");

    var url = "https://oc1.api.riotgames.com/lol/match/v4/matches/" + req.params.matchId + "?api_key=" + api_key;
    console.log(url);
    axios
        .get(url)
        .then(response => {
            res.header("Access-Control-Allow-Origin", "*");
            res.jsonp(response.data);
            //console.log("Input:", req.params.matchId, "Output:"); //, response.data);
        })
        .catch(error => {
            console.log(error);
            console.log("You probably need to update your API Key");
        });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5555;
app.listen(port);

console.log("App is listening on port " + port);
