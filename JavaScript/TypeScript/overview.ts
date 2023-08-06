function tryTypeScript() {
  // Static type-checking tool
  // All explicit types are optional, TS infers types from context and usage.
  // Code with errors compiled from .ts file to .js with `tsc` compiler would still be launchable
  tryReasoning();
  tryTypes();
  tryFunctions();

  tryEnums();
}

function tryReasoning() { // Reasons to use TypeScript:
  // 0. IDE highlighting
  // 1. Make sure you're calling things that can be called
  const message = 'Hello world!';
  message(); // This expression is not callable. Type 'String' has no call signatures.

  // 2. Make sure properties you address are reachable
  const user = {
    name: 'Daniel',
    age: 26
  };
  user.location; // Property 'location' does not exist on type…

  // 3. Avoid typos: TS checks if a property is defined
  const adMessage = 'Hello World!';
  adMessage.toLocaleLowercase(); // Property toLocaleLowercase does not exist on type...
  adMessage.toLocalLowerCase(); // Property toLocaleLowercase does not exist on type...
  adMessage.toLocaleLowerCase(); // No errors here, bc the method name is correct

  // 4. Avoid uncalled functions
  Math.random < 0.5; // Operator '<' can't be applied to types '() => number' and 'number'
  Math.random() < 0.5; // No errors

  // 5. Avoid logic errors
  const value = Math.random() < 0.5 ? 'a' : 'b';
  if (value !== 'a') {
    // ...
  } else if (value === 'b') { // This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
    // ...
  }

  // 6. Avoid incorrect amount of passed arguments
  function greet(person, date) {
    console.log(`Hello ${person}, today is ${date}!`);
  }
  greet('Brendan'); // Expected 2 arguments, but got 1.
  greet('Brendan', new Date(), 3); // Expected 2 arguments, but got 3.
}

