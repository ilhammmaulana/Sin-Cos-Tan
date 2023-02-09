import chalk from 'chalk';
import readline from 'readline';
import { clearInterval } from 'timers';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fakeLoading = (keyword) => {
    let spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    return setInterval(() => {
        if (i === spinner.length) {
            i = 0;
        }
        process.stdout.write(`\r${spinner[i]} ${keyword}...`);
        i++;
    }, 50);
};
const loadingCalculate = (act) => {
    const load1 = fakeLoading('Calculated');
    setTimeout(() => {
        clearInterval(load1)
        const load2 = fakeLoading('Preparing result')
        setTimeout(() => {
            console.log('\n' + chalk.green('Success'))
            clearInterval(load2)
            act()
        }, 900);
    }, 1000);
}

console.clear();
console.log(chalk.bold.greenBright("\n Suport Developer : https://github.com/ilhammmaulana"));
console.log(chalk.bold.yellow("\nWhat would you like to do?"));
console.log("\n" + chalk.cyan("1. Calculate sine, cosine, and tangent of an angle"));
console.log(chalk.green("2. Find the area of a triangle"));
console.log(chalk.red("3. Calculator (plus, minus, multiply, divide, modulus)"));
console.log(chalk.magenta("4. Celsius to Fahrenheit Converter\n"));



rl.question("Enter Tools code: ", (choice) => {
    if (choice == 1) {
        // Menghitung sin cos tan
        const calculateTrigonometry = (angle) => {
            let angleInRadians = angle;

            if (!angle.endsWith("rad")) {
                angleInRadians = angle * (Math.PI / 180);
            } else {
                angleInRadians = parseFloat(angle.slice(0, -3));
            }

            const sine = Math.sin(angleInRadians).toFixed(4);
            const cosine = Math.cos(angleInRadians).toFixed(4);
            const tangent = Math.tan(angleInRadians).toFixed(4);

            console.log("\n+-------------------+--------------------+--------------------+");
            console.log("|    Trigonometry   |         Sine       |        Cosine      |");
            console.log("+-------------------+--------------------+--------------------+");
            console.log(`|      ${angle}      |       ${sine}       |       ${cosine}      |`);
            console.log("+-------------------+--------------------+--------------------+");

            return {
                sine,
                cosine,
                tangent
            };
        };

        rl.question("Enter the angle in degrees or radians: ", (angle) => {
            loadingCalculate(() => {
                let results = calculateTrigonometry(angle);
                console.log(`\nThe sine of ${angle} is ${chalk.green(results.sine)}.`);
                console.log(`The cosine of ${angle} is ${chalk.green(results.cosine)}.`);
                console.log(`The tangent of ${angle} is ${chalk.green(results.tangent)}.`);
                rl.close();
            })

        });
    } else if (choice == 2) {
        rl.question("Enter the base of the triangle: ", (base) => {
            rl.question("Enter the height of the triangle: ", (height) => {
                const func = () => {
                    const area = (base * height) / 2;

                    console.log("\nCalculating the Area of a Triangle");
                    console.log("+----------------+");
                    console.log(`|  Base (b) = ${chalk.green(base)} |`);
                    console.log(`| Height (h) = ${chalk.green(height)} |`);
                    console.log("+----------------+");
                    console.log("\nThe formula for the area of a triangle is:");
                    console.log("Area = (b * h) / 2");

                    console.log(chalk.bgMagenta(`\nArea = (${base} * ${height}) / 2 = ${chalk.green(area)}`));
                    console.log("\n+----------------+");
                    console.log(`|  Area (A) = ${chalk.green(area)} |`);
                    console.log("+----------------+");

                    console.log(`\nSummary:`);
                    console.log(`The base of the triangle is ${chalk.yellowBright(base)}.`);
                    console.log(`The height of the triangle is ${chalk.yellowBright(height)}.`);
                    console.log(`The area of the triangle is ${chalk.green(area)}.`);

                    rl.close();
                }
                loadingCalculate(func)
            });
        });
    } else if (choice == 3) {
        console.clear();
        console.log(chalk.bold.red("\nCalculator"));
        console.log("\n" + chalk.yellow("Enter the first number:"));
        rl.question("", function (num1) {
            console.log(chalk.yellow("Enter the second number:"));
            rl.question("", function (num2) {
                console.log(chalk.yellow("Enter the operation (+, -, *, /, %):"));
                rl.question("", function (operator) {
                    let result;
                    switch (operator) {
                        case '+':
                            result = parseFloat(num1) + parseFloat(num2);
                            break;
                        case '-':
                            result = parseFloat(num1) - parseFloat(num2);
                            break;
                        case '*':
                            result = parseFloat(num1) * parseFloat(num2);
                            break;
                        case '/':
                            result = parseFloat(num1) / parseFloat(num2);
                            break;
                        case '%':
                            result = parseFloat(num1) % parseFloat(num2);
                            break;
                        default:
                            console.log(chalk.red("\nInvalid operator."));
                            rl.close();
                            return;
                    }
                    console.log(chalk.green("\n+-----------------------+"));
                    console.log("| " + chalk.bold.yellow(`${num1} ${operator} ${num2} =`) + " " + chalk.bold.yellow(result) + " |");
                    console.log(chalk.green("+-----------------------+\n"));
                    rl.close();
                });
            });
        });
    } else if (choice == 4) {
        console.clear();
        console.log(chalk.bold.red("\nCelsius to Fahrenheit Converter"));
        console.log("\n" + chalk.yellow("Enter the temperature in Celsius:"));
        rl.question("", function (celsius) {
            const fahrenheit = (parseFloat(celsius) * 9 / 5) + 32;
            console.log(chalk.green("\n+-------------------------+"));
            console.log("| " + chalk.bold.yellow(`${celsius}°C`) + " = " + chalk.bold.yellow(`${fahrenheit}°F`) + " |");
            console.log(chalk.green("+-------------------------+\n"));
            rl.close();
        });
    } else {
        console.log("Invalid choice. Please enter 1 or 2.");
        rl.close();
    }
});
