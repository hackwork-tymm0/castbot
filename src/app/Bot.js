
const Telegram = require("node-telegram-bot-api");
const TymLogger = require("tymlogger");
const List = require("./bot_methods/List");

class Bot {
    
    constructor (token, dir, filesList) {
        
        this.token = token;
        this.dir = dir;
        this.fileslist = filesList;
        
    }
    
    start (device) {
        
        const logger = new TymLogger();
        const bot = new Telegram(this.token, { polling: true });
        
        let botInfo = null;
        
        logger.write("Получаю информацию о боте");
        
        bot.getMe().then((me) => {
            
            logger.success("Информация получена");
            
            botInfo = me;
            
            logger.write("Имя - " + me.first_name);
            logger.write("ID - " + me.id);
            logger.write("Имя пользователя - " + me.username);
            
        });
        
        bot.on("text", (msg) => {
            
            const msgInfo = {
                text: msg.text,
                chat: msg.chat.id
            }
            
            switch (msgInfo.text) {
                    
                case "/start":
                    
                    bot.sendMessage(msgInfo.chat, "Привет, я - " + botInfo.first_name + "\nЧерез этого бота можно проигрывать любой контент на Chromecast!\nВыберите контент для произведения:", {
                        
                        reply_markup: JSON.stringify({ 
                        
                            inline_keyboard: [
                                
                                [{text: "Видео", callback_data: "list.video"}],
                                [{text: "Музыка", callback_data: "list.music"}],
                                [{text: "Фото", callback_data: "list.photo"}]
                                
                            ]
                            
                        })
                        
                    });
                    
                break;
                    
                case "/list":
 
                    bot.sendMessage(msgInfo.chat, "Выберите список:", {
                        
                        reply_markup: JSON.stringify({ 
                        
                            inline_keyboard: [
                                
                                [{text: "Видео", callback_data: "list.video"}],
                                [{text: "Музыка", callback_data: "list.music"}],
                                [{text: "Фото", callback_data: "list.photo"}]
                                
                            ]
                            
                        })
                        
                    });
                    
                break;
                    
            }
            
        });
        
        bot.on("callback_query", (callback) => {
            
            const botModule = callback.data.split(".")[0];
            
            logger.write("===> " + callback.data);
            
            switch (botModule) {
                    
                case "list":
                    
                    const list = new List(bot, callback.message.chat.id, callback.data.split(".")[1], this.fileslist);
                    
                    list.start();
                    
                break;
                    
                case "player":
                    
                break;
                    
            }
            
        });
        
    }
    
}

module.exports = Bot;
