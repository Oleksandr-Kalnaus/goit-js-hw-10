import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);

form.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const delay = parseInt(form.delay.value, 10);
    const state = form.state.value;

    if (delay < 0) {
        iziToast.error({
            title: `Error`,
            message: `Delay must be a positive number.`,
            position: 'topRight',
        });
        return;
    };

    createNotification(delay, state);
});

function createNotification(delay, state) {
    const notificationPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    notificationPromise
        .then((delay) => {
            iziToast.success({
                title: `OK`,
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: `Not OK`,
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });
}