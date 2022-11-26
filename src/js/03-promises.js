const refs = {
    btn : document.querySelector('button'),
    form : document.querySelector('.form'),
    delayInput : document.querySelector('input[name=delay]'),
    step : document.querySelector('input[name=step]'),
    amount : document.querySelector('input[name=amount]'),
}



const { btn, form, delayInput, step, amount } = refs

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    
    return   new Promise((resolve, reject) => {
        
            if (shouldResolve) {
            resolve({ position, delay })
            } else { reject({ position, delay })}
            
        })
}



function onSuccess({ position, delay }) {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}


function onError({ position, delay }) {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}



const onSubmit = (evt) => {
    evt.preventDefault()

    for (let i = 1, totalDelay = Number(delayInput.value); i <= Number(amount.value);
        i += 1, totalDelay += Number(step.value)) {
        setTimeout(() => createPromise(i, totalDelay).then(onSuccess).catch(onError), totalDelay)
    }
}


refs.form.addEventListener('submit', onSubmit)


































// function createPromise(position, delay) {
    
//     const promise = new Promise((resolve, reject) => {
//         () => {
//             const shouldResolve = Math.random() > 0.3;
//             if (shouldResolve) {
//                 resolve({
//                     position,
//                     delay,
//                 })
//             } else {
//                 reject({
//                     position,
//                     delay,
//                 })
//             }
//         }   
//     })
//     return promise
    
// }


// let counter = 1


// form.addEventListener('submit', (evt) => {
//     evt.preventDefault()
//     if (counter <= 3) {
//         setInterval(createPromise(counter, step.value)
//             .then(({ position, delay }) => {
//             console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         })
//         .catch(({ position, delay }) => {
//             console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//         }), 2000)
//     }
    
    
//     // setTimeout(createPromise(1, step.value).then((result)=>console.log(done)).catch((result) => console.log(Fail)), delayInput)

//     // const interval = setInterval(createPromise(), step.value)
//     // setTimeout(interval, delayInput.value)

// })