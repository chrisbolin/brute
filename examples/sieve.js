/*
npx nodemon demo.js

- find primes between a and b (presumably large numbers)
  - (a < b)
  - find primes 2 thru sqrt(b)
    - key insight:
      if b is not disable by primes <= sqrt(b),
      it is prime!
  - use sieve for 2 thru sqrt
*/

function simpleSieve(limit) {
  /*
  aka the Sieve of Eratosthenes.
  much faster than listFirstPrimes (if you know what you want)
  */
  const length = Math.ceil((limit - 1) / 2); // only odd numbers
  const numbers = Array(length);

  // fill the numbers array
  numbers[0] = 2; // only even number
  for (let i = 1; i < length; i++) {
    // all the odd numbers
    numbers[i] = i * 2 + 1;
  }

  for (let i = 1; i < length; i++) {
    const number = numbers[i];
    if (!number) continue; // item has been removed

    // remove multiples
    // can iterate by number (and not number/2) because all evens have already been removed
    // e.g. when number=3, no need to remove 6, as it isn't even in the list!
    for (let j = i + number; j < length; j += number) {
      numbers[j] = null;
    }
  }

  return numbers.filter(Boolean);
}

function simpleSieveWithPrimesCache(lower, upper, primes) {
  const trialsLength = Math.ceil((upper - lower) / 2); // only odd trials
  const trials = Array(trialsLength);

  const maxPrimeFactor = Math.sqrt(upper);
  const primesLength = primes.length;
  const lastPrime = primes[primesLength - 1];
  const first = lower % 2 === 0 ? lower + 1 : lower; // start with an odd number

  if (maxPrimeFactor > lastPrime)
    throw new Error(`"primes" does not contain sqrt(${upper})`);

  for (let i = 0; i < trialsLength; i++) {
    trials[i] = first + i * 2; // odd numbers greater than the first
  }

  for (let primeIndex = 0; primeIndex < primes.length; primeIndex++) {
    const prime = primes[primeIndex];
    if (prime > maxPrimeFactor) break;

    /* 
    for every lower prime,
    check the `trials` array in two steps:
    1. check every number until you get a hit. then break
    2. null-ify every multiple of this hit
    */

    const smallestCompositeIndex = trials.findIndex(t => t && t % prime === 0);

    if (smallestCompositeIndex === -1) continue;

    for (let j = smallestCompositeIndex; j < trialsLength; j += prime) {
      trials[j] = null;
    }
  }

  return trials.filter(Boolean);
}

function progressiveSearch() {
  const initialSize = 1000 * 1000 * 100; // 100 million limit
  const batchSize = 1000 * 1000 * 20;
  const runs = 2000;

  console.time("init cache");
  let primes = simpleSieve(initialSize);
  console.timeEnd("init cache");

  for (let runIndex = 0; runIndex < runs; runIndex++) {
    const lower = initialSize + runIndex * batchSize;
    const upper = lower + batchSize;
    const runLabel = `run ${runIndex}. ${lower.toLocaleString()}->${upper.toLocaleString()}`;
    console.time(runLabel);
    const result = simpleSieveWithPrimesCache(lower, upper, primes);
    primes = primes.concat(result);
    console.log(primes.slice(primes.length - 3));
    console.timeEnd(runLabel);
  }

  return primes;
  /*
  run 131. 2,720,000,000->2,740,000,000: 17641.322ms
  [ 2759999953, 2759999959, 2759999989 ]
  run 132. 2,740,000,000->2,760,000,000: 17924.824ms
  /Users/chris/repos/brute/examples/sieve.js:97
      primes = primes.concat(result);
                      ^

  RangeError: Invalid array length
      at Array.concat (<anonymous>)
      at progressiveSearch (/Users/chris/repos/brute/examples/sieve.js:97:21)
      at Object.<anonymous> (/Users/chris/repos/brute/examples/sieve.js:106:16)
      at Module._compile (internal/modules/cjs/loader.js:956:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
      at Module.load (internal/modules/cjs/loader.js:812:32)
      at Function.Module._load (internal/modules/cjs/loader.js:724:14)
      at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
      at internal/main/run_main_module.js:17:11
  [nodemon] app crashed - waiting for file changes before starting...

  */
}

console.time("run");
const primes = progressiveSearch();
console.timeEnd("run");
