
const TymLogger = require("tymlogger");
const Base64 = require("base-64");
const Path = require("path");
const IP = require("ip");

let openPhoto = null;

const logger = new TymLogger();

function playVideo (path, device) {
    
    device.play(path, 0, () => logger.success(path + " проигрывается!"));
    
    return [
        [{ text: "▶", callback_data: "player.unpause" }, { text: "❚❚", callback_data: "player.pause" }],
        [{ text: "◼", callback_data: "player.stop" }],
        [{ text: "Закрыть", callback_data: "player.close" }]
    ];
    
}

function playMusic (path, device) {
    
    device.play(path, 0, () => logger.success(path + " проигрывается!"));
    
    return [
        [{ text: "▶", callback_data: "player.unpause" }, { text: "❚❚", callback_data: "player.pause" }],
        [{ text: "◼", callback_data: "player.stop" }],
        [{ text: "Закрыть", callback_data: "player.close" }]
    ];
    
}

function playPhoto (path, device) {
    
    device.play(path, 0, () => logger.success(path + " открыто!"));
    
    return [
        [{ text: "<<", callback_data: "player.photoLeft" }, { text: ">>", callback_data: "player.photoRight" }],
        [{ text: "Закрыть", callback_data: "player.close" }]
    ];
    
}

class Player {
    
    constructor (method, filesList, bot, chatid) {
        
        this.method = method;
        this.bot = bot;
        this.chatid = chatid;
        this.filesList = filesList;
        
    }
    
    start (device) {
        
        const method = this.method.split("@")[0];
        const argument = this.method.split("@")[1];
            
        switch (method) {
                
            /* Controls */

            case "unpause":

                device.unpause();

                logger.success("Проигрывание восстановлено.");

            break;

            case "pause":

                device.pause();

                logger.success("Проигрывание приостановлено.");

            break;

            case "stop":

                device.stop();

                logger.success("Проигрывание остановлено.");
                this.bot.sendMessage(this.chatid, "Проигрывание остановлено\n\nВыберите список: /list");

            break;

            case "close":

                device.stop();

                logger.success("Воиспроизведение закрыто.");
                this.bot.sendMessage(this.chatid, "Воспроизведение закрыто.\n\nВыберите список: /list");

            break;
                
            /* /Controls */

                
            /* Playing */
                
            case "music":

                const musicFile = Base64.decode(argument);

                const musicKeyboard = playMusic("http://" + IP.address() + ":" + require("../../settings/port.json").port + "/" + musicFile, device);

                this.bot.sendMessage(this.chatid, "Проигрывается " + musicFile.split(".")[0], {                        
                    reply_markup: JSON.stringify({
                        inline_keyboard: musicKeyboard
                    })
                });
                
            break;

            case "video":

                const videoFile = Base64.decode(argument);

                const videoKeyboard = playVideo("http://" + IP.address() + ":" + require("../../settings/port.json").port + "/" + videoFile, device);

                this.bot.sendMessage(this.chatid, "Проигрывается " + videoFile.split(".")[0], {                        
                    reply_markup: JSON.stringify({
                        inline_keyboard: videoKeyboard
                    })
                });

            break;
                
            /* /Playing */

        }
        
    }
    
}

module.exports = Player;
