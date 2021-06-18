const Sequelize = require('sequelize')

module.exports = function () {

    const sequelize = new Sequelize({
        database: 'sample',
        username: 'postgres',
        host: '127.0.0.1',
        port: '5432',
        password: 'root',
        dialect: 'postgres',
        define: {
            timestamps: false
        }

    });

    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })

        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const User = sequelize.define('events', {

        // attributes
        event_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        chiefguest: {
            type: Sequelize.STRING

        },
        date_of_event: {
            type: Sequelize.DATE

        },
        time_duration: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },

    }, {
        timestamps: false
    });

    User.sync({ force: false })
    const userData = User.build(
        { event_id: 5 }, { event_name: "Pongal Celebration" }, { chiefguest: "Sridhar vembu" }, { date_of_event: 14 / 01 / 2022 }, { Duration: "4hrs" }

    )
    console.log(userData instanceof User);

}