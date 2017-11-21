
const TymLogger = require("tymlogger");
const Cast = require("./Cast");
const Express = require("express");

class App {
    
    constructor (options) {
        
        this.dir = options.dir;
        this.token = options.token;
        this.port = options.port;
        
    }
    
    start () {
        
        const app = Express();
        
        app.use(Express.static(this.dir));
        
        app.listen(this.port, () => {
            
            const logger = new TymLogger();

            logger.write("Подключение к Chromecast");

            const bot = new Cast(this.token, this.dir);

            bot.start();
            
        });
        
    }
    
}

module.exports = App;
