const { Client } = require('discord.js')
const WOKCommands = require('wokcommands')
const updateMutes = require('./util/mute-checker')
const updatetempBans = require('./util/tempban-checker')
require('dotenv').config()

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
})

client.on('ready', () => {
    console.log('Ready!')
    const wok = new WOKCommands(client, 'commands', 'features', 'messages.json')
        .setMongoPath(process.env.mongoPath)
        .setBotOwner(process.env.adminIds.split(','))
        .setDefaultPrefix(process.env.defaultPrefix)
        .setDefaultLanguage('english')
        .setCategoryEmoji('Economy', '💰')
        .setCategoryEmoji('Moderation', '⚔')
        .setCategoryEmoji('Fun', '🎉')
        .setCategoryEmoji('Misc', '📚')
        .setCategoryEmoji('Tools', '🔧')
        .setCategoryEmoji('Testing', '🧪')

    wok.on('databaseConnected', (conection, state) => {
        console.log('Connected to database!, state: ' + state)
    })

    setInterval(() => {
        updateMutes(client)
        updatetempBans(client)
    }, 5000)
})

client.login(process.env.token)
