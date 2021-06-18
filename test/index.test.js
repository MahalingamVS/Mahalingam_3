/**
 * Retrieves a user by email.
 * @author Mahalingam V S
 * @async
 * @method
 * @description Sample Test case for Testing API calls using jest mock
 * @returns {User} Test object
 * @throws {NotFoundError} When the event is not found.
 */

const restify = require('restify');
const Service = require('../src/index');

jest.mock('../src/index', () => {
    return {
        data: {
            event_id: 1,
            event_name: "Team Catchup",
            Chiefguest: "Mahalingam",
            date_of_event:'22/06/2021',
            time_duration: '4 hrs'
        }
    }
})

test('returns winner', () => {
    const events = Service.get()
    console.log(events + ">>>>>>>>" + jest.mock())
    expect(events).toHaveProperty("data.event_id", 1);
})