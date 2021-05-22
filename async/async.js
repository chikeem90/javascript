const { reject } = require("async");

function fetchUser() {
    return new Promise((resolve, reject) => {
        return 'chikeem90';
    });
}

const user = fetchUser();
console.log(user);