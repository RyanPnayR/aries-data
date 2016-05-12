import createLogger from '../util/logger';

// Create logger.
const log = createLogger(__filename);

// Export function to execute aries repos.
export default async function execute({ repo, _ }) {

    try {
        // Parse args.
        const args = _.map(arg => {
            try {
                return JSON.parse(arg);
            } catch(e) {
                return arg;
            }
        });

        // Require in the module.
        const pkg = require(repo || process.cwd());

        // Grab `default` if it exists .
        const Module = pkg.default ? pkg.default : pkg;

        // Instantiate a new task handler.
        const handler = new Module();

        // Run the onTask function.
        const start = process.hrtime();

        try {
            // Attempt to execute the task.
            const output = await handler.onTask.apply(handler, args);

            // Get duration.
            const [ seconds ] = process.hrtime(start);
            log.debug(`onTask took ${seconds} seconds`);
            log.debug('Task executed sucessfully with the following output:');

            // Log the pure output as last line to STDOUT.
            console.log(output);
        } catch(e) {
            log.error('Error executing task:', e.message);
        }

    } catch(e) {
        log.error(e.message);
    }
};
