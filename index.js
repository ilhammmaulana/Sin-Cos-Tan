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

console.log(chalk.bold.yellow("What would you like to do?"));
console.log(chalk.cyan("1. Calculate sine, cosine, and tangent of an angle"));
console.log(chalk.green("2. Find the area of a triangle"));

rl.question("Enter 1 or 2: ", (choice) => {
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
                const area = (base * height) / 2;

                console.log("\nCalculating the Area of a Triangle");
                console.log("+----------------+");
                console.log(`|  Base (b) = ${base} |`);
                console.log(`| Height (h) = ${height} |`);
                console.log("+----------------+");
                console.log("\nThe formula for the area of a triangle is:");
                console.log("Area = (b * h) / 2");

                console.log(`\nArea = (${base} * ${height}) / 2 = ${area}`);
                console.log("\n+----------------+");
                console.log(`|  Area (A) = ${area} |`);
                console.log("+----------------+");

                console.log(`\nSummary:`);
                console.log(`The base of the triangle is ${base}.`);
                console.log(`The height of the triangle is ${height}.`);
                console.log(`The area of the triangle is ${area}.`);

                rl.close();
            });
        });
    } else {
        console.log("Invalid choice. Please enter 1 or 2.");
        rl.close();
    }
});
