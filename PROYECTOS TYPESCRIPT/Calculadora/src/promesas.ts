function getNumber(): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(5);
    }, 1000);
  });
}

/*getNumber().then(n => {
  console.log("El número es:", n);
});*/

async function main() {
  const n = await getNumber();
  console.log("El número es:", n);
}
//main();

//Crea una Promesa que devuelva el texto `"Hola mundo"`.
const p = new Promise<string>(resolve => {
  resolve("Hola mundo");
});

//p.then(result => console.log(result));

//Crea una Promesa que devuelva el número 10 después de resolver.
const p2 = new Promise<number>(resolve => {
  resolve(10);
});

//p2.then(n => console.log(n));

//Crea una función wait que reciba segundos y devuelva una Promesa.
function wait(seconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

//wait(2).then(() => console.log("Han pasado 2 segundos"));

//Reescribe el ejercicio anterior usando async/await.
async function main2() {
  await wait(1);
  console.log("Esperé 1 segundo");
}

main2();