
const TymLogger = require("tymlogger");
const Path = require("path");
const JSONWrite = require("write-json-file");
const App = require("../app/App");

class CLI {
    
    start () {
    
        const logger = new TymLogger();
        
        let token = require("../settings/token.json").token;
        let port = require("../settings/port.json").port;
        let workingDirectory = process.cwd();
        
        logger.write("castbot запускается...");
        
        switch (process.argv[2]) {

            case "token":

                logger.write("Настройка токена");
                
                if (process.argv[3] !== undefined) {
                    
                    logger.write("Токен: " + process.argv[3]);
                    logger.write("Запись токена в файл...");
                    
                    JSONWrite(Path.join(__dirname, "..", "token.json"), { token: process.argv[3] }).then(() => {
                        
                        logger.success("Файл настроек перезаписан!");
                        
                    });
                    
                } else {
                    
                    logger.error("Токен не введен!");
                    
                }

            break;
                
            case "port":
                
                 logger.write("Настройка порта");
                
                if (process.argv[3] !== undefined) {
                    
                    logger.write("Порт: " + process.argv[3]);
                    logger.write("Запись порта в файл...");
                    
                    JSONWrite(Path.join(__dirname, "..", "port.json"), { port: parseInt(process.argv[3]) }).then(() => {
                        
                        logger.success("Файл настроек перезаписан!");
                        
                    });
                    
                } else {
                    
                    logger.error("порт не введен!");
                    
                }
                
            break;

            case undefined:
                
                logger.write("Token: " + token);
                logger.write("Directory: " + workingDirectory);
                
                const undefinedApp = new App({
                    port: port,
                    token: token,
                    dir: workingDirectory
                });
                
                undefinedApp.start();
                
            break;

            default:
                
                if (process.argv[2].split("/")[0] !== "~") {
                    
                    workingDirectory = Path.join(process.cwd(), process.argv[2]);
                    
                } else {
                    
                    workingDirectory = Path.join(process.argv[2]);
                    
                }
                
                logger.write("Token: " + token);
                logger.write("Directory: " + workingDirectory);
            
                const defaultApp = new App({
                    port: port,
                    token: token, 
                    dir: workingDirectory
                });
                
                defaultApp.start();

            break;

        }
        
    }
    
}

module.exports = CLI;
