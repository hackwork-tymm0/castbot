
const TymLogger = require("tymlogger");
const Base64 = require("base-64");

let counter = {
    music: 0,
    photo: 0,
    video: 0
};

function Music (list, pos = null) {
    
    let keyboard = [];
        
    for (item of list) {

        keyboard.push([{ text: item.name, callback_data: "player.music@" + Base64.encode(item.name + "." + item.ext)}])

    }
    
    return keyboard;
    
}

function Video (list) {
    
    let keyboard = [];
        
    for (item of list) {

        keyboard.push([{ text: item.name, callback_data: "player.video@" + Base64.encode(item.name + "." + item.ext)}])

    }
    
    return keyboard;   
    
}

function Photo (list) {
    
    let keyboard = [];
        
    let counter = 0;
    
    for (item of list) {

        keyboard.push([{ text: item.name, callback_data: "player.photo@" + Base64.encode(item.name + "." + item.ext)}])

    }
    
    return keyboard;    
    
}

class List {
    
    constructor (bot, chat, type, list) {
        
        this.bot = bot;
        this.chatid = chat;
        this.list = list;
        this.type = type;
        
    }
    
    start () {
        
        const logger = new TymLogger();
        
        if (this.type.split("@")[1] === undefined) {

            switch (this.type) {

                case "music":

                    this.bot.sendMessage(this.chatid, "Список музыки:\n\nВернуться к выбору: /list", {
                        reply_markup: JSON.stringify({
                            inline_keyboard: Music(this.list.music)
                        })
                    });

                    logger.success("Отправлен список музыки");

                break; 

                case "photo":

                    this.bot.sendMessage(this.chatid, "Список фото:\n\nВернуться к выбору: /list", {
                        reply_markup: JSON.stringify({
                            inline_keyboard: Photo(this.list.photo)
                        })
                    });

                    logger.success("Отправлен список фото");

                break; 

                case "video":

                    this.bot.sendMessage(this.chatid, "Список видео:\n\nВернуться к выбору: /list", {
                        reply_markup: JSON.stringify({
                            inline_keyboard: Video(this.list.video)
                        })
                    });

                    logger.success("Отправлен список видео");

                break;

            }
            
        }
        
    }
}

module.exports = List
