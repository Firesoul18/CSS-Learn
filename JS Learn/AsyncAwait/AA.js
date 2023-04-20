// let q = new Promise((r,r2)=>{
//     r2("Rejected");
// })

// let x = await p;
// let y = await q;

// console.log(x);
// console.log(y);

let p = new Promise((r,r2)=>{
    setTimeout(()=>
    r("Resolved"),4000)
})

let t = async function(){
    // p.then((result)=>{console.log(result)});
    let x = await p;
    // return x;
    console.log(x)
}

t();
