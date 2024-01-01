const HTTP = require('http');

function VHost(config = {}){
    config = Object.assign({
        hosts: [],
        default: HTTP.createServer((req, res) => {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end();
        })
    }, config);

    const hosts = [];

    let default_server = config.default;

    this.server = HTTP.createServer();
    
    for(let i = 0; i < config.hosts.length; i++){
        const host = config.hosts[i];

        this.register(host.domain, host.server);
    }

    function get_server(host){
        let server = default_server;
    
        for(let i = 0; i < hosts.length; i++){
            if(hosts[i].domain.test(host)){
                server = hosts[i].server;
            }
        }

        return server;
    }

    const add_relay = ((event_name) => {
        this.server.on(event_name, (req, ...args) => {
            get_server(req.headers.host).emit(event_name, req, ...args);
        });
    }).bind(this);

    add_relay('checkContinue');
    add_relay('checkExpectation');
    this.server.on('clientError', () => {
        this.server.on(event_name, (req, ...args) => {
            get_server(socket.handshake.headers.host).emit(event_name, ...args);
        });
    });
    this.server.on('close', () => {
        for(let i = 0; i < hosts.length; i++){
            hosts[i].host.emit('close');
        }
    });
    add_relay(this, 'connect');
    add_relay('dropRequest');
    add_relay('request');
    add_relay('upgrade');

    this.register = (domain, server) => {
        if(server === undefined){
            //this means that arg 1 is the default server, not the domain
            default_server = domain;

            domain.on('close', () => {
                this.server.emit('close');
            });

            return;
        }

        server.on('close', () => {
            this.server.emit('close');
        });

        if(typeof domain === 'string'){
            hosts.push({
                domain: new RegExp(domain.replace('.', '\\.')),
                server: server
            });

            return;
        }

        hosts.push({
            domain: domain,
            server: server
        });
    };
}

module.exports = VHost;