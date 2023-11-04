import inquirer from 'inquirer';
import chalk from 'chalk';
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for username
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What Is Your Name ?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "Quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.Quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Correct"));
        }
        else {
            console.log(`Correct Answer IS ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, Your Score Is ${chalk.red.bold(score)} Out of ${chalk.red.bold("5")}`);
};
startQuiz();
