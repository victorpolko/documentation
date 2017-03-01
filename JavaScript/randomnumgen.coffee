rand = (max) ->
  primes = getPrimes(100)

  r = Date.parse(new Date()) / 1000 % max

  primes[r] % max

getPrimes = (max) ->
  sieve = []
  primes = [1]

  for i in [2...max]
    if !sieve[i]
      primes.push i

      for j in [(i << 1)...max] by i
        sieve[j] = true

  primes

getPrimes2 = (min = 0, max) ->
  sieve = []
  primes = [1]

  for i in [2...max]
    if !sieve[i]
      primes.push i

      for j in [(i << 1)...max] by i
        sieve[j] = true

  primes.filter (n) ->
    n >= min
