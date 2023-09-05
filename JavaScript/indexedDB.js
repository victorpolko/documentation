// https://www.w3.org/TR/IndexedDB/

// Indexes
// Transactions
// Keys can be of different types
// Save any kind of data
// More space than of localStorage
// Operates in the current source (protocol/domain/port)

//// Basic Usage
const dbName = 'indexedStorage';
const version = 1; // Positive integers only, defaults to 1 in #open
const openDBRequest = indexedDB.open(dbName, version); // Requesting a db of version 1

// Updating the DB schema:
// 1. Using the migration functions
//   a) Create migrations between each versions
//   b) Compare new and current versions
//   c) Sequentially run required migrations
//
// 2. Using the stores list diff (db.objectStoreNames)
//   const openDBRequest = indexedDB.open('db', 2);
//   openDBRequest.onupgradeneeded = (event) => {
//     const db = event.target.result;
//     if (!db.objectStoreNames.contains('books')) { // DOMStringList#contains
//       db.createObjectStore('books', { keyPath: 'id' });
//     }
//   };

// upgradeneeded event is fired when:
// 1. The client hasn't yet initialized the database
// 2. The client has initialized the database, but its version is older than requested
openDBRequest.onupgradeneeded = (event) => {
  const db = openDBRequest.result;

  switch (event.oldVersion) {
    case 0: // The DB isn't initialized
      // Initialization steps here
      break;
    case 1: // The DB is initialized with version 1
      // Schema migrations here
      break;
  }
};

openDBRequest.onsuccess = (event) => {
  console.log('Database opened successfully', event);
  const db = event.target.result; // or // const db = openDBRequest.result;

  // To account for parallel DB update:
  // 1. Client opened the DB with version 1
  // 2. We released a DB update (version 2)
  // 3. The client opened the site in another tab
  db.onversionchange = (event) => {
    db.close(); // Database must be closed in order for updates to be applied to it
    alert('The database is outdated. Please reload or close this page.');
    console.log(event);
  };
};

// blocked event is fired when an onversionchange event doesn't close the database,
// I.e. there's a DB update available, but there are some open DB connections
// in other tabs/windows
openDBRequest.onblocked = () => {
  // This event should be at least declared, so that the script doesn't fail silently.
  //
  // This event can be used instead of db.onversionchange,
  // e.g. suggesting the user to save their work and close/reload other tabs.
};

// error event is fired when:
// 1. There were some problems while opening the DB
// 2. The requested DB version is older than the client's version (VER_ERR)
openDBRequest.onerror = (event) => {
  const errorCode = event.target.errorCode; // or // openDBRequest.errorCode
  console.log('Database opened with problems...: ', errorCode);
};

// To delete an indexedDB
const deleteRequest = indexedDB.deleteDatabase(dbName);
deleteRequest.onsuccess = () => {}; // Track successfull deletion
deleteRequest.onerror = () => {}; // Track errors while deleting

//// Storing Data
// IndexedDB's unit is an ObjectStore, which is the same as tables (MySQL/PG),
// indices (ES) or collections (Mongo). IndexedDb uses Structured Serialize for Storage,
// it's sort of like JSON.stringify, but more powerful.
// ObjectStore can store primitives or complex data. The key must be unique, and its type
// must be among number, date, string, binary or array.
openDBRequest.onupgradeneeded = (event) => { // DB schema changes must be in this event!
  const db = event.target.result;

  // Creating a store
  db.createObjectStore('booksStore', { // optional initialization object
    // keyPath is the path to the object's property (e.g. 'id')
    // if omitted, it will be required on each DB access (a key to get/set/delete)
    keypath: 'id',

    // autoIncrement is the flag
    autoIncrement: true
  });

  // Deleting a store
  db.deleteObjectStore('booksStore');
};

//// Transactions
// To ensure that several operations are all complete, or a total rollback will happen.
// Depend on EventLoop: when unused, it will become inactive (TRANSACTION_INACTIVE_ERR).
openDBRequest.onsuccess = (event) => {
  const db = event.target.result;

  // Store name or an array of store names to perform the transaction on
  const storeName = 'books';

  // Transaction type: readonly (default) or readwrite. Optional.
  // readonly transactions can run in parallel.
  // readwrite transactions block the access to the store(s), so they run only in series.
  // Special type: `versionchange`, it's only created by indexedDB when in `upgradeneeded`
  const type = 'readwrite';

  // Creating a transaction
  const transaction = db.transaction(storeName, type);

  // Transaction events
  transaction.oncomplete = (event) => {}; // Do something after all data is processed
  transaction.onerror = (event) => {}; // Do something with errors
  transaction.onabort = (event) => {}; // Do something when transaction.abort is called

  const booksStore = transaction.objectStore(storeName);
  const book = { id: 'js', price: 10, created: new Date() };

  // Adding an object
  // #add will throw if an object with the same keyPath already exists
  // #put will create or overwrite the object by the keyPath
  const addRequest =
    booksStore.add(book) // we're adding, not updating, so it's #add here
      .onsuccess = (event) => {
        console.log('Book was added to the DB', event.target.result);
        console.assert(event.target.result === book.id);
      };
  addRequest.onerror = (event) => console.log(`Error: ${event.target.errorCode}`);

  // Retrieving an object
  const getRequest =
    db.transaction(storeName).objectStore(storeName).get(book.id)
      .onsuccess = (event) => { console.log(event.target.result.price); };
  getRequest.onerror = (event) => {};
  //
  // Retrieving all records (keys? -> getAllKeys)
  const getAllRequest =
    db.transaction(storeName).objectStore(storeName).getAll()
      .onsuccess = (event) => { console.log(`All books: ${event.target.result}`); };
  getAllRequest.onerror = (event) => {};
  //
  // Retrieving all/specific records using cursor
  const filteredBooks = [];
  const filterRequest =
    db.transaction(storeName).objectStore(storeName).openCursor()
      .onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // No filter === all records; getAll() creates all objects in memory at once
          if (cursor.value.id === 'js') filteredBooks.push(cursor.value);
          cursor.continue(); // move cursor to the next record
          // cursor.advance(2); // jump past 2 next records
        } else {
          console.log(`Here's filtered books: ${filteredBooks}`);
        }
      };
  filterRequest.onerror = (event) => {};

  // Removing an object
  const deleteRequest =
    db.transaction(storeName, 'readwrite').objectStore(storeName).delete(book.id)
      .onsuccess = (event) => {};
  deleteRequest.onerror = (event) => {};

  // Clear the store, deleting all records
  booksStore.clear();

  // Catching errors
  // Any error cancels the whole transaction, unless event.preventDefault() is called.
  // Any events are DOM events, and they bubble up request -> transaction -> DB.
  //   Use stopPropagation() to avoid that.
  booksStore.add(book).onerror = (event) => {
    if (event.result.error.name === 'ConstraintError') {
      console.log(`A book with id ${book.id} already exists!`); // Handling code
      event.preventDefault(); // Allow the transaction to continue without cancelling
      event.stopPropagation(); // Forbid event bubbling, as the error is handled already
      // Catchup code here (e.g. to try saving with a different key)
    } else {
      // Transaction will be aborted due to unhandled error
    }
  };

  ////// Transactions Gotchas
  //
  // 1. A transaction becomes inactive as soon as all microtasks it raised are finished.
  // That means that it's impossible to create an async task inside the transaction,
  // because these async tasks (fetch, setTimeout) are macrotasks:
  booksStore.add(book).onsuccess = () => {
    fetch('/').then(() => { // This microtask will be processed after the transaction!
      const innerRequest = booksStore.add({ ...book, id: 'jsx', created: new Date() });
      innerRequest.onerror = () => {
        console.log(innerRequest.error.name); // ! Throws TransactionInactiveError
      };
    });
  };
  // Solution: separate IndexedDB tasks from other macrotasks, e.g. fetch first, then
  // create an IndexedDB transaction.
};

//// Search / querying
// Stores are always sorted by keys
//
// 1. Using keys
// Search usually uses a key or key range (IDBKeyRange)
// IDBKeyRange.lowerBound(lower, [open]) // > lower || >= lower (open === true)
// IDBKeyRange.upperBound(upper, [open]) // < upper || <= upper (open === true)
// IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen]) // lower < x < upper
// IDBKeyRange.only(key) // range containing only one key
//
// booksStore.get(query); // find first record by a key or a key range
// booksStore.getAll([query], [count]); // find all records by query (limit maybe)
// booksStore.getKey(query); // find first record's key
// booksStore.getAllKeys([query], [count]); // find all keys by query (limit maybe)
// booksStore.count([query]); // get total number of objects (maybe limit by query)
openDBRequest.onsuccess = (event) => {
  const db = event.target.result;
  const storeName = 'books';
  const transaction = db.transaction(storeName);
  const booksStore = transaction.objectStore(storeName);

  // Examples
  booksStore.get('js'); // id === 'js'
  booksStore.getAll(IDBKeyRange.bound('css', 'html')); // 'css' <= id <= 'html'
  booksStore.getAll(); // get all books
  booksStore.getAllKeys(IDBKeyRange.lowerBound('js', true)); // id > 'js'

};

// 2. Using index
// Indexes are supplemental DB sub-tables used to accelerate searches.
// Indexes are always sorted by keys, so the search results are sorted as well.
// Indexes are updated automagically, no manual work is required.
// Results can be iterated with cursors as well (use cursor.primaryKey)
//
// Index must be created in versionchange event along with all stores:
// objectStore.createIndex(name, keyPath, [options])
//   name – index name
//   keyPath – key(s) to track
//   options: <T { unique: Boolean, multiEntry: Boolean }>
//     unique – forbid records with non-unique keys
//     multiEntry – treat keyPath array as separate index keys
openDBRequest.onupgradeneeded = () => {
  const db = event.target.result;
  const booksStore = db.createObjectStore('books', { keyPath: 'id' });

  // Let's track price
  // price can repeat, so unique === false
  // price is a single key, so multiEntry is not applicable here; multiEntry === false
  booksStore.createIndex('price_idx', 'price');

  // E.g. with these records in the db:
  //   [
  //     { id: 'html', price: 3 },
  //     { id: 'css', price: 5 },
  //     { id: 'js', price: 10 },
  //     { id: 'nodejs', price: 10 }
  //   ]
  //
  // .. index looks like this:
  //   {
  //     3: ['html'],
  //     5: ['css'],
  //     10: ['js', 'nodejs']
  //   }
};

// To search using index, same querying methods must be applied to index instance:
// index.get(query); // find first record by a key or a key range
// index.getAll([query], [count]); // find all records by query (limit maybe)
// index.getKey(query); // find first record's key
// index.getAllKeys([query], [count]); // find all keys by query (limit maybe)
// index.count([query]); // get total number of objects (maybe limit by query)
openDBRequest.onsuccess = (event) => {
  const db = event.target.result;
  const storeName = 'books';
  const transaction = db.transaction(storeName);
  const booksStore = transaction.objectStore(storeName);
  const priceIndex = booksStore.index('price_idx');

  priceIndex.get(10); // price == 10 (event.target.result === first record)
  priceIndex.getAll(10); // price == 10 (event.target.result === array of all books by 10)
  priceIndex.getAll(IDBKeyRange.upperBound(5)); // price < 5
  priceIndex.getKey(5).onsuccess = (event) => { // id of a first record with a price of 5
    booksStore.delete(event.target.result); // delete the record by key
  };

  // Using cursors.
  // Cursors can specify range and direction of passing values
  // openCursor([range], [direction])
  //   range – IDBKeyRange
  //   direction – 'next' | 'prev' | 'nextunique' | 'prevunique'
  //     use 'nextunique'/'prevunique' to only iterate over first records under index key
  //
  // 1. Using a normal cursor to grab whole record objects
  priceIndex.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      // cursor.key is the index key, and cursor.value is the whole record
      console.log(`ID: ${cursor.value.id}, price: ${cursor.key}`);
      cursor.continue();
    }
  };

  // 2. Using a key cursor to grab record object keys
  priceIndex.openKeyCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      // cursor.key is the index key, and cursor.primaryKey is the id
      // No way to directly get the rest of the stored record!
      console.log(`ID: ${cursor.primaryKey}, price: ${cursor.key}`);
      cursor.continue();
    }
  };
};
