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
  - pick upper limit
  - generate array of odd numbers from 3 to limit
  - start with 3 and iterate up the list
    - remove every multiple of this number from the list (ideally replace with a null or undefined value)
  - after this has been done for the whole list, filter the list of all null/undefined values and return
      
### Language
  - JS
    - Javascript `BigInt` support is OK, especially for the target audience. Biggest holes: Safari (desktop and mobile), Edge, and IE. [CanIUse BigInt](https://caniuse.com/#search=BigInt)
  - Wasm
    - would need a language that can both target WASM _and_ has a BigInt implementation

## Resources

- [Prime I.T.](http://compoasso.free.fr/primelistweb/page/prime/liste_online_en.php) - "List of prime numbers up to 1000 billion"
- [The Prime Pages](https://primes.utm.edu/) - "The 'Guinness book' of prime number records!  Includes the 5000 largest known primes and smaller ones of selected forms"