const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(allAccounts => {
            res.status(200).json(allAccounts)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get accounts'})
        })
});

server.post('/', (req, res) => {
    const newAccountData  = req.body;

    db('accounts').insert(newAccountData)
    .then(ids => {
        res.status(201).json({ newAccountID: ids[0]});
    })
    .catch(error => {
        console.log('post err', error);
        res.status(500).json({ message: 'Failed to insert post'})
    })
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({id}).update(changes)
    .then(count => {
        if (count) {
            res.status(201).json({updated: count})
        } else {
            res.status(404).json({ message: 'Unable to find ID'})
        }
    })
    .catch(error => {
        console.log('post err', error);
        res.status(500).json({ message: 'Failed to update account'})
    })
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('account').where({id}).del()
    .then(count => {
        if (count) {
            res.status(201).json({deleted: count})
        } else {
            res.status(404).json({ message: 'Unable to find ID'})
        }
    })
    .catch(error => {
        console.log('post err', error);
        res.status(500).json({ message: 'Failed to update account'})
    })
});

module.exports = server;