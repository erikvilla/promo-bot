# promo-bot
Telegram feed for promodescuentos rss

## Getting started

### Configure environments
This project uses [config](https://docs.npmjs.com/cli/config) to load environment variables, under `config` folder create at least `default.json` following the structure in `default.example.json`
In order to get responses from a telegram bot you will need to get the dev token from any owner of this project or create your own using BotFather in telegram directly.

Current telegram instances are:
Production: @promodescuentos_bokbot
Development: @promobot_dev_bot

### Run the bot locally
`npm run start:dev`

### Simulate production environment using ngrok
Download and install [ngrok](https://ngrok.com/docs#getting-started) if you don't have it yet.

Then run:

```
ngrok http <port>
```

Copy the forwarding value you will get, something like `Forwarding https://310f8e0f.ngrok.io -> localhost:<port>` and paste it in your configuration file in the URL section
