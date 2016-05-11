'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
        var repo = _ref.repo;
        var _ = _ref._;
        var args, pkg, Module, handler;
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


                        console.log('NODE ARGS', args);

                        // Require in the module.
                        pkg = require(repo || process.cwd());

                        // Grab `default` if it exists .

                        Module = pkg.default ? pkg.default : pkg;

                        // Instantiate a new task handler.

                        handler = new Module();

                        // Run the onTask function.

                        _context.next = 8;
                        return handler.onTask.apply(handler, args);

                    case 8:
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 10]]);
    }));

    function execute(_x) {
        return ref.apply(this, arguments);
    }

    return execute;
}();