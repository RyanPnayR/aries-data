'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Create logger.
var log = (0, _logger2.default)(__filename);

// Export function to execute aries repos.

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
        var repo = _ref.repo;
        var _ = _ref._;

        var args, pkg, Module, handler, start, output, _process$hrtime, _process$hrtime2, seconds;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        // Parse args.
                        args = _.map(function (arg) {
                            try {
                                return JSON.parse(arg);
                            } catch (e) {
                                return arg;
                            }
                        });

                        // Require in the module.

                        pkg = require(repo || process.cwd());

                        // Grab `default` if it exists .

                        Module = pkg.default ? pkg.default : pkg;

                        // Instantiate a new task handler.

                        handler = new Module();

                        // Run the onTask function.

                        start = process.hrtime();
                        _context.prev = 6;
                        _context.next = 9;
                        return handler.onTask.apply(handler, args);

                    case 9:
                        output = _context.sent;
                        _process$hrtime = process.hrtime(start);
                        _process$hrtime2 = _slicedToArray(_process$hrtime, 1);
                        seconds = _process$hrtime2[0];

                        log.debug('onTask took ' + seconds + ' seconds');

                        log.debug('Task executed sucessfully with the following output:');
                        log.info(output);
                        _context.next = 21;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](6);

                        log.error('Error executing task:', _context.t0.message);

                    case 21:
                        _context.next = 26;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t1 = _context['catch'](0);

                        log.error(_context.t1.message);

                    case 26:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 23], [6, 18]]);
    }));

    function execute(_x) {
        return ref.apply(this, arguments);
    }

    return execute;
}();