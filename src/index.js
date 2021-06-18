/**
 * Retrieves a user by email.
 * @author Mahalingam V S
 * @async
 * @method
 * @returns {User} Event object
 * @throws {NotFoundError} When the event is not found.
 */
const restify = require('restify');
const NodeCache = require("node-cache");
const pg = require('pg');
const ormTool = require('./ormtool')

const myCache = new NodeCache();

ormTool();

const pool = new pg.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'sample',
    password: 'root',
    port: '5432'
});

const server = restify.createServer({
    name: 'Sampleapp'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3001, function () {
    console.log('%* listening at Port %*', server.name, server.url);
});
var msg = "";

return (
    server.get('/event_details', function (req, resp) {
        if (myCache.get("myKey") == null) {
            pool.query("SELECT * from events", (err, res) => {
                if (err) throw err;
                console.log(res.rowCount);
                myCache.set("myKey", res.rows);
                msg = JSON.stringify([myCache.get("myKey")])
                pool.end();
                console.log(msg)
                return resp.end(msg)
            });
        } else {
            msg = JSON.stringify([myCache.get("myKey")]);
            console.log(myCache.getTtl("myKey"))
            console.log(myCache.getStats());
            return resp.end(msg)
        }
    }),
    server.get('/insertdetails', function (req, resp) {

        pool.query("INSERT INTO events(event_id, event_name, Chiefguest, date_of_event, time_duration)  VALUES " +
            "(1, 'New Year Celebration','M S Dhoni','1 / 1 / 2022','3hrs') ," +
            "(2, 'React New Version Launch','Ratan Tata','28 / 06 / 2021','2hrs')",
            "(3, '5 G Launch','Prime Minister','18 / 07 / 2021','1hrs')",
            (err, res) => {
                if (err) throw err;
                console.log(res.rowCount);
                return resp.end(msg)
            });
    }

    )
)
