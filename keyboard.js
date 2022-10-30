const { Telegraf, Markup} = require('telegraf');

const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Кто ты?', 'whoiam')
])

module.exports = keyboard