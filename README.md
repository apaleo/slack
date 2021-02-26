# slack
apaleo and Slack integration

### How to install in Slack?
1. [Install app to your Slack workspace](https://slack.apaleo.com/slack/install)
2. In slack type `/apaleo configure` and authorize access to your apaleo account
3. Type `/apaleo help` to get list of available commands

### How to run locally?
In order to build the project locally:
1. Create `.env` file based on the structure in `.env.sample`
2. Run the following commands:
```bash
yarn
yarn dev
```
3. You should see: `⚡️ Slack bot is running!`.

### How to update apaleo api proxy?
Grab the latest version of a `swagger.json` for any service that needs to be updated. 
The link to `swagger.json` file can be found here:
- [apaleo Core API](https://api.apaleo.com/swagger)
- [apaleo Webhook API](https://webhook.apaleo.com/swagger)

Once you have the `swagger.json` locally, navigate to the `/src/clients` folder and copy the file in this folder.
Then, pick the corresponding `autorest-{service}.yaml` and call autorest, for example:
```bash
autorest .\autorest-booking.yaml
```

Once the proxy is generated successfully - make sure you removed the `swagger.json` from the project.

### How to add a new apaleo api proxy?
Like the previous part, you will need to have a `swagger.json` file first and put it inside `/src/clients`. From that moment, everything is pretty straightforward. 
Just go to the `/src/clients` folder and create a new `autorest-{service}.yaml` file, based on any other configuration file there. And in this folder just run:
```bash
autorest .\autorest-{new_service}.yaml
```

### How to add DB migration?
In order to generate a new migration, use:
```bash
yarn migration:create <MigrationFileName>
```
The generated migration file will be placed in the `src/db/migration` folder.
The migrations will be automatically executed when application starts. If you want to check/test new migrations locally (without starting the app) - just type:
```bash
yarn migration:run
```

### Contribution
Feel free to open an issue if you found any error or to create a pull request.
