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

function listPrimesUnder(limit) {
  /*
  aka the Sieve of Eratosthenes.
  much faster than listFirstPrimes (if you know what you want)
  */
  const length = Math.ceil((limit - 1) / 2);
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

function listPrimesUnderBigInt(limit) {
  /*
  aka the Sieve of Eratosthenes.
  much faster than listFirstPrimes (if you know what you want)
  */
  const length = (limit - 1n) / 2n + 1n;
  const numbers = Array(length);

  // fill the numbers array
  numbers[0] = 2n; // only even number
  for (let i = 1n; i < length; i++) {
    // all the odd numbers
    numbers[i] = i * 2n + 1n;
  }

  for (let i = 1n; i < length; i++) {
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

console.time("demo");
listPrimesUnder(1000 * 1000 * 1);
// listPrimesUnderBigInt(1000n * 1000n * 1n);
console.timeEnd("demo");