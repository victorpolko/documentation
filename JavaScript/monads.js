// By Douglas Crockford on YUI 2012
// https://www.youtube.com/watch?v=dkZFtimgAcM

// 0. Axioms
// 1) Left identity: unit(value).bind(f) === f(value)
// 2) Right identitxy: monad.bind(unit) === monad
// 3) Associativity: monad.bind(f).bind(g) === monad.bind((value) => f(value).bind(g))

// 1. Identity monad
function ID_MONAD_MACROID() {
  return function unit(value) {
    const monad = Object.create(null);
    monad.bind = (func) => func(value);

    return monad;
  };
}
//
// Example
const identity = ID_MONAD_MACROID();
const idMonad = identity('Hello world');
idMonad.bind(alert); // Alerts 'Hello world'

// 2. Ajax monad
function AJAX_MONAD_MACROID() {
  const prototype = Object.create(null);

  function unit(value) {
    const monad = Object.create(prototype);
    monad.bind = (func, args) => func(value, ...args);

    return monad;
  }

  unit.lift = (name, func) => {
    prototype[name] = function(...args) { // To make sure the function is a Monad too
      return unit(this.bind(func, args));
    };

    return unit;
  };

  return unit;
}
//
// Example
const ajax = AJAX_MONAD_MACROID().lift('alert', alert);
const ajaxMonad = ajax('Hello world');
ajaxMonad.alert(); // Alerts 'Hello world'

// 3. Maybe monad (null check)
function MAYBE_MONAD_MACROID(modifier) {
  const prototype = Object.create(null);

  function unit(value) {
    const monad = Object.create(prototype);
    monad.bind = (func, ...args) => func(value, args);
    if (typeof modifier === 'function') modifier(monad, value);

    return monad;
  }

  return unit;
}
//
// Example
const maybe = MAYBE_MONAD_MACROID((monad, value) => {
  if (value === null || value === undefined) {
    monad.is_null = true;
    monad.bind = () => monad;
  }
});
const maybeMonad = maybe(null);
maybeMonad.bind(alert); // Nothing happens, because monad was constructed with null

// 4. Promise monad
//
// Promises are monads, except:
// 1. value is not known when a Promise monad is constructed
// 2. Has resolver methods
// 3. then accepts 2 functions (bind – only one)
//
const VOW = (function() {
  function enqueue(queue, func, resolver, breaker) {
    queue[queue.length] =
      typeof func !== 'function'
        ? resolver
        : (value) => {
          try {
            const result = func(value);
            if (result && result.is_promise === true) {
              result.when(resolver, breaker);
            } else {
              resolver(result);
            }
          } catch (e) {
            breaker(e);
          }
        };
  }

  function enlighten(queue, fate) {
    queue.forEach((func) => setTimeout(func.bind(this, fate), 0));
  }

  return {
    make: function make() {
      const breakers = [];
      const keepers = [];
      let fate;
      let status = 'pending';

      function herald(state, value, queue) {
        if (status !== 'pending') throw 'overpromise';

        fate = value;
        status = state;
        enlighten(queue, fate);

        breakers.length = 0;
        keepers.length = 0;
      }

      return {
        break(reason) {
          herald('broken', reason, breakers);
        },

        keep(value) {
          herald('kept', value, keepers);
        },

        promise: {
          is_promise: true,

          when(kept, broken) {
            const vow = make();

            switch (status) {
              case 'pending':
                enqueue(keepers, kept, vow.keep, vow.break);
                enqueue(breakers, broken, vow.break, vow.break);
                break;
              case 'kept':
                enqueue(keepers, kept, vow.keep, vow.break);
                enlighten(keepers, fate);
                break;
              case 'broken':
                enqueue(breakers, broken, vow.break, vow.break);
                enlighten(breakers, fate);
                break;
            }

            return vow.promise;
          }
        }
      };
    }
  };
}());
//
// Example
const myVow = VOW.make();
myVow.promise.when(
  () => { console.log('kept!'); },
  () => { console.log('broken!'); }
);
//
myVow.keep((some) => { console.log(some); }); // to resolve
// myVow.break((reason) => { console.log(reason); }); // to reject
