let realCount: i32 = 0;

export function getRealCount(): i32 {
  return realCount;
}

function ackermann(m: i32, n: i32): i32 {
  realCount++;
  if (m == 0) {
    return n + 1;
  } else if (n == 0) {
    return ackermann(m - 1, 1);
  } else {
    return ackermann(m - 1, ackermann(m, n - 1));
  }
}

export function main(): i32 {
  return ackermann(3, 5);
}
