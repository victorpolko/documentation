// // Default implicit imports
// import kotlin.*
// import kotlin.annotation.*
// import kotlin.collections.*
// import kotlin.comparisons.*
// import kotlin.io.*
// import kotlin.ranges.*
// import kotlin.sequences.*
// import kotlin.text.*

fun main() {
  // `;` can be omitted, but I think I'll use them, because of JS. Maybe
  println("Hello world!"); // Yay!

  // Constants, variables
  // val FILENAME = "file" // constant, uppercase is not required
  // var count = 2         // variable
  // var filename = "file" // variable
  // filename = "file.txt"
  // count += 1

  // Equality
  // Structural equality (== - a check for equals())
  // Referential equality (=== - two references point to the same object)

  // Integers
  // Default: Int
  // var num = 3 // Int
  //
  // val counter:Byte = 1 // Signed: Byte/Short/Int/Long(L) -128..127
  // val counter:UByte = 1U // Unsigned(U/u): UByte/UShort/UInt/ULong(UL) 0..255
  // val counter = 1L // Explicitly set Long
  // val counter:Long = 1L // Explicitly set Long ?

  // Floating point
  // Default: Double
  // val counter = 1.3 // Double
  //
  // val counter:Double = 1.3 // Floating-point: Float/Double
  // val counter:Double = 1 // Error: type mismatch
  // val counter:Double = 123.5e10
  // val cardNum = 1234_5678_9012_3456L // Ruby way with underscores
  // val hexBytes = 0xFF_EC_DE_5E // Ruby way with underscores
  // val bytes = 0b11010010_01101001_10010100_10010010 // Ruby way with underscores
  //
  // val counter = 2.7182818284 // Double
  // val counter = 2.7182818284f // Float (f/F), actual value is 2.7182817

  // Booleans
  // true/false
  // val yesOrNo: Boolean = true
  // val yesOrNoOrNull: Boolean? = null

  // Chars (characters)
  // val ch: Char = 'a'
  // val wrongCh: Char = 'any' // Error: too many characters in a character literal
  // print('\n') // Special symbols: \t, \b, \n, \r, \', \", \\, \$,
  // println('\uFF00') // Unicode

  // Strings (immutable)
  // val name: String = "Me" // Only double quotes!
  // A String is an array of chars, so it can be iterated with name[i] or for loop
  //
  // Variables interpolation (string templates):
  // println("filename: $filename") // Single variables – just $
  // println("count + 1: ${++count}") // Operations with variables – ${}
  // // println(count + " is new count now") // error: types are different
  // println(count.toString() + " is new count now") // Concatenato with `+`
  // println("New count: " + count) // No explicit conversion if first arg is a string
  //
  // val text: String = """
  //   Multiline strings are like this. Spaces are saved as is.
  //   They can contain variables like this count: ${count}
  //   Escaping doesn't work, but can be hacked like this: ${'\n'} next line
  // """
  //
  // val trimmedSpacesStr: String = ("""
  //   |To cut the leading whitespaces
  //   |use trimMargin() function
  //   |and these pipes (default prefix for trimMargin)
  //   |or any other symbol
  // """.trimMargin())

  // Arrays
  // Class `Array`
  // Array#get(index) && Array#set(index) ==> Array#[]
  // Array#size
  // First element index is 0
  //
  // Simple
  // val arr = arrayOf(1, 2, 3) // Create an array [1, 2, 3]
  // val nullArr = arrayOfNulls(5) // Create an array [null, null, null, null, null]
  //
  // Using Classes
  // val arr = Array(5) { i -> (i * i).toString() } // ["0", "1", "4", "9", "16"]
  // val arr: Array<String> = Array(5) { (it * it).toString() } // Same, but with explicit type
  //
  // There are special classes for each primitive type
  // val arr = charArrayOf('0', '1', '2')
  // val arr: CharArray = CharArray(5) { (it * it).toChar() }
  // var arr = IntArray(5) { it } // [0, 1, 2, 3, 4]
  //
  // Array Access
  // arr[0] // "0"
  // arr[-1] // Doesn't work!
  // arr.forEach { print("$it ") } // Looks like `it` is the default variable name here, cool
  // arr.forEach { s -> print("$s ") } // 0 1 4 9 16

  // Types check: is !is
  // '\n' is Char // true
  // '\n' !is String // true
  //
  // fun demo(x: Any) {
  //   if (x is String) {
  //     print(x.length) // x is automatically cast to String
  //   }
  // }

  // Types conversion
  // When assigning, types must be cast explicitly
  // val b: Byte = 1 // OK, literals are checked statically
  // // val i: Int = b // ERROR
  // val i: Int = b.toInt()
  //
  // In functions, types are strict, e.g. Double !== Float
  // fun printDouble(d: Double) { print(d) }
  // val i = 1
  // val d = 1.0
  // val f = 1.0f
  //
  // printDouble(d)
  // printDouble(i) // Error: Type mismatch
  // printDouble(f) // Error: Type mismatch
  //
  // In expressions, type is inferred from the context, and arithmetic operations are
  // overloaded to assume for possible conversions on the fly
  // val l = 1L + 3 // Long + Int => Long
  //
  // NaN === NaN, NaN > Infinity
  // println(Double.NaN == Double.NaN) // false ?
  // println(listOf(Double.NaN, Double.POSITIVE_INFINITY, 0.0, -0.0).sorted()) # =>  [-0.0, 0.0, Infinity, NaN]

  // Collections
  // Lists | Sets | Maps
  //
  // List (listOf/mutableListOf): ordered, can have duplicates
  // val readOnlyShapes = listOf("triangle", "square", "circle")
  // val shapes: MutableList<String> = mutableListOf("triangle", "square", "circle");
  // val shapesLocked: List<String> = shapes // Casting to immutable List
  // println(readOnlyShapes) // [triangle, square, circle]
  // println(shapesLocked[0]) // triangle
  // println(shapesLocked[1]) // square
  // println(shapesLocked.first()) // triangle
  // println(shapesLocked.last()) // circle
  // println(shapesLocked.count()) // 3
  // println(shapes.add("hexagon")); // true
  // println(shapes.remove("circle")); // true
  //
  // Set (setOf/mutableSetOf): unordered, unique items only
  // val readOnlyFruit = setOf("apple", "banana", "cherry", "cherry")
  // val fruit: MutableSet<String> = mutableSetOf("apple", "banana", "cherry", "cherry")
  // val fruitLocked: Set<String> = fruit // Casting to immutable Set
  // println(fruit) // [apple, banana, cherry]
  // println(fruit.count()) // 3
  // println("orange" in fruit) // false
  // println(fruit.add("orange")); // true
  // println(fruit.remove("grapes")); // true
  //
  // Map (mapOf/mutableMapOf): key-value pairs
  // val readOnlyJuiceMenu = mapOf("apple" to 100, "kiwi" to 190, "orange" to 100)
  // val juiceMenu: MutableMap<String, Int> = mutableMapOf("apple" to 100, "kiwi" to 190, "orange" to 100)
  // val juiceMenuLocked: Map<String, Int> = juiceMenu // Casting to immutable Map
  // println(juiceMenu) // {apple=100, kiwi=190, orange=100}
  // println(juiceMenu["apple"]) // 100
  // println(juiceMenu.count()) // 3
  // juiceMenu.put("coconut", 150) // Add
  // juiceMenu.put("apple", 111) // Update
  // juiceMenu.remove("orange") // Remove
  // println(juiceMenu) // {apple=100, kiwi=190, coconut=150}
  // println(juiceMenu.containsKey("kiwi")) // true
  // println(juiceMenu.keys) // [apple, kiwi, coconut]
  // println(juiceMenu.values) // [111, 190, 150]
  // println("orange" in juiceMenu.keys) // true
  // println(111 in juiceMenu.values) // true

  // Control Flow
  // Conditional expressions
  //
  // if/else
  // returns value
  //
  // if (condition) {} else if (condition2) {} else {}
  // val check = false
  // val check2 = true
  // if (check) {
  //   println("Yes!")
  // } else if (check2) {
  //   println("Ok!")
  // } else {
  //   println("No!")
  // }
  //
  // if (!check) println("Not again!") // one-line ifs
  // // println(check ? "Yes!" : "No!") // error, no ternary
  // println(if (check) "Yes!" else "No!") // instead of ternary
  //
  // When
  // Only first match will run its code.
  // Returns value from the lambdas.
  //
  // when (compared) {
  //   val1 -> // case code
  //   val2 -> // case code
  //   ...
  //   else -> // default code
  // }
  // or
  // when {
  //   condition1 -> lambda1
  //   condition2 -> lambda2
  //   else -> defaultLambda
  // }
  //
  // val obj = "Hello"
  //
  // when (obj) { // used as a statement
  //   // Checks whether obj equals to "1"
  //   "1" -> println("One")
  //   // Checks whether obj equals to "Hello"
  //   "Hello" -> println("Greeting")
  //   // Default statement
  //   else -> { println("Unknown") } // lambdas can be in {}
  // } // Greeting
  //
  // val result = when (obj) { // used as an expression
  //   "1" -> "One";
  //   "Hello" -> "Greeting";
  //   else -> "Unknown"; // Mandatory here!
  // };
  // println(result); // Greeting

  // Ranges
  // 1..4 ≈ 1, 2, 3, 4 // including last
  // 1..4 step 2 ≈ 1, 2, 3, 4 // step different from 1
  // 1..<4 ≈ 1, 2, 3 // excluding last
  // 4 downTo 1 ≈ 4, 3, 2, 1
  // 'a'..'d' ≈ 'a', 'b', 'c', 'd' // chars as well

  // Loops
  // for/while
  // break/continue
  // return to label
  //
  // for (i in 0..10) { print("$i ") } // Loop over a range from 0 to 10
  // for (i in 0..<10) { print("$i ") } // Loop over a range from 0 to 9
  // for (i in 0 until 10) { print("$i ") } // Loop over a range from 0 to 9
  // for (c in filename) { print("$c ") } // Loop over a string
  //
  // val cakes = listOf("carrot", "cheese", "chocolate") // Loop over collections
  // for (cake in cakes) {
  //     println("Yummy, it's a caky $cake cake!")
  // }
  //
  // while/do-while
  //
  // var cakesEaten = 0
  // var cakesBaked = 0
  // while (cakesEaten < 3) {
  //   println("Eat a cake")
  //   cakesEaten++
  // }
  // do {
  //   println("Bake a cake")
  //   cakesBaked++
  // } while (cakesBaked < cakesEaten)

  // Functions
  // camelCased names
  // arg types and return type are required
  // return type and return can be omitted (if it's a procedure; Unit type is inferred)
  // default arguments (don't have to be listed after simple arguments)
  // named arguments
  //
  // fun aweThreeSum(x: Int, y: Int = 3): Int {
  //   return x + y
  // }
  // println(aweThreeSum(1)) // 4
  // println(aweThreeSum(1, 2)) // 3
  // println(aweThreeSum(y = 3, x = 2)) // 5 (named arguments)
  // println(aweThreeSum(y = 3)) // Error: no value passed for parameter 'x'
  //
  // Shorthand syntax with return type inferring
  // fun sum(x: Int, y: Int) = x + y
  //
  // Function expressions (anonymous functions; or is it lambda) ? not documented ?
  // val sum = fun (x: Int, y: Int): Int {
  //   return x * 2 + y * 2;
  // }
  // println(sum) // (kotlin.Int, kotlin.Int) -> kotlin.Int
  // println(sum(1,3)) //

  // Lambdas
  // Can be passed as arguments to functions
  // Can be returned from function calls
  //
  // Without arguments
  // val noArgLambda = { println("Log message") }
  // println(noArgLambda("hello, lambdoer!")) // Error, too many args
  //
  // With arguments: must define a return type
  // val bda = { string: String -> string.uppercase() } // Simple lambda
  // val bdaWrong = { str -> str.uppercase() } // Error: return type not defined
  // println(bda("hello, lambdoer!")) // HELLO, LABMDoER!
  // println({ string: String -> string.uppercase() }("hello, lambdoer!")) // Same
  //
  // Pass a lambda to a function call
  // val numbers = listOf(1, -2, 3, 0, -4, 5, -6)
  // val positives = numbers.filter { x -> x >= 0 } // () can be omitted, because 1 arg only
  // val negatives = numbers.filter({ x -> x < 0 })
  // println(positives) // [0, 1, 3, 5]
  // println(negatives) // [-2, -4, -6]
  //
  // Function type
  // Lambdas must have return type defined, either from inside of a lambda, or using a
  // function type:
  // val upperCaseString: (String) -> String = { string -> string.uppercase() },
  // where `val upperCaseString: (String) -> String` is the left side of the statement
  //
  // Return lambda from a function
  // With function type knowledge:
  //   fun someFunc(): (Int) -> Int { return { value -> value + 1 } },
  //   where `(Int) -> Int` is the returned type
  //         `{ return { value -> value * 2 } }` is the function body
  //         `{ value -> value * 2 }` is the lambda returned from the function
  //
  // Shorthand syntax is often used:
  //   fun getLambdaFn(): (Int) -> Int = { value -> value * 2 }
  //
  // Examples:
  // fun getLambdaFn(power: Int): (Int) -> Int = { value -> value * 2 * power }
  // val lbd = getLambdaFn(3) // A way to create a closure
  // println(lbd(2)) // 12
  //
  // fun toSeconds(time: String): (Int) -> Int = when (time) {
  //   "hour" -> { value -> value * 60 * 60 }
  //   "minute" -> { value -> value * 60 }
  //   "second" -> { value -> value }
  //   else -> { value -> value }
  // }
  // val timesInMinutes = listOf(2, 10, 15, 1)
  // val min2sec = toSeconds("minute")
  // val totalTimeInSeconds = timesInMinutes.map(min2sec).sum()
  // println("Total time is $totalTimeInSeconds secs") // Total time is 1680 secs

  // Classes
  // class Customer
  // println(Customer()) // HelloKt$main$Customer@4e0e2f2a
  //
  // class Contact(val id: Int, var email: String)
  // println(Contact(2, "v123@123.com")) // or Contact(email = "v123@123.com", id = 2), same
  //
  // class Contact(val id: Int, var email: String) {
  //   val category: String = "cat"
  //   val em: String = "altered $email"

  //   fun editEmail(email: String) {
  //     this.email = email;
  //   }
  // }
  // val contact = Contact(2, "v123@123.com")
  // println(contact.category) // cat
  // println(contact.email) // v123@123.com
  // println(contact.em) // altered v123@123.com
  // println(contact.editEmail("example@example.org"))
  // println(contact.email) // example@example.org
  // println(contact.em) // altered v123@123.com
  //
  // Data classes
  // data class User(val name: String, val id: Int)
  // val usr = User("namee", 1)
  // println(usr.toString()) // User(name=namee, id=1); same as `println(usr)`
  // println(usr.equals(User("namee", 1))) // true
  // val usr2 = usr.copy()
  // println(usr.equals(usr2)) // true
  // val usr3 = usr.copy("othername")
  // println(usr.equals(usr3)) // false
  // val usr4 = usr.copy(id = 4)
  // println(usr.equals(usr4)) // false

  // Nullable types
  // var inferredNonNull = "The compiler assumes non-null" // By default, null values aren't accepted
  // inferredNonNull = null // Throws a compiler error
  //
  // var neverNull: String = "This can't be null" // neverNull has String type
  // neverNull = null // Throws a compiler error
  //
  // var nullable: String? = "You can keep a null here" // nullable has nullable String type
  // nullable = null // This is OK
  //
  // fun strLength(notNull: String): Int { // notNull doesn't accept null values
  //   return notNull.length
  // }
  // println(strLength(neverNull)) // 18
  // println(strLength(nullable))  // Throws a compiler error

  // Safe Calls (can be chained)
  // fun lengthString(maybeString: String?): Int? = maybeString?.length
  // // val nullString: String? = null // weird that this doesn't throw at compile time
  // var nullString: String? = null // weird that this doesn't throw at compile time
  // println(lengthString(nullString?.uppercase())) // null
  // println(lengthString(nullString?.uppercase()) ?: 0) // 0; Elvis Operator (?:)
}
