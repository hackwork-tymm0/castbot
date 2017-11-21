
const TymLogger = require("tymlogger");
const Cast = require("./Cast");

class App {
    
    constructor (options) {
        
        this.dir = options.dir;
        this.token = options.token;
        
    }
    
    start () {
        
        const logger = new TymLogger();
        
        logger.write("Подключение к Chromecast");
        
        const bot = new Cast(this.token, this.dir);
        
        bot.start();
        
    }
    
}

module.exports = App;
