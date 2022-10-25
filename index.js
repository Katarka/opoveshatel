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
                [Markup.button.callback('Подтвердить', 'btn1')],
                [Markup.button.callback('Отказаться', 'btn2')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

function addActionButton(name, text) {
    bot.action(name, async (ctx)=>{
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML(text)
        } catch (e) {
            console.error(e)
        }
    })
    bot.action('btn2', async (ctx)=>{
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML('Отказ!')
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