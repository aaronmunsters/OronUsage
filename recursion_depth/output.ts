import { OronAnalysis } from "../node_modules/oron-as/dependancies/analysis/analysis";
import {
  OronVoid,
  Types,
  ArgsBuffer,
} from "../node_modules/oron-as/dependancies/analysis/analysisDependancies";

let count: i32 = 0,
  depth: i32 = 0,
  maxDepth: i32 = 0;
export function getCount(): i32 {
  return count;
}
export function getDepth(): i32 {
  return maxDepth;
}

export class MyAnalysis extends OronAnalysis {
  genericApply(fname: string, fptr: usize, args: ArgsBuffer): void {
    count++; // increment counter
    depth++;
    maxDepth = maxDepth > depth ? maxDepth : depth;
  }

  genericPostApply<ResType>(
    fname: string,
    fptr: usize,
    args: ArgsBuffer,
    result: ResType
  ): ResType {
    depth--;
    return result;
  }
}

const myAnalysis = new MyAnalysis();

function apply1Args<RetType,In0>(
  fname: string,
  fptr: usize,
  argsBuff: ArgsBuffer,
): RetType {
  myAnalysis.genericApply(fname, fptr, argsBuff);
  
  const func: (in0: In0) => RetType = changetype<(in0: In0)=> RetType>(fptr);
  const res: RetType = func(argsBuff.getArgument<In0>(0));
  return myAnalysis.genericPostApply<RetType>(fname, fptr, argsBuff, res);
  
}


function apply1ArgsVoid<In0>(
  fname: string,
  fptr: usize,
  argsBuff: ArgsBuffer,
): void {
  myAnalysis.genericApply(fname, fptr, argsBuff);
  const func: (in0: In0) => void = changetype<(in0: In0)=> void>(fptr);
  func(argsBuff.getArgument<In0>(0))
  myAnalysis.genericPostApply<OronVoid>(fname, fptr, argsBuff, new OronVoid());
}
function factorial(n: i32): i32 {
    return n === 1 ? 1 : n * function (arg0: i32): i32 { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); return apply1Args<i32, i32>("factorial", changetype<usize>(factorial), args); }(n - 1);
}
function factorialVoid(n: i32): void {
    n === 1 ? 1 : n * function (arg0: i32): i32 { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); return apply1Args<i32, i32>("factorial", changetype<usize>(factorial), args); }(n - 1);
}
export function main(): i32 {
    (function (arg0: i32): i32 { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); return apply1Args<i32, i32>("factorial", changetype<usize>(factorial), args); })(3);
    (function (arg0: i32): i32 { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); return apply1Args<i32, i32>("factorial", changetype<usize>(factorial), args); })(7);
    (function (arg0: i32): void { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); apply1ArgsVoid<i32>("factorialVoid", changetype<usize>(factorialVoid), args) })(2);
    return function (arg0: i32): i32 { var args = new ArgsBuffer([sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); return apply1Args<i32, i32>("factorial", changetype<usize>(factorial), args); }(5);
}
