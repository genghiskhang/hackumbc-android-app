from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Replace 'YOUR_DISCORD_BOT_TOKEN' with actual Discord bot token
DISCORD_BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN'

# Replace 'YOUR_DISCORD_CHANNEL_ID' with the ID of announcements channel
DISCORD_CHANNEL_ID = 'YOUR_DISCORD_CHANNEL_ID'

@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    try:
        # Make a request to the Discord API to get messages from the announcements channel
        url = f'https://discord.com/api/v10/channels/{DISCORD_CHANNEL_ID}/messages'
        headers = {
            'Authorization': f'Bot {DISCORD_BOT_TOKEN}'
        }
        params = {
            'limit': 10  # Number of announcements you want to fetch
        }
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

        # Extract relevant information from the Discord API response (e.g., title and content)
        announcements = []
        for message in data:
            title = message['content']
            content = message['embeds'][0]['description']
            announcements.append({
                'title': title,
                'content': content
            })

        return jsonify(announcements)

    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch announcements'}), 500

if __name__ == '__main__':
    app.run(debug=True)
