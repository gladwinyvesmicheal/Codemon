// ==========================================
// POKÉDEBUG QUESTION DATABASE
// ==========================================

const questionDatabase = [

    {
        code:
`print("Hello World"`,

        error:
            "SyntaxError",

        options: [
            'print("Hello World")',
            'print["Hello World"]',
            'print("Hello World"',
            'Print("Hello World")'
        ],

        correctAnswer:
            'print("Hello World")',

        correctedCode:
`print("Hello World")`,

        explanation:
            "The string was missing its closing parenthesis."
    },


    {
        code:
`x = 10
if x > 5
    print("Big")`,

        error:
            "SyntaxError",

        options: [
            'if x > 5:',
            'if x > 5;',
            'if (x > 5)',
            'if x => 5:'
        ],

        correctAnswer:
            'if x > 5:',

        correctedCode:
`x = 10
if x > 5:
    print("Big")`,

        explanation:
            "Python requires a colon after the condition."
    },


    {
        code:
`name = "Alex"
print(name`,

        error:
            "SyntaxError",

        options: [
            'print(name)',
            'print[name]',
            'Print(name)',
            'print(name]'
        ],

        correctAnswer:
            'print(name)',

        correctedCode:
`name = "Alex"
print(name)`,

        explanation:
            "The print function was missing its closing parenthesis."
    },


    {
        code:
`numbers = [1, 2, 3
print(numbers)`,

        error:
            "SyntaxError",

        options: [
            'numbers = [1, 2, 3]',
            'numbers = (1, 2, 3',
            'numbers = {1, 2, 3',
            'numbers = [1; 2; 3]'
        ],

        correctAnswer:
            'numbers = [1, 2, 3]',

        correctedCode:
`numbers = [1, 2, 3]
print(numbers)`,

        explanation:
            "The list was missing its closing square bracket."
    },


    {
        code:
`age = 18
if age >= 18
    print("Adult")`,

        error:
            "SyntaxError",

        options: [
            'if age >= 18:',
            'if age >= 18;',
            'if age => 18:',
            'if age = 18:'
        ],

        correctAnswer:
            'if age >= 18:',

        correctedCode:
`age = 18
if age >= 18:
    print("Adult")`,

        explanation:
            "A colon is required after an if condition."
    },


    {
        code:
`for i in range(5)
    print(i)`,

        error:
            "SyntaxError",

        options: [
            'for i in range(5):',
            'for i in range(5);',
            'for(i in range(5)):',
            'for i = range(5):'
        ],

        correctAnswer:
            'for i in range(5):',

        correctedCode:
`for i in range(5):
    print(i)`,

        explanation:
            "Python needs a colon after the for loop statement."
    },


    {
        code:
`x = 10
print(y)`,

        error:
            "NameError",

        options: [
            'print(x)',
            'print(y)',
            'print("y")',
            'y.print()'
        ],

        correctAnswer:
            'print(x)',

        correctedCode:
`x = 10
print(x)`,

        explanation:
            "The variable y was never defined. The defined variable is x."
    },


    {
        code:
`numbers = [1, 2, 3]
print(numbers[5])`,

        error:
            "IndexError",

        options: [
            'print(numbers[2])',
            'print(numbers[5])',
            'print(numbers[-5])',
            'print(numbers[3])'
        ],

        correctAnswer:
            'print(numbers[2])',

        correctedCode:
`numbers = [1, 2, 3]
print(numbers[2])`,

        explanation:
            "The list has indexes 0, 1 and 2. Index 5 does not exist."
    },


    {
        code:
`x = "10"
y = 5
print(x + y)`,

        error:
            "TypeError",

        options: [
            'print(int(x) + y)',
            'print(x + y)',
            'print(str(x) + y)',
            'print(x - y)'
        ],

        correctAnswer:
            'print(int(x) + y)',

        correctedCode:
`x = "10"
y = 5
print(int(x) + y)`,

        explanation:
            "x is a string, so it must be converted to an integer before addition."
    },


    {
        code:
`x = 10
y = 0
print(x / y)`,

        error:
            "ZeroDivisionError",

        options: [
            'print(x / 1)',
            'print(x / y)',
            'print(x * y)',
            'print(x + y)'
        ],

        correctAnswer:
            'print(x / 1)',

        correctedCode:
`x = 10
y = 0
print(x / 1)`,

        explanation:
            "Division by zero is not allowed. The divisor must be non-zero."
    },


    {
        code:
`def greet()
    print("Hello")`,

        error:
            "SyntaxError",

        options: [
            'def greet():',
            'def greet();',
            'function greet():',
            'def greet:'
        ],

        correctAnswer:
            'def greet():',

        correctedCode:
`def greet():
    print("Hello")`,

        explanation:
            "A function definition needs parentheses and a colon."
    },


    {
        code:
`x = 5
while x > 0
    x -= 1`,

        error:
            "SyntaxError",

        options: [
            'while x > 0:',
            'while x > 0;',
            'while (x > 0)',
            'while x => 0:'
        ],

        correctAnswer:
            'while x > 0:',

        correctedCode:
`x = 5
while x > 0:
    x -= 1`,

        explanation:
            "A while statement also requires a colon."
    },


    {
        code:
`my_dict = {"name": "Alex"}
print(my_dict["age"])`,

        error:
            "KeyError",

        options: [
            'print(my_dict["name"])',
            'print(my_dict["age"])',
            'print(my_dict[age])',
            'print(my_dict.name)'
        ],

        correctAnswer:
            'print(my_dict["name"])',

        correctedCode:
`my_dict = {"name": "Alex"}
print(my_dict["name"])`,

        explanation:
            "The dictionary contains the key name, not age."
    },


    {
        code:
`x = 10
if x = 10:
    print("Yes")`,

        error:
            "SyntaxError",

        options: [
            'if x == 10:',
            'if x = 10:',
            'if x === 10:',
            'if x => 10:'
        ],

        correctAnswer:
            'if x == 10:',

        correctedCode:
`x = 10
if x == 10:
    print("Yes")`,

        explanation:
            "Python uses == to compare values. = is used for assignment."
    },


    {
        code:
`text = "Python"
print(text[10])`,

        error:
            "IndexError",

        options: [
            'print(text[0])',
            'print(text[10])',
            'print(text[-10])',
            'print(text[7])'
        ],

        correctAnswer:
            'print(text[0])',

        correctedCode:
`text = "Python"
print(text[0])`,

        explanation:
            "The word Python has indexes from 0 to 5."
    }

];