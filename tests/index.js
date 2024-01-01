const {VHost} = require('../src/index');

const express = require('express');

const vhost = new VHost();

vhost.register(require('http').createServer().on('request', express().get('/', (req, res) => {
    res.send('This is the default app.');
})));

vhost.register(/^regextest1\.localhost$/, require('http').createServer().on('request', express().get('/', (req, res) => {
    res.send('This is test app 1.');
})));

vhost.register(new RegExp('^regextest2\\.localhost$'), require('http').createServer().on('request', express().get('/', (req, res) => {
    res.send('This is test app 2.');
})));

vhost.register('noregex.localhost', require('http').createServer().on('request', express().get('/', (req, res) => {
    res.send('This is test app 3.');
})));

vhost.server.listen(80);