export default async function execute({ repo, _ }) {
    try {
        // Parse args.
        const args = _.map(arg => {
            console.log('ARG', arg);

            try {
                return JSON.parse(arg);
            } catch(e) {
                return arg;
            }
        });

        console.log('NODE ARGS', args);
        console.log(args.length);

        // Require in the module.
        const pkg = require(repo || process.cwd());

        // Grab `default` if it exists .
        const Module = pkg.default ? pkg.default : pkg;

        // Instantiate a new task handler.
        const handler = new Module();

        // Run the onTask function.
        await handler.onTask.apply(handler, args);

    } catch(e) {
        console.log(e);
    }
};
