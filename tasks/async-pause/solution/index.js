
async function main() {
    // Какая-то логика до паузы
    let expr = 123;

    // Пауза в ~500ms секунду:
    // ...ваш код...
    await new Promise((resolve) => {
        setTimeout

        setTimeout(() => {
            resolve()
        }, 500);
    });

    // Какая-то логика после паузы
    return +expr.toString().split('').reverse().join('')
}
