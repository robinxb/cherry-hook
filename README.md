cherry-hook
===========

An application which listens for GitHub webhook and start custom task.


How to use
===========



Configurate your repository
-----------

First of all, you need to configurate the webhook of your repository.

+ Go to your repository's setting. Add a webhook.
+ Set the Payload URL to your server. If you don't want to use the 80 port, then set it like this `http://your.domain.name:8888`.
+ Click confirm button. 

Using this tool
-----------

+ Clone into your favorite folder. `git clone https://github.com/robinxb/cherry-hook.git`
+ `npm install`
+ Edit the config.json, create/modify the shell you want to use.
+ `./cherry-hook.js`

FAQ
===========

> When runing a shell, Error: spawn EACCES shows up ?

This is because nodejs don't have the authority to run some shell command, such as `touch`.

You can `cd` to the folder where you want to execute these commands in, and type `chmod -R 777 .`.

> Is the shell runs in synchronously?

No, synchronously is not recommanded and due to the function `execFile` in nodejs, it's synchronous.

For example

In config.json  **DO NOT use like this**

```
"push-task": ["./scripts/test.sh", "./scripts/test2.sh"]
```

In test.sh  **DO NOT use like this**

```
touch test2.sh
echo 'test2 output' > test2.sh
```

Roadmap
===========

+ Add hot-reload config.json.
+ Custom Payload URL in config.json

License
===========

[MIT](https://github.com/robinxb/cherry-hook/blob/master/LICENSE)

