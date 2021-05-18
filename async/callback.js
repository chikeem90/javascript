'use strict';

console.log('1');
setTimeout(() => {
    console.log('2');
}, 1000);
console.log('3');

// Synchronous callback
function printImmediately(print) {
    print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback
// setTimeout을 wrapping하고 있는 함수
function printWithDelay(print, delay) {
    setTimeout(print, delay);
}
printWithDelay(() => console.log('async callback'), 2000);

// Callback Hell example
class UserStorage {
    // 사용자 로그인 처리
    // 성공할 경우 onSuccess 콜백 함수 호출
    // 실패할 경우 onError 콜백 함수 호출
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }
    // 사용자의 정보를 요청해서 데이터를 받는 함수
    // 성공할 경우 onSuccess 콜백 함수 호출
    // 실패할 경우 onError 콜백 함수 호출
    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const id = prompt('enter your id');
const password = prompt('enter your password');
const userStorage = new UserStorage();
userStorage.loginUser(
    id, 
    password, 
    user => {
        // console.log(user + '로 로그인 되었습니다.');
        userStorage.getRoles(
            user, 
            userWithRole => {
                alert(
                    `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
                );
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
    }
);