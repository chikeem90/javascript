// executor 콜백 함수를 전달해줘야 함.
// 이 콜백 함수는 또 다른 콜백 함수 두 개를 받는데
// resolve와 reject
// 기능을 정상적으로 수행해서 마지막에 최종 데이터를 전달하는 resolve
// 기능을 수행하다가 중간에 문제가 생길 경우 수행되는 reject
// reject는 보통 Error 오브젝트를 통해서 값을 전달한다.
// Error는 자바스크립트에서 제공하는 오브젝트
// 1. Producer
const promise = new Promise((resolve, reject) => {
    // 무거운 일을 수행한다. (네트워크 통신,, 등,,)
    // 시간이 오래 걸리는 작업을 동기적으로 수행할 경우, 
    // 다음 라인이 수행이 안되고 있을 것이기 때문에,,
    // 비동기적으로 처리하는 것이 좋다.
    console.log('doing something...');
    setTimeout(() => {
        resolve('ellie');
        // reject(new Error('no network'));
    }, 2000);
});
// 프로미스를 만드는 순간 executor 콜백 함수가 바로 수행이 되게 된다.
// 사용자가 버튼을 눌렀을 때 network 통신이 일어나야 하는 경우에는 이렇게 사용해선 안되고 유의해야 함.

// 2. Consumer
// then, catch, finally를 통해서 값을 받아올 수 있다.
// 정상적으로 수행됐다면 => then,, 
// 실패 시 => catch
// 성공 실패 상관없이 무조건 마지막에 수행되는 함수
// resolve에서 넘긴 값이 파라미터값으로 전달되어진다.
// 성공되는 케이스만 잡고 있기 때문에,,
// then의 결과로 promise를 반환하기 때문에 그 리턴된 promise로 다시 catch할 수 있는 것이다.
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    });

// promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

// then의 경우 값 또는 Promise를 전달할 수 있다
fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then(num => console.log(num));

// error handling
const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(`${hen} => 🥚`),
            reject(new Error(`error! ${hen} => 🥚`)),
            1000
        });
    });
const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    });

// getHen()
//     .then(hen => getEgg(hen))
//     .then(egg => cook(egg))
//     .then(meal => console.log(meal));

// 한가지만 받아서 바로 넘기는 경우 생략 가능
getHen()
    .then(getEgg)
    // 계란을 받아올 때 에러가 발생한 경우 빵을 리턴하도록 처리
    .catch(error => {
        return '🍞';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);