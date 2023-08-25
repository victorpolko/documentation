// https://www.youtube.com/watch?v=8aGhZQkoFbQ
// https://www.youtube.com/watch?v=cCOL7MC4Pl0

// Tasks queue and microtask queue are only worked with when the main stack is empty.
// Tasks are taken one-by-one with a main stack check after each.
// Microtasks are taken as a batch, and processed until the microqueue is empty.

function checkMicroqueue() {
  console.log('start');
  setTimeout(function() {
    console.log('task 1 started');
    queueMicrotask(function() {
      console.log('microtask 1 done');
    });
    queueMicrotask(function() {
      console.log('microtask 2 done');
    });
    console.log('task done');
  }, 0);

  queueMicrotask(function() {
    console.log('microtask 3 done');
  });

  setTimeout(function() {
    console.log('task 2 started');
  });
}

checkMicroqueue();

queueMicrotask(() => {
  console.log('micro task');
  setTimeout(() => { console.log('timeout'); }, 0);
});

Promise.resolve().then(() => {
  console.log('promised');

  queueMicrotask(() => { console.log('micro 1'); });
});
queueMicrotask(() => { console.log('micro 2'); });

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
function createBlock(opts = {}) {
  const block = document.createElement(opts.tag || 'div');
  block.innerText = opts.text || 'Wha?';

  block.style.display = 'flex';
  block.style.alignItems = 'center';
  block.style.justifyContent = 'center';
  block.style.height = opts.height || '100px';
  block.style.width = opts.width || '100px';
  block.style.position = 'absolute';
  block.style.top = opts.top || '0';
  block.style.left = opts.left || '0';
  block.style.backgroundColor = opts.bgc || 'black';
  block.style.border = `2px solid ${opts.border || 'white'}`;

  return block;
}

function moveRAF(block, direction = true) {
  const left = parseInt(block.style.left);
  direction =
    direction && left <= document.body.clientWidth - parseInt(block.style.width) || left === 0;

  block.style.left = direction ? `${(left + 1)}px` : `${(left - 1)}px`;
  requestAnimationFrame(moveRAF.bind(this, block, direction));
}

function moveTimeout(block, direction = true) {
  const left = parseInt(block.style.left);
  direction =
    direction && left <= document.body.clientWidth - parseInt(block.style.width) || left === 0;

  block.style.left = direction ? `${(left + 1)}px` : `${(left - 1)}px`;
  setTimeout(moveTimeout.bind(this, block, direction));
}

const rafBlock = createBlock({ text: 'RAF' });
document.body.appendChild(rafBlock);
moveRAF(rafBlock);

const timeoutBlock = createBlock({ text: 'setTimeout', top: '200px', border: 'red' });
document.body.appendChild(timeoutBlock);
moveTimeout(timeoutBlock);

// or this as an address
// data:text/html, <html><head><title>RAF vs Timeout</title></head><body style="color: white"><script>function createBlock(opts = {}) {const block = document.createElement(opts.tag || 'div'); block.innerText = opts.text || 'Wha?'; block.style.display = 'flex'; block.style.alignItems = 'center'; block.style.justifyContent = 'center'; block.style.height = opts.height || '100px'; block.style.width = opts.width || '100px'; block.style.position = 'absolute'; block.style.top = opts.top || '0'; block.style.left = opts.left || '0'; block.style.backgroundColor = opts.bgc || 'black'; block.style.border = `2px solid ${opts.border || 'white'}`; return block; } function moveRAF(block, direction = true) {const left = parseInt(block.style.left); direction = direction && left <= document.body.clientWidth - parseInt(block.style.width) || left === 0; block.style.left = direction ? `${(left + 1)}px` : `${(left - 1)}px`; requestAnimationFrame(moveRAF.bind(this, block, direction)); } function moveTimeout(block, direction = true) {const left = parseInt(block.style.left); direction = direction && left <= document.body.clientWidth - parseInt(block.style.width) || left === 0; block.style.left = direction ? `${(left + 1)}px` : `${(left - 1)}px`; setTimeout(moveTimeout.bind(this, block, direction)); } const rafBlock = createBlock({ text: 'RAF' }); document.body.appendChild(rafBlock); moveRAF(rafBlock); const timeoutBlock = createBlock({ text: 'setTimeout', top: '200px', border: 'red' }); document.body.appendChild(timeoutBlock); moveTimeout(timeoutBlock);</script></body></html>
