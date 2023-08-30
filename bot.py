import json
import discord
from discord.ext import commands
import requests
import datetime

credentials = json.load(open('credentials.json'))
BOT_TOKEN = credentials['token']
CHANNEL_ID = credentials['channel']
intents = discord.Intents.all()
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} - {bot.user.id}')

@bot.event
async def on_message(message):
    if message.channel.id == CHANNEL_ID:
        author_name = message.author.nick if message.author.nick is not None else message.author.name
        msg = message.content.replace("'", "\\'")
        time_created = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        query = {
            'query':f"CALL add_announcement('{author_name}', '{msg}', '{time_created}');"
        }
        response = requests.post('https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds', json=query)
        if (response.status_code == 200):
            print('Entry added successfully')
        else:
            print('Failed to add entry')

if __name__ == '__main__':
    bot.run(BOT_TOKEN)