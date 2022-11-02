const {Telegraf, Markup} = require('telegraf');
require('dotenv').config()
const {textError, textApply} = require('./const')
const {CronJob} = require('cron');
const {chat} = require('api-telegram-bot')

let config = {
    "admin": 477534252
}

let fs = require('fs')
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

bot.start((ctx) => {
    ctx.reply(isAdmin(ctx.message.from.id)
        ? replyText.helloAdmin
        : replyText.helloUser);
});

bot.on('message', (ctx)=> {
    if (ctx.message.reply_to_message
        && ctx.message.reply_to_message.forward_from
        && isAdmin(ctx.message.from.id)) {
        // отправляем копию пользователю
        ctx.telegram.copyMessage(ctx.message.reply_to_message.forward_from.id, ctx.message);
    } else {
        // перенаправляем админу
        forwardToAdmin(ctx);
    }
})

bot.command('menu', (ctx) => {
    return ctx.reply('Custom buttons keyboard', Markup.inlineKeyboard([
    [Markup.button.callback('Subscribe', `btn3`)], 
]))
})

bot.command('sub', async (ctx) => {
    // const chatId = ctx.update.callback_query.message.chat.id;
    // await ctx.answerCbQuery();
    await ctx.reply('Вы подписались на уведомления от телеграмм бота, спасибо!')

    let firstNotice = new CronJob('* 10 10 */1 *', async () => {
            console.log('Уведомление №1 отправлено');
            await ctx.reply('Начало написания контент-планов!', Markup.inlineKeyboard(
                [
                    [Markup.button.callback(`Подтвердить`, 'btn1')]
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
    firstNotice.start();
    let secondNotice = new CronJob('* 18 11 */1 *', async () => {
        console.log('Уведомление №2 отправлено');
        await ctx.reply('1/3 КП сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    secondNotice.start();
    let thirdNotice = new CronJob('* 18 13 */1 *', async () => {
        console.log('Уведомление №3 отправлено');
        await ctx.reply('2/3 КП сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    thirdNotice.start();
    let fourthNotice = new CronJob('* 18 14 */1 *', async () => {
        console.log('Уведомление №4 отправлено');
        await ctx.reply('3/3 КП сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    fourthNotice.start();
    let FifthNotice = new CronJob('* 10 16 */1 *', async () => {
        console.log('Уведомление №5 отправлено');
        await ctx.reply('Начало формирования отложек и ТЗ для дизайнеров', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    FifthNotice.start();
    let sixthNotice = new CronJob('* 18 18 */1 *', async () => {
        console.log('Уведомление №6 отправлено');
        await ctx.reply('1/3 отложки сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    sixthNotice.start();
    let seventhNotice = new CronJob('* 18 22 */1 *', async () => {
        console.log('Уведомление №7 отправлено');
        await ctx.reply('2/3 отложки сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    seventhNotice.start();
    let eighthNotice = new CronJob('* 18 25 */1 *', async () => {
        console.log('Уведомление №8 отправлено');
        await ctx.reply('3/3 отложки сделана?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    eighthNotice.start();
    let ninthNotice = new CronJob('* 18 27 */1 *', async () => {
        console.log('Уведомление №9 отправлено');
        await ctx.reply('Все готово, с учетом правок?', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`Подтвердить`, 'btn1')],
                [Markup.button.callback(`Не готова`, 'btn2')]
            ]))
    },
    null,
    true,
    'Europe/Moscow',
    );
    ninthNotice.start();
});

bot.command('whoim', async (ctx) => {
    const {id, username, first_name, last_name} = ctx.from;
    await ctx.reply(`Кто ты в телеграмме:
  *id* : ${id}
  *username* : ${username}
  *Имя* : ${first_name}
  *Фамилия* : ${last_name}
  *chatId* : ${ctx.chat.id}`);
});

bot.command('time', ctx => {
    ctx.reply(String(new Date()))
})

bot.action('btn3', (ctx) => {
    ctx.reply(`Тык от ${ctx.from.first_name}`)
    console.log('Тык')
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// let triggerMsg = cron.schedule('10 1 * * * *', (bot) => {
//     bot.telegram.sendMessage('Hey/')
//     console.log('1 minute update')
// })

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

// bot.command('unsub', async (ctx) => {
//     await ctx.reply('Stop, PLS STOP')
//     let everyDay = new CronJob('* * * * *', () =>{
//         console.log('Stop')
//         ctx.reply('Stop')
//     })
//     everyDay.stop()
// })