const yargs = require('yargs')
const db = require('./db');

yargs
    .command('add', 'Add a new note.', {
        'title': {
            alias: 't',
            describe: 'Note\'s title',
            demand: true,
            type: 'string'
        },
        'body' : {
            alias: 'b',
            describe: 'Note\'s body (optional, but recommended)',
            default: 'Unknown'
        }
    }, (argv) => db.add(argv))

    .command('get', 'Get all notes.', {
        'id': {
            alias: 'i',
            type: 'number',
            conflicts: ['title']
        }, 
        'title': {
            alias: 't',
            type: 'string',
            conflicts: ['id']
        }
    }, (argv) => db.getAll(argv))
    .help()
    .argv
