function expectingTrues(x: boolean, y: boolean, z: boolean): boolean {
  return x && y && z;
}

function addingNumbers(a: i32, b: i32): i32 {
  return a + b;
}

export function main(): void {
  expectingTrues(true, true, true);
  expectingTrues(true, false, true); // calling with a falsy value

  addingNumbers(0, 21);
  addingNumbers(0, 12);
}
