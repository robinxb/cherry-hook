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

There could be two reasons.

One is because of the shell is not an executable file. Simply use `chmod +X path/to/the/shell`.

Another is because nodejs don't have the permission to run some shell command, such as `touch`.

You can check current user via command `$USER` in your scripts.

If there's any future problem, notify me by [issues](https://github.com/robinxb/cherry-hook/issues).

> Is the shell runs in synchronously?

No, synchronously is not recommanded and due to the function `execFile` in nodejs, it's synchronous.

> Are the HTTP requests get handled in queue?

Yes. And don't worry about too many requests coming at one time, cherry-hook run shells asynchronously.

Roadmap
===========

+ Add hot-reload config.json.
+ Custom Payload URL in config.json
+ Custom the method of triggering hot-reload.

License
===========

[MIT](https://github.com/robinxb/cherry-hook/blob/master/LICENSE)

