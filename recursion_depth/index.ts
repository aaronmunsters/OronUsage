function factorial(n: i32): i32 {
  return n === 1 ? 1 : n * factorial(n - 1);
}

function factorialVoid(n: i32): void {
  n === 1 ? 1 : n * factorial(n - 1);
}

export function main(): i32 {
  factorial(3);
  factorial(7);
  factorialVoid(2);
  return factorial(5);
}
