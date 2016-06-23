/*
 * Main entry point when imported.
 * Export important modules.
 */

export * as aws from './lib/util/aws';

export { default as Activity } from './lib/tasks/Activity';

export { default as singleS3FileInput } from './lib/decorators/singleS3FileInput';
export { default as singleS3FileOutput } from './lib/decorators/singleS3FileOutput';
export { default as singleS3StreamInput } from './lib/decorators/singleS3StreamInput';
export { default as singleS3StreamOutput } from './lib/decorators/singleS3StreamOutput';

export { default as ActivityTester } from './lib/util/testing/ActivityTester';

export { default as createLogger, setLogStreams } from './lib/util/logger';
export { default as logger } from './lib/decorators/logger';
