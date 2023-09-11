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
    if message.channel.id == CHANNEL_ID and message.content.strip()[0] != '!':
        message_id = message.id
        author_name = message.author.nick if message.author.nick is not None else message.author.name
        msg = message.content.replace("'", "\\'")
        time_created = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        query = {
            'query':f"CALL add_announcement('{message_id}', '{author_name}', '{msg}', '{time_created}');"
        }
        response = requests.post('https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds', json=query)
        if (response.status_code == 200):
            print('Entry added successfully')
        else:
            print('Failed to add entry')
    await bot.process_commands(message)
            
@bot.event
async def on_message_edit(before, after):
    if before.channel.id == CHANNEL_ID:
        message_id = after.id
        msg = after.content.replace("'", "\\'")
        time_created = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        query = {
            'query':f"CALL update_announcement('{message_id}', '{msg}', '{time_created}');"
        }
        response = requests.post('https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds', json=query)
        if (response.status_code == 200):
            print('Entry updated successfully')
        else:
            print('Failed to update entry')

@bot.event
async def on_message_delete(message):
    if message.channel.id == CHANNEL_ID:
        message_id = message.id
        
        query = {
            'query':f"CALL delete_announcement('{message_id}');"
        }
        response = requests.post('https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds', json=query)
        if (response.status_code == 200):
            print('Entry deleted successfully')
        else:
            print('Failed to update entry')

@bot.command()
async def configure(ctx):
    global CHANNEL_ID
    if ctx.author.guild_permissions.administrator:
        data = json.load(open('credentials.json', 'r'))
        data['channel'] = ctx.channel.id
        CHANNEL_ID = data['channel']
        json.dump(data, open('credentials.json', 'w'))
        print(f'{bot.user.name} is now listening to the {ctx.channel.name} ({ctx.channel.id}) channel')

@bot.command()
async def wipe(ctx, limit):
    if ctx.author.guild_permissions.administrator:
        try:
            deleted_message_id = []
            async for message in bot.get_channel(ctx.channel.id).history(limit=int(limit)):
                deleted_message_id.append(message.id)
            for message_id in deleted_message_id:
                try:
                    message = await bot.get_channel(ctx.channel.id).fetch_message(message_id)
                    await message.delete()
                except Exception as e:
                    print(f'Failed to delete message {message_id}: {e}')
        except Exception as e:
            print(f'Failed to delete messages: {e}')

if __name__ == '__main__':
    bot.run(BOT_TOKEN)
