# Usage

`http-vhost` is a lightweight package for managing multiple hosts in the form of `http` servers.

# Installing

Using npm:

```bash
npm install http-vhost
```

Using git:

```bash
git clone https://github.com/SeizedBots/node-http-vhost.git
```

# Getting Started

To get started, just instantiate `VHost` from the package.

```js
const {VHost} = require('http-vhost');

const vhost = new VHost();

//YOUR CODE HERE
```

# Config

The virtual hosts managed by `VHost` can be passed in at instantiation. (Listed values are default.)

```js
new VHost({
    hosts: [], //these come with a domain and a server property, similar to VHost.register
    default: require('http').createServer((req, res) => {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end();
    })
});
```

# Methods

## Register

This method takes in a domain and a server as created by the `http` module standard to node. There are several function signatures for this method.

```js
vhost.register('api.example.com', server);
```

Checks for an exact match.

```js
vhost.register(/^\w+\.example\.com$/, server);
```

Checks for a match to the provided regular expression.

```js
vhost.register(server);
```

Is used when no other host can be found.

# Access Patterns

The `http-vhost` module exports the following:

```js
{
    VHost: require('./VHost')
}
```

# Contributing

If you would like to contribute or create an issue, please do so at the official [GitHub page](https://github.com/SeizedBots/node-http-vhost).