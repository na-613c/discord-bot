// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const path = require("path");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const t1 = "OTU5NTM0MDI4M";
const t2 = "Dk1MTAzMDc3.YkdR";
const t3 = "sw.TntfuF_xohwgG_x1";
const t4 = "PIr3-fN2v_I";

const token = t1 + t2 + t3 + t4;
let appServer;
const port = 2000;
let mainWindow = null;
let status = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    minWidth: 967,
    height: 768,
    minHeight: 650,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    // frame: false,
    icon: path.join(__dirname, "/logo512.png"),
    show: false,
  });
  mainWindow.setMenu(null);
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(url).then();
  process.env.NODE_ENV === "development" &&
  mainWindow.webContents.openDevTools();

  const jsonParser = bodyParser.json();

  server.get("/", function (req, res) {
    res.send("START LOCAL SERVER");
  });

  server.post("/", jsonParser, function (request, response) {
    if (!request.body) {
      console.log(request);
      return response.sendStatus(400);
    }
    response.sendStatus(200);
    const sortedArray = request.body.data.map(e => e.isChk);
    client.on("ready", async () => {
      console.log("I am ready!");
      console.log(sortedArray);

      client.generateInvite(["ADMINISTRATOR"]).then(link => console.log(link));

      const messageGen = async (title, color, img) => {
        let arrReaction = ["✅", "⏰", "❌"];
        let embed = new MessageEmbed()
          .setColor(color)
          .setTitle(title)
          .addField(
            "Отметки - жмем на реакции под сообщением",
            `\nБуду на КВ -  ${arrReaction[0]}\n\n Опоздаю    -  ${arrReaction[1]} \n\n Не буду    -  ${arrReaction[2]}`
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/737621287979188254/959729479964573706/100-1.png"
          )
          .setImage(img);

        const botMessage = await client.channels.cache
          .get("959546552060362832")
          .send(embed);

        try {
          await arrReaction.forEach(e => botMessage.react(e));
        } catch (e) {
          console.log(e);
        }
      };

      const arrUrl = [
        "https://cdn.discordapp.com/attachments/808264087418175488/828285716739784724/80fd290be53fb2ba.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/828286369683734568/017b505ced8f5a82.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/829063006053728256/14.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/829063038594318457/20.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/829098253638828082/14.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/829098312619130960/20.png",
        "https://cdn.discordapp.com/attachments/808264087418175488/830127888477061130/2bdf9e02bffc94b8.png",
      ];

      const arrPromise = [
        () =>
          messageGen("Понедельник 14:00-18:00 (+3 UTC)", "#ec73a8", arrUrl[0]),
        () => messageGen("Вторник 20:00-24:00 (+3 UTC)", "#f29700", arrUrl[1]),
        () =>
          messageGen(
            "Четверг (левик) 14:00-18:00 (+3 UTC)",
            "#faef01",
            arrUrl[2]
          ),
        () =>
          messageGen(
            "Четверг (левик) 20:00-24:00 (+3 UTC)",
            "#c1d500",
            arrUrl[3]
          ),
        () => messageGen("Суббота 14:00-18:00 (+3 UTC)", "#9dd1a3", arrUrl[4]),
        () => messageGen("Суббота 20:00-24:00 (+3 UTC)", "#00a0ea", arrUrl[5]),
        () =>
          messageGen("Воскресенье 14:00-18:00 (+3 UTC)", "#9fc3e7", arrUrl[6]),
      ];
      let sortArrPromise = sortedArray.map((v, id) => {
        return v ? arrPromise[id] : -1;
      });

      const newSortArrPromise = sortArrPromise.filter(v => v != -1);
      newSortArrPromise.forEach(f=>f())
    });

    client.login(token);
  });

  require("events").EventEmitter.defaultMaxListeners = 0;

  appServer = server.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });

  mainWindow.on("close", e => {
    appServer.close(() => {
      process.exit(0);
    });

    if (status === 0) {
      e.preventDefault();
      e.sender.send("close-app", "start closing");
    } else app.quit();
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("browser-window-created", function (e, window) {
  window.maximize();
  window.show();
});

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  appServer.close(() => {
    process.exit(0);
  });
  app.quit();
});
