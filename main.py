import telebot

bot = telebot.TeleBot("7611552831:AAGtLC6JQI4ujjb5IZrg9sCGE-YwJUUVOtc", parse_mode=None)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
	bot.reply_to(message, "РАБОТАЕТ")
	
bot.infinity_polling()