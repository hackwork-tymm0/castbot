
const FileSystem = require("fs");

class Files {
    
    constructor (dir) {
        
        this.dir = dir;
        
    }
    
    getFiles () {
        
        let data = {
            music: [],
            video: [],
            photo: []
        };
        
        FileSystem.readdir(this.dir, (err, items) => {
            
            for (let file of items) {
                
                let fileSplitted = file.split(".");
                
                let ext = fileSplitted[fileSplitted.length - 1];
                
                switch (ext) {
                        
                    // Video

                        case "mp4":
                        
                            data.video.push({name: fileSplitted[0], ext: ext});

                        break;

                        case "webm":
                            
                            data.video.push({name: fileSplitted[0], ext: ext});
                        
                        break;
                        
                    // Photo
                        
                        case "png":
                        
                            data.photo.push({name: fileSplitted[0], ext: ext});
                        
                        break;
                        
                        case "jpg":
                        
                            data.photo.push({name: fileSplitted[0], ext: ext});
                    
                        break;
                        
                        case "gif":
                        
                            data.photo.push({name: fileSplitted[0], ext: ext});
                    
                        break;
                        
                    // Music
                        
                        case "mp3":
                        
                            data.music.push({name: fileSplitted[0], ext: ext});
                    
                        break;
                    
                        
                }
                
            }
            
        });
        
        return data;
        
    }
    
}

module.exports = Files;
