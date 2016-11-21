import createLogger from '../util/logger';
import isString from 'lodash.isstring';
import uuid from 'uuid';
import { PassThrough } from 'stream';
import _ from 'highland';
import WebHDFS from 'webhdfs';
const log = createLogger(__filename);

/**
 * Apply split/json stringify transform streams.
 * @param {Object} source - read stream.
 * @param {Boolean/String} split - split on newlines and/or stringify json.
 */
export function applyTransforms(output, split) {
    // Wrap with highland.
    const readStream = _(output);

    // No transformations.
    if (!split) {
        return readStream;
    }

    // Add new lines between each chunk.
    if (split === true) {
        return readStream.intersperse('\n');
    }

    // Stringify emitted objects, and add new lines.
    if (split === 'json') {
        return readStream.map(JSON.stringify).intersperse('\n');
    }
};

/**
 * Single HDFS Stream Output
 * @param {Boolean|String} split - Split the input on new lines and optionally parse.
 * @returns {Object} Json to locate the output file.
 */
export default function singleHDFSStreamOutput(split=false) {
    // Return a decorator.
    return function(target, key, descriptor) {
        // Copy of the original function.
        const callback = descriptor.value;

        // Return a new descriptor with our new wrapper function.
        return {
            ...descriptor,
            async value(...args) {
                // Run the original function which should return a readable stream.
                const output = await callback.apply(this, args);

                // Return early if no file.
                if (!output) return;

                // Create new string object if output is string literal.
                const source = isString(output) ? new String(output) : output;

                // Plug in our transformers if needed.
                const readStream = applyTransforms(source, split);

                // Location of HDFS file.
                const filename = uuid.v4();

                // Upload and wait for stream to finish.
                this.log.debug(`Streaming ${filename} to HDFS.`);

                const result = await new Promise((resolve, reject) => {
                    // Get a new HDFS client.
                    const hdfs = WebHDFS.createClient({
                        user: process.env.WEBHDFS_USER,
                        host: process.env.WEBHDFS_HOST,
                        port: process.env.WEBHDFS_PORT,
                        path: filename,
                    });

                    // pipe the data to the remote HDFS
                    const remoteFileStream = hdfs.createWriteStream(filename);
                    localFileStream.pipe(remoteFileStream);

                    remoteFileStream.on('error', (err) => {
                        reject(err);
                    });

                    remoteFileStream.on('finish', () => {
                        resolve();
                    });
                });

                this.log.debug(`Successfully streamed ${fileName} to HDFS.`);

                // Return the filename.
                return { key: filename };
            },
        };
    };
};
