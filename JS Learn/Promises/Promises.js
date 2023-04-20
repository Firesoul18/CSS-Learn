// let q = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         alert("I am the task in first promise")
//         resolve(5002);
//     }, 2000);
// }).then((c)=>{
//     alert("I am the task in second promise"+c);
//     return new Promise(
//         (resolve,reject)=>{
//             setTimeout(() => {
//                 alert("I am the promise returned by the first promise. and doing this task");
//                 reject(90);
//             },4000)
//         }
//     )
// }).then((d)=>{
//     alert("I am the task in third promise"+d);
// }).catch((f)=>{
//     alert(f);
// })



let p = new Promise((resolve,reject)=>{
    setTimeout(()=>
    reject(8),2000)
});

let q = new Promise((resolve,reject)=>{
    setTimeout(()=>
    resolve(88),4000)
});

let r = new Promise((resolve,reject)=>{
    setTimeout(()=>
    resolve(888),6000)
});

Promise.all([p,q,r]).then(
    (v)=>{
        console.log(v);
    },(x)=>{
        console.log("Error: "+x);
    }
)

Promise.allSettled([p,q,r]).then(
    (v)=>{
        console.log(v);
    },(x)=>{
        console.log("Error: "+x);
    }
)

Promise.race([p,q,r]).then(
    (v)=>{
        console.log(v);
    },(x)=>{
        console.log("Error: "+x);
    }
)

Promise.any([p,q,r]).then(
    (v)=>{
        console.log(v);
    },(x)=>{
        console.log("Error: "+x);
    }
)