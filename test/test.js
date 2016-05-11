import test from 'blue-tape';
import Activity from '../lib/tasks/Activity';

test('Activities have a logger', t => {
    const activity = new Activity();
    t.ok(activity.log);
    t.end();
});
