const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./notes.db');

//init
db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

const add = (argv) => {
    let stmt = db.prepare('INSERT INTO notes VALUES(null, ?, ?)');
    stmt.run(argv.title, argv.body);
    stmt.finalize();
}

const getAll = (argv) => {
    let stmt = 'SELECT * FROM notes WHERE ';

    if(argv.id) stmt += 'id='+argv.i;
    else if(argv.title) stmt += `title = '${argv.title}'`;
    else return console.log('Wrong or missing arguments');

    db.all(stmt, (err, rows) => {
        if(err) return console.log(err);
        rows.forEach((row) => {
            console.log(`ID: ${row.id}.\nTitle: ${row.title}.\nBody: ${row.body}\n\n`);
        });
    });
}

module.exports = {
    add, getAll
};