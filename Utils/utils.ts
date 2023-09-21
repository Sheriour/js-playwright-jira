export class Utils {
    
    static getRandomString(): string{
        return Math.floor(Math.random() * Date.now()).toString(36);
    }
}