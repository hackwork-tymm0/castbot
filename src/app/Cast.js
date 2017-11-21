
const Chromecast = require("chromecast-api");
const Bot = require("./Bot");
const TymLogger = require("tymlogger");
const Files = require("./Files");

class Cast {
    
    constructor (token, dir) {
        
        this.token = token;
        this.dir = dir;
        
    }
    
    start () {
    
        const logger = new TymLogger();
        
        logger.write("Поиск устройств...");
        
        const browser = new Chromecast.Browser();
        
        browser.on("deviceOn", (device) => {
            
            logger.success("Подключено к устройству!");
        
            logger.write("Получаю список файлов");
  
            const files = new Files(this.dir);
    
            const filesList = files.getFiles();

            setTimeout(() => {

                var urlMedia = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';

                console.log(filesList);
                
                const bot = new Bot(this.token, this.dir, filesList);

                bot.start(device);

            }, 1000);
            
        });
        
    }
    
}

module.exports = Cast;
