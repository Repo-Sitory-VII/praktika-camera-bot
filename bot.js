const { Telegraf, Markup } = require('telegraf');
const { button } = require('telegraf/markup');
var token = "8063595790:AAGcKs-EP5CfTuZ_8oNg-Tv9PYUmsLc0v-Q"
const bot = new Telegraf(token);
const webapplink = 'https://www.google.com/';

// Команды бота (для /help)
bot.telegram.setMyCommands([
  // { command: 'start', description: 'Запустить бота' },
  { command: 'about', description: 'О боте' },
  { command: 'help', description: 'Подсказка' },
  { command: 'webapp', description: 'Открыть веб-приложение' },
]);

// "Приветствие"
const welcomeMessage = `
Здесь бот имеет несколько функций:
✅ Просмотреть это сообщение
✅ Просмотреть подсказку по командам
✅ Перейти в само приложение

Выберите действие в меню ⤵️
`;

// "Подсказка"
const helpMessage = `
💡 *Подсказка:*  

- Нажми *"О боте"*, чтобы прочитать информацию о функциях бота.  
- Нажми *"Веб-приложение"*, чтобы открыть приложение.
- Или используй команды:
  /about - О боте  
  /help - Подсказка  
  /webapp - Веб-приложение
`;

// Inline-menu
const inlineMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📄 О боте', 'about_btn')],
  [Markup.button.callback('💡 Подсказка', 'help_btn')],
  [Markup.button.webApp('🌐 Веб-приложение', webapplink)],
]);

// Reply-menu
const replyMenu = Markup.keyboard([
  ['📄 О боте', '💡 Подсказка'],
  ['🌐 Веб-приложение']
])
.resize()
.oneTime();

// Команда /start
bot.command('start', async (ctx) => {
  await ctx.replyWithMarkdown(welcomeMessage, inlineMenu);
  await ctx.reply('Или ниже:', replyMenu);
});

// Команда /about
bot.command('about', (ctx) => {
  ctx.replyWithMarkdown(welcomeMessage, inlineMenu);
});

// Команда /help
bot.command('help', (ctx) => {
  ctx.replyWithMarkdown(helpMessage, inlineMenu);
});

// Команда /webapp
bot.command('webapp', (ctx) => {
  ctx.reply('Открываю веб-приложение...', Markup.inlineKeyboard([
    Markup.button.webApp('🌐 Перейти', webapplink),
  ]));
});

// Inline-buttons
// Кнопка "О боте"
bot.action('about_btn', async (ctx) => {
  try {
    const currentText = ctx.update.callback_query.message.text;
    if (!currentText.includes(welcomeMessage)) {
      await ctx.editMessageText(welcomeMessage, { 
        parse_mode: 'Markdown', 
        ...inlineMenu 
      });
    } else {
      await ctx.answerCbQuery('Вы уже в разделе "О боте" ✅');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    await ctx.answerCbQuery('Вы уже в разделе "О боте" ✅');
  }
});

// Кнопка "Подсказка"
bot.action('help_btn', async (ctx) => {
  try {
    const currentText = ctx.update.callback_query.message.text;
    if (!currentText.includes(helpMessage)) {
      await ctx.editMessageText(helpMessage, { 
        parse_mode: 'Markdown', 
        ...inlineMenu 
      });
    } else {
      await ctx.answerCbQuery('Вы уже в разделе "Подсказка" ✅');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    await ctx.answerCbQuery('Вы уже в разделе "Подсказка" ✅');
  }
});

// Reply-buttons
bot.hears('📄 О боте', (ctx) => ctx.replyWithMarkdown(welcomeMessage, inlineMenu));
bot.hears('💡 Подсказка', (ctx) => ctx.replyWithMarkdown(helpMessage, inlineMenu));
bot.hears('🌐 Веб-приложение', (ctx) => {
  ctx.reply('Открываю веб-приложение...', Markup.inlineKeyboard([
    Markup.button.webApp('🌐 Перейти', webapplink),
  ]));
});

// Запуск бота
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));