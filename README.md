# brute

_brute-force distributed collaborative prime hunting_

Current state of project: ideation.

## Architecture

### Client application

- authentication not required
- two modes
  - generate
    - get starting position
    - find primes and composites in range
    - report to datastore
  - verify
    - verify other results, both primes and composites
      
### Datastore

- distributed
- shape
- possible implementations
  - Firebase

### Algorithm

- the Sieve of Eratosthenes
    ```js
    export function listPrimesUnder(limit: number) {
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
    ```
  - pick upper limit
  - generate array of odd numbers from 3 to limit
  - start with 3 and iterate up the list
    - remove every multiple of this number from the list (ideally replace with a null or undefined value)
  - after this has been done for the whole list, filter the list of all null/undefined values and return
  - performance
    - tested on Macbook Intel Core i7 2.8 GHz with 16 GB
    - Chrome finds all primes under 10,000,000 in 100ms using native `Number`
    - Chrome finds all primes under 10,000,000 in 5000ms using native `BigInt`
- Hybrid
  - warm up cache: get all primes under a number,
    probably 1-10 million
  - progressively build up the cache: use sieve until sqrt(upperSearchLimit) is found
  - check lowerSearchLimit to upperSearchLimit with 2 to sqrt(upperSearchLimit).

### Language
  - JS
    - Javascript `BigInt` support is OK, especially for the target audience. Biggest holes: Safari (desktop and mobile), Edge, and IE. [CanIUse BigInt](https://caniuse.com/#search=BigInt)
      - should _not_ use `BigInt` exclusively, as it is 50x slower than `Number` (see above)
  - Wasm
    - would need a language that can both target WASM _and_ has a BigInt implementation

## Resources

- [Prime I.T.](http://compoasso.free.fr/primelistweb/page/prime/liste_online_en.php) - "List of prime numbers up to 1000 billion"
- [The Prime Pages](https://primes.utm.edu/) - "The 'Guinness book' of prime number records!  Includes the 5000 largest known primes and smaller ones of selected forms"