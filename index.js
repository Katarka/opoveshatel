const {Telegraf, Markup} = require('telegraf');
require('dotenv').config()
const {textError, textApply} = require('./const')
const whoiam = require('./keyboard')
const {CronJob} = require('cron');

let config = {
    "admin": 477534252
}

const bot = new Telegraf(process.env.BOT_TOKEN);

let replyText = {
    "helloAdmin": "Привет админ, ждем сообщения от пользователей",
    "helloUser": "Приветствую, отправьте мне сообщение. Постараюсь ответить в ближайшее время.",
    "replyWrong": "Для ответа пользователю используйте функцию Ответить/Reply."
}

let isAdmin = (userId) => {
    return userId === config.admin;
};

let forwardToAdmin = (ctx) => {
    if (isAdmin(ctx.message.from.id)) {
        ctx.reply(replyText.replyWrong);
    } else {
        ctx.forwardMessage(config.admin, ctx.from.id, ctx.message.id);
    }
};

bot.start(async (ctx) => {
    await ctx.reply(isAdmin(ctx.message.from.id)
        ? replyText.helloAdmin
        : replyText.helloUser);
    // await ctx.reply('Custom buttons keyboard', Markup.keyboard([
    //         ['Subscribe', 'sub'], // Row1 with 2 buttons
    //         ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
    //         ['📢 Ads', '⭐️ Rate us', 'whoim'] // Row3 with 3 buttons
    //     ]).oneTime().resize()
    // )
});

// let triggerMsg = cron.schedule('10 1 * * * *', (bot) => {
//     bot.telegram.sendMessage('Hey/')
//     console.log('1 minute update')
// })

bot.command('sub', async (ctx) => {
    // const chatId = ctx.update.callback_query.message.chat.id;
    // await ctx.answerCbQuery();
    await ctx.reply('Вы подписались на уведомления от телеграмм бота, спасибо!')

    let everyDay = new CronJob('* * * * *', async () => {
            console.log('Уведомление отправлено');
            await ctx.reply('Тестовое уведомление.\n' +
                'Подтвердите, что увидели его.', Markup.inlineKeyboard(
                [
                    [Markup.button.callback(`Подтвердить`, 'btn3')]
                ]))
            //   const now = moment().tz('Europe/Moscow').format();
            //   let year = now.slice(0, 4),
            //     month = now.slice(5, 7),
            //     day = now.slice(8, 10),
            //     nowDay = `${day}.${month}.${year}`;
            //   msg.telegram.sendMessage(chatId, `Оповешение, ${nowDay}`);
        },
        null,
        true,
        'Europe/Moscow',
    );
    everyDay.start();
});

// bot.command('unsub', async (ctx) => {
//     await ctx.reply('Stop, PLS STOP')
//     let everyDay = new CronJob('* * * * *', () =>{
//         console.log('Stop')
//         ctx.reply('Stop')
//     })
//     everyDay.stop()
// })


bot.command('whoim', (ctx) => {
    const {id, username, first_name, last_name} = ctx.from;
    return ctx.replyWithMarkdownV2(`Кто ты в телеграмме:
  *id* : ${id}
  *username* : ${username}
  *Имя* : ${first_name}
  *Фамилия* : ${last_name}
  *chatId* : ${ctx.chat.id}`);
});

bot.command('time', ctx => {
    ctx.reply(String(new Date()))
})

// bot.on('message', (ctx) => {
//     bot.telegram.sendMessage(ctx.message.chat.id,
//         `Hello, ${ctx.message.from.first_name}\n` +
//         `You id: ${ctx.message.from.id}`)
// })
// bot.command('custom', async (ctx) => {
//     return await ctx.reply('Custom buttons keyboard', Markup
//         .keyboard([
//             ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//             ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//             ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//         ])
//         .oneTime()
//         .resize()
//     )
// })

// bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'бродяга'}!`));
// bot.help((ctx) => ctx.reply('Send me a sticker'));

// bot.command('bot', async (ctx)=>{
//     try {
//         await ctx.replyWithHTML('Оповещение', Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback(`Подтвердить`, 'btn1')],
//                 [Markup.button.callback('Отказаться', 'btn2')],
//                 [Markup.button.callback('Дата', 'btn3')]
//             ]
//         ))
//     } catch (e) {
//         console.error(e)
//     }
// })

bot.action('btn3', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply(textApply)
    }
    catch (e) {
    console.log(e)
    }
})


// bot.on('message', function (ctx, next) {
//     ctx.telegram.sendMessage(ctx.message.chat.id,
//       "File content at: " + new Date() + " is: \n"
//     )
// });

// (`${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`)

// function addActionButton(name, text) {
//     bot.action(name, async (ctx) => {
//         try {
//             await ctx.answerCbQuery()
//             await ctx.reply(text)
//         } catch (e) {
//             console.error(e)
//         }
//     })
// }
// addActionButton('btn1', textApply)
// addActionButton('btn2', textError)


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));