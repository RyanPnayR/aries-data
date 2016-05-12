'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Run the task, keep some stats.

var runTask = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(handler, args) {
        var start, output, _process$hrtime, _process$hrtime2, seconds;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        // Start timer.
                        start = process.hrtime();

                        // Log out arguments.

                        log.debug('Calling task handler with the following args (' + args.length + '):');
                        args.forEach(function (arg) {
                            return log.debug(arg);
                        });

                        // Attempt to execute the task.
                        _context.next = 6;
                        return handler.onTask.apply(handler, args);

                    case 6:
                        output = _context.sent;


                        // Get duration.
                        _process$hrtime = process.hrtime(start);
                        _process$hrtime2 = _slicedToArray(_process$hrtime, 1);
                        seconds = _process$hrtime2[0];

                        log.debug('onTask took ' + seconds + ' seconds');
                        log.debug('Task executed sucessfully with the following output:');

                        // Log the pure output as last line to STDOUT.
                        return _context.abrupt('return', { input: output });

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](0);

                        log.error('Error executing task:', _context.t0.message);
                        return _context.abrupt('return', {});

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 15]]);
    }));

    return function runTask(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Create logger.
var log = (0, _logger2.default)(__filename);

// Function to parse json if it can.
var parse = function parse(arg) {
    try {
        return JSON.parse(arg);
    } catch (e) {
        return arg;
    }
};;

// Export function to execute aries repos.

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
        var repo = _ref.repo;
        var _ = _ref._;
        var output, args, pkg, Module, handler;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // Object we will stringify and log to STDOUT.
                        output = {};
                        _context2.prev = 1;

                        // Parse args.
                        args = _.map(parse);

                        // Require in the module.

                        pkg = require(repo || process.cwd());

                        // Grab `default` if it exists .

                        Module = pkg.default ? pkg.default : pkg;

                        // Instantiate a new task handler.

                        handler = new Module();

                        // Run the handler and get the output.

                        _context2.next = 8;
                        return runTask(handler, args);

                    case 8:
                        output = _context2.sent;
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](1);

                        log.error(_context2.t0.message);

                    case 14:

                        // Stringify the final output and log it to STDOUT.
                        console.log(JSON.stringify(output));

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 11]]);
    }));

    function execute(_x3) {
        return ref.apply(this, arguments);
    }

    return execute;
}();