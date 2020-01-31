const Telegraf = require("telegraf")
const fs = require("fs")
const http = require('http')
const xlsx = require("node-xlsx");


const bot = new Telegraf(process.env.TOKEN)
const id = process.env.ID

const server = http.createServer()

var currentPrice = {
    "18" : 0,
    "general" : 0
}
var price = [
    ['18+', 'General']
]



bot.hears('/getFile', async (ctx) => {
    ctx.telegram.sendDocument(id, {
        source: file
    })
});
bot.hears('/currentPrice',  async (ctx) => {
    const request = await require('./request.js')(price)
    ctx.reply("18+ и Общий = " +  request)
})


const requestInterval = setInterval(async () => {
    const request = await require('./request.js')(price)
    if (currentPrice['18'] != request[0])
    {
        bot.telegram.sendMessage (656991059, "Внимание! Изменение цены на  вход 18+:\nСтарая = " + currentPrice['18'] + '\nНовая = ' + request[0])
        currentPrice['18'] = request[0]
    }
    if (currentPrice['general'] != request[1]) 
    {
        bot.telegram.sendMessage (656991059, "Внимание! Изменение цены на общий вход:\nСтарая = " + currentPrice['general'] + '\nНовая = ' + request[1])
        currentPrice['general'] = request[1]
    }
}, 4000);


bot.launch();
server.listen(process.env.PORT)


const writeExcel = setInterval(async () => {
    const buffer = await xlsx.build([{ 
        name: "PriceList", 
        data: price 
    }])

    fs.writeFileSync('PriceList.xls', buffer, (err) => {
        if (err) throw err
    })
}, 6000)


