function Bomb(message, delay) {
    this.message = message;
    setTimeout(() => {
        this.blowUp();
    }, delay * 1000); // взрываем через delay sec
}