function tryTypes() {
  // Types
  // 1. Primitives: string, number, boolean (not String/Number/Boolean) aaand...
  //
  // bigint: since ES2020
  const oneHundred: bigint = BigInt(100); // Creating a bigint via the BigInt function
  const anotherHundred: bigint = 100n; // Creating a BigInt via the literal syntax
  console.assert(0n !== 0); // BigInt can't be strictly compared to Number
  console.assert(0n == 0); // BigInt can be loosely compared to Number
  //
  // symbol
  let id = Symbol('just descriptor');
  console.assert(id.toString() === 'Symbol(just descriptor)');
  console.assert(id.description === 'just descriptor');
  console.assert(Symbol('foo') !== Symbol('foo'));
  //
  // 2. Arrays: number[], string[], boolean[], Array<number>, Array<string>, Array<boolean>
  // 3. `any`: a quick way to disable ts checks

  // Explicit types
  function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date}!`);
  }
  greet('Brendan', Date()); // Argument of type 'string' is not assignable to parameter of type 'Date'.
  greet('Brendan', new Date); // No errors

  // Type annotations on variables
  // Format: let/const varName:\s?type = varValue
  let name: string = 'Alice';
  let name2:string = 'Alice2';
}

function tryFunctions() {
  // Functions
  //
  // Explicit types will trigger type checks on function calls.
  // No explicit types will still trigger arg number checks on function calls.
  function greetAgain(name: string) {
    console.log('Hello, ' + name.toUpperCase() + '!!');
  }

  // Return type
  function getFavoriteNumber(): number {
    // return '26'; // Type 'string' is not assignable to type 'number'
    return 26;
  }

  // Anonymous functions
  const names = ['Alice', 'Bob', 'Eve'];
  // Contextual typing for function - parameter s inferred to have type string:
  names.forEach(function(s: string) { console.log(s.toUpperCase()); });
  // Contextual typing also applies to arrow functions:
  names.forEach((s) => { console.log(s.toUpperCase()); });

  // Overloads
  function makeDate(timestamp: number): Date;
  function makeDate(m: number, d: number, y: number): Date;
  function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
      return new Date(y, mOrTimestamp, d);
    } else {
      return new Date(mOrTimestamp);
    }
  }
  const d1 = makeDate(12345678);
  const d2 = makeDate(5, 5, 5);
  const d3 = makeDate(1, 3); // No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.

  // Object types
  function printCoord(pt: { x: number; y: number }) { // The parameter's type annotation is an object type
  // function printCoord(pt: { x: number, y: number }) { // Separate obj props with `,` or `;`
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
  }
  // printCoord({ x: '3', y: 7 }); // Type 'string' is not assignable to type 'number'
  // printCoord({ x: 3, z: 7 }); // Argument of type {x: number, z: number} is not assignable to type {x: number, y: number}
  printCoord({ x: 3, y: 7 }); // No errors

  // Optional properties
  function printName(obj: { first: string, last?: string }) { // `last` is optional
    console.log(obj.first, obj.last.toUpperCase() || ''); // obj.last is possibly 'undefined'
    if (obj.last !== undefined) console.log(obj.last.toUpperCase()); // No errors, because undefined is checked
    console.log(obj.last?.toUpperCase()); // No errors as well
  }
  printName({ first: 'Bob' }); // `Bob`, no errors
  printName({ first: 'Alice', last: 'Alisson' }); // `Alice Alisson`, no errors

  // Union types
  function printId(id: number | string) { // `id` can be either a `number` or a `string`
    console.log('Your ID is: ' + id);
    console.log(id.toUpperCase()); // Property 'toUpperCase' does not exist on type 'string | number'.
                                   // Because property must exist on both possible types
    if (typeof id === 'string') { // To get rid of such errors: excplicit type checks
      // 'string', 'number', 'bigint', 'boolean', 'symbol', 'undefined', 'object', 'function'
      console.log(id.toUpperCase()); // In this branch, id is of type 'string'
    } else { // This branch assumes that id is not a string -> a number (the other option)
      console.log(id.toFixed()); // Here, id is of type 'number'
    }
  }
  printId(101); // No errors
  printId('202'); // No errors
  printId({ myID: 22342 }); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

  // Type aliases – configurable reusable types
  type UserInputString = string; // Rename a type for convenience
  type ID = number | string; // Declare a new type
  function printId(id: ID) {} // Use it
  //
  type Point = { x: number, y: number }; // Declare a new type (`interface` in this case)
  type Line = Point & { x2: number, y2: number }; // can be extended
  type Line = { x2: number, y2: number }; // can't be amended
  function printCoord(pt: Point) { // Identical as Object Types example
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
  }
  //
  type GreetFunction = (a: string) => void;
  function greeter(fn: GreetFunction) {}

  // Interfaces
  type Point = { x: number, y: number }; // Same as
  interface Point { x: number, y: number } // this
  interface Line extends Point { x2: number, y2: number } // can be extended
  interface Line { x3: number, y3: number } // can be amended
  function printCoord(pt: Point) {} // Identical to Type Aliases example

  // Type assertions
  const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement; // same as
  const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas'); // this
  const x = 'hello' as number; // Error
  const x = 'hello' as unknown as number; // Fix, no error

  // Literal types
  let changingString = 'Hello World'; // Represented as `string`
  const constantString = 'Hello World'; // Represented as `Hello World`, bc of const
  // Not really useful:
  let x2: 'hello' = 'hello';
  x2 = 'bye'; // Type '"bye"' is not assignable to type '"hello"'.
  // But for eg. sets of possible values:
  function printText(s: string, alignment: 'left' | 'right' | 'center') {}
  printText('Hello, world', 'left');
  printText('G\'day, mate', 'centre'); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
  // Same for numbers, useful
  function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }
  // `boolean` is just an alias for the union `true | false`

  // Literal inference
  function handleRequest(url: string, method: 'GET' | 'POST'): void {}
  const req = { url: 'https://example.com', method: 'GET' };
  handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
  // This happens because TS assumes req.method can change between req creation and handleRequest calling
  // Workaround 1: use Type Assertions
  const req = { url: 'https://example.com', method: 'GET' as 'GET' };
  // or
  handleRequest(req.url, req.method as 'GET');
  // Workaround 2: assert the object as const (for the type system, i.e. add literal type to all props)
  const req = { url: 'https://example.com', method: 'GET' } as const;

  // null and undefined
  // strictNullChecks off: like C# or Java – no null check
  // strictNullChecks on: null checks are mandatory
  function doSomething(x: string | null) {
    console.log('Hello, ' + x.toUpperCase()); // 'x' is possibly 'null'
    x === null ? 'do nothing' : console.log('Hello, ' + x.toUpperCase()); // No errors
  }

  // Non-null Assertion Operator (Postfix !)
  function liveDangerously(x?: number | null) {
    console.log(x.toFixed()); // 'x' is possibly 'null'
    console.log(x!.toFixed()); // No errors: ! is a type assertion that x isn't null | undefined
  }

  // Rest parameters
  function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
  }
  const a = multiply(10, 1, 2, 3, 4); // 'a' gets value [10, 20, 30, 40]

  // Rest Arguments
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  arr1.push(...arr2);
  //
  // const args = [8, 5];
  // const angle = Math.atan2(...args); // A spread argument must either have a tuple type or be passed to a rest parameter.
  const args = [8, 5] as const;
  const angle = Math.atan2(...args); // No errors

  // Parameter desctructuring
  function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
  }

  // void
  // Contextual typing with a return type of void does not force functions to not return something.
  type voidFunc = () => void;
  const f1: voidFunc = () => { return true; }; // No errors, but return value is ignored
  // Reason: to make this code work
  const src = [1, 2, 3];
  const dst = [0];
  src.forEach((el) => dst.push(el));
  //
  // but
  function f2(): void { return true; } // Type 'boolean' is not assignable to type 'void'

  // Generic functions
  // Are used when we want to describe a correspondence between two values
  function firstElement<AnyTypeTextHere>(arr: AnyTypeTextHere[]): AnyTypeTextHere | undefined {
    return arr[0];
  }
  const s = firstElement(['a', 'b', 'c']); // s is of type 'string'
  const n = firstElement([1, 2, 3]); // n is of type 'number'
  const u = firstElement([]); // u is of type undefined
  //
  function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }
  const parsed = map(['1', '2', '3'], (n) => parseInt(n)); // 'n' is of type 'string'; 'parsed' is of type 'number[]'
  //
  // Constraints
  function longest<T extends { length: number }>(a: T, b: T) {
    return a.length >= b.length ? a : b;
  }
  const longerArray = longest([1, 2], [1, 2, 3]); // longerArray is of type 'number[]'
  const longerString = longest('alice', 'bob'); // longerString is of type 'alice' | 'bob'
  const notOK = longest(10, 100); // Error! Numbers don't have a 'length' property

}

function tryEnums() {
  // Allows to define a set of named constants.
  // It's not a type-level extension of JavaScript.

  // Numeric enums
  //
  // Declaration   // Compiles to:
  enum Direction { // var Direction; (function (Direction) {
    Up = 1,        //   Direction[Direction['Up'] = 1] = 'Up'; // would start with 0 by default
    Down,          //   Direction[Direction['Down'] = 2] = 'Down'; // auto-incrementing by 1
    Left,          //   Direction[Direction['Left'] = 3] = 'Left';
    Right,         //   Direction[Direction['Right'] = 4] = 'Right';
  }                // })(Direction || (Direction = {}));
  // As it compiles to that construction, it can be used both ways:
  // console.assert(Direction['Up'] === 1);
  // console.assert(Direction[1] === 'Up'); // aka 'reverse mappings'
  // console.assert(Direction['1'] === 'Up'); // aka 'reverse mappings'
  //
  // Usage
  enum UserResponse { No, Yes } // No === 0, Yes === 1
  function respond(recipient: string, message: UserResponse): void { console.log(message); }
  respond('Princess Caroline', UserResponse.Yes); // logs 1

  // String enums
  // No auto-incrementing, but more verbose
  //
  // Declaration    // Compiles to:
  enum Direction {  // var Direction; (function (Direction) {
    Up = 'UP',      //   Direction['Up'] = 'UP';            // No
    Down = 'DOWN',  //   Direction['Down'] = 'DOWN';        // reverse
    Left = 'LEFT',  //   Direction['Left'] = 'LEFT';        // mappings
    Right = 'RIGHT' //   Direction['Right'] = 'RIGHT';      // here
  }                 // })(Direction || (Direction = {}));
  //
  // Usage
  function whereTo(who: string, direction: Direction): void { console.log(direction); }
  whereTo('Princess', Direction.Up); // logs 'UP'

  // Heterogeneous Enums (not recommended)
  enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = 'YES'
  }

  // Computed and constant members
  // Each enum value can be constant or computed.
  // Constant if:
  //   1. It is the first member in the enum and it has no initializer.
  //     In this case it’s assigned the value 0.
  //   2. It does not have an initializer and the preceding enum member was a numeric constant.
  //     In this case the value of the current enum member will be the value of the preceding enum member plus one.
  //   3. The enum member is initialized with a constant enum expression.
  //     A constant enum expression is a subset of TypeScript expressions that can be fully evaluated at compile time.
  //     An expression is a constant enum expression if it is:
  //       1) a literal enum expression (basically a string literal or a numeric literal)
  //       2) a reference to previously defined constant enum member (which can originate from a different enum)
  //       3) a parenthesized constant enum expression
  //       4) one of the +, -, ~ unary operators applied to constant enum expression
  //       5) +, -, *, /, %, <<, >>, >>>, &, |, ^ binary operators with constant enum expressions as operands
  //
  // Computed if: any other case
  // Examples:
  enum E { X } // E.X is constant
  enum E1 { X, Y, Z } // E1.X, E1.Y, E1.Z are all constants
  enum FileAccess {
    None, // constant member
    Read = 1 << 1, // constant member
    Write = 1 << 2, // constant member
    ReadWrite = Read | Write, // constant member

    G = '123'.length // computed member
  }

  // Literal enum members
  // 1. any string literal (e.g. "foo", "bar", "baz")
  // 2. any numeric literal (e.g. 1, 100)
  // 3. a unary minus applied to any numeric literal (e.g. -1, -100)
  //
  // Such enum values can be used as types:
  enum ShapeKind { Circle, Square }
  interface Circle { kind: ShapeKind.Circle, radius: number }
  interface Square { kind: ShapeKind.Square, sideLength: number }
  //
  let c: Circle = {
    kind: ShapeKind.Square, // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
    radius: 100
  };

  // At runtime
  enum E2 { X, Y, Z, }
  function f(obj: { X: number }) { return obj.X; }
  f(E2); // Works, since 'E' has a property named 'X' which is a number.

  // At compile time
  enum LogLevel { ERROR, WARN, INFO, DEBUG }
  type LogLevelStrings = keyof typeof LogLevel; // Same as: type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

  // const enums
  // Totally removed during the compilation time, so compiles to nothing.
  // Members are inlined where they're used, so computed members aren't allowed.
  const enum Enum { A = 1, B = A * 2 } // Compiles to nothing
  console.log(Enum['A']); // Compiles to console.log(1 /* Enum['A'] */);
  //
  // There are pitfalls to this approach, use with caution.
  // ESLint 'no-restricted-syntax' rule to forbid that.

  // ? Ambient enums
  // Are used to describe the shape of already existing enum types.
  // Members without initialization are considered computed.
  declare enum Enum { A = 1, B, C = 2 } // Ignore it: declare should be in the root scope
  console.log(Enum['A']); // Enum is not defined

  // Objects vs enums
  const enum EDirection { Up, Down, Left, Right }
  const ODirection = { Up: 0, Down: 1, Left: 2, Right: 3 } as const;
  //
  EDirection.Up; // (enum member) EDirection.Up = 0
  ODirection.Up; // (property) Up: 0
  //
  // enum: used as a parameter
  function walk(dir: EDirection) {}
  //
  // Object: an extra line is required to pull out the values
  type Direction = typeof ODirection[keyof typeof ODirection];
  function run(dir: Direction) {}
}

function setupTypeScriptForSublimeText4() {
  // TypeScript linting and auto-completions
  // 1. Install Package Control
  // 2. Install LSP (Language Server Protocol)
  // 3. Install LSP-typescript (Language Server Protocol)

  // ESLint for Typescript (lots of additional checks and catches)
  // 1. npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
  // 2. Add `parser: '@typescript-eslint/parser'` to .eslintrc.js file
  // 3. Add `plugins: ['@typescript-eslint']` to .eslintrc.js file
  // 4. Add `extends: ['plugin:@typescript-eslint/recommended']` to .eslintrc.js file
}

setupTypeScriptForSublimeText4();

// Check that configuration works:
obj.name = 'Other name'; // Must be an error: Cannot redeclare block-scoped variable 'name'
                         // From /node_modules/typescript/lib/lib.dom.d.ts

tryTypeScript();
