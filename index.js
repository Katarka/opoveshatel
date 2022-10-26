const { Telegraf, Markup} = require('telegraf');
require('dotenv').config()
const {textError, textApply} = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN); 
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'бродяга'}!`));
bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.command('bot', async (ctx)=>{
    try {
        await ctx.replyWithHTML('Оповещение', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback('Отказаться', 'btn2')],
                [Markup.button.callback('Дата', 'btn3')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

let date = new Date()
bot.action('btn3', async (ctx) => {
    await ctx.reply(`${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`)
}) 


// bot.on('message', function (ctx, next) {
//     ctx.telegram.sendMessage(ctx.message.chat.id,
//       "File content at: " + new Date() + " is: \n"
//     )
// });

// (`${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`)

function addActionButton(name, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.reply(text)
        } catch (e) {
            console.error(e)
        }
    })
}
addActionButton('btn1', textApply)
addActionButton('btn2', textError)





bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));