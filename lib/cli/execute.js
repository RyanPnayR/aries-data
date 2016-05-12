import createLogger from '../util/logger';

// Create logger.
const log = createLogger(__filename);

// Function to parse json if it can.
const parse = arg => {
    try {
        return JSON.parse(arg);
    } catch(e) {
        return arg;
    }
};

// Run the task, keep some stats.
async function runTask(handler, args) {
    try {
        // Start timer.
        const start = process.hrtime();

        // Log out arguments.
        log.debug(`Calling task handler with the following args (${args.length}):`);
        args.forEach(arg => log.debug(arg));

        // Attempt to execute the task.
        const output = await handler.onTask.apply(handler, args);

        // Get duration.
        const [ seconds ] = process.hrtime(start);
        log.debug(`onTask took ${seconds} seconds`);
        log.debug('Task executed sucessfully with the following output:');

        // Log the pure output as last line to STDOUT.
        return { input: output };
    } catch(e) {
        log.error('Error executing task:', e.message);
        return {};
    }
};


// Export function to execute aries repos.
export default async function execute({ repo, _ }) {
    // Object we will stringify and log to STDOUT.
    let output = {};

    try {
        // Parse args.
        const args = _.map(parse);

        // Require in the module.
        const pkg = require(repo || process.cwd());

        // Grab `default` if it exists .
        const Module = pkg.default ? pkg.default : pkg;

        // Instantiate a new task handler.
        const handler = new Module();

        // Run the handler and get the output.
        output = await runTask(handler, args);
    } catch(e) {
        log.error(e.message);
    }

    // Stringify the final output and log it to STDOUT.
    console.log(JSON.stringify(output));
};
