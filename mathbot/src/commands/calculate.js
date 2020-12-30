//const math = require('math');
//var calc = new MathCalc();
const mathjs = require('mathjs');

module.exports = {
    name:"calculate",
    description:"Solve a math problem",
    execute(message, args){
        console.dir(args);
        if (args.length < 1) {
            message.channel.send(":warning: I can't solve nothing.");
            return;
        }
        try {
            var expression = mathjs.evaluate(args.join(" "));
            message.channel.send("**" + args.join(" ") + "** = " + expression);
        } catch (e) {
            message.channel.send("**" + args.join(" ") + "** = " + args.join(" "));
        }
        
    }
}