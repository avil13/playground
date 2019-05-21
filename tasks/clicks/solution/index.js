//@html

// вынес в самовызывающуюся функцию, что бы не было лишних проблем
(() => {
    const btn = document.getElementById('counter');
    const limit = 3;
    let count = 0;

    btn.addEventListener('click', clickBtn);

    function clickBtn(ev) {
        if (++count >= limit) {
            btn.removeEventListener('click', clickBtn);
        }
        ev.target.innerHTML = `Click me (${count})`;
    }
})();
