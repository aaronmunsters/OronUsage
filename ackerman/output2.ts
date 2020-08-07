import { OronAnalysis } from "../node_modules/oron-as/dependancies/analysis/analysis";
import {
  Types,
  ArgsBuffer,
} from "../node_modules/oron-as/dependancies/analysis/analysisDependancies";

let count: i32 = 0,
  zeroes: i32 = 0;
export function getCount(): i32 {
  return count;
}
export function getZeroes(): i32 {
  return zeroes;
}

export class MyAnalysis extends OronAnalysis {
  genericApply(fname: string, fptr: usize, args: ArgsBuffer): void {
    if (fname === "ackermann") {
      count++; // increment counter
      if (args.getArgument<i32>(0) === 0) zeroes++;
      if (args.getArgument<i32>(1) === 0) zeroes++;
    }
  }
  genericPostApply<ResType>(
    fname: string,
    fptr: usize,
    args: ArgsBuffer,
    result: ResType
  ): ResType {
    return result;
  }
}

const myAnalysis = new MyAnalysis();

function apply2Args<RetType, In0, In1>(
  fname: string,
  fptr: usize,
  argsBuff: ArgsBuffer
): RetType {
  myAnalysis.genericApply(fname, fptr, argsBuff);
  const func: (in0: In0, in1: In1) => RetType = changetype<
    (in0: In0, in1: In1) => RetType
  >(fptr);
  const res: RetType = func(
    argsBuff.getArgument<In0>(0),
    argsBuff.getArgument<In1>(1)
  );
  return myAnalysis.genericPostApply<RetType>(fname, fptr, argsBuff, res);
}
let realCount: i32 = 0;
export function getRealCount(): i32 {
  return realCount;
}
function ackermann(m: i32, n: i32): i32 {
  realCount++;
  if (m == 0) {
    return n + 1;
  } else if (n == 0) {
    return (function (arg0: i32, arg1: i32): i32 {
      var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]);
      args.setArgument<i32>(0, Types.i32, arg0, 0);
      args.setArgument<i32>(1, Types.i32, arg1, 0);
      return apply2Args<i32, i32, i32>(
        "ackermann",
        changetype<usize>(ackermann),
        args
      );
    })(m - 1, 1);
  } else {
    return (function (arg0: i32, arg1: i32): i32 {
      var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]);
      args.setArgument<i32>(0, Types.i32, arg0, 0);
      args.setArgument<i32>(1, Types.i32, arg1, 0);
      return apply2Args<i32, i32, i32>(
        "ackermann",
        changetype<usize>(ackermann),
        args
      );
    })(
      m - 1,
      (function (arg0: i32, arg1: i32): i32 {
        var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]);
        args.setArgument<i32>(0, Types.i32, arg0, 0);
        args.setArgument<i32>(1, Types.i32, arg1, 0);
        return apply2Args<i32, i32, i32>(
          "ackermann",
          changetype<usize>(ackermann),
          args
        );
      })(m, n - 1)
    );
  }
}
export function main(): i32 {
  return (function (arg0: i32, arg1: i32): i32 {
    var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]);
    args.setArgument<i32>(0, Types.i32, arg0, 0);
    args.setArgument<i32>(1, Types.i32, arg1, 0);
    return apply2Args<i32, i32, i32>(
      "ackermann",
      changetype<usize>(ackermann),
      args
    );
  })(3, 5);
}
