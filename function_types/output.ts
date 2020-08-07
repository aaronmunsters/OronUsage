import { OronAnalysis } from "../node_modules/oron-as/dependancies/analysis/analysis";
import {
  Types,
  ArgsBuffer,
} from "../node_modules/oron-as/dependancies/analysis/analysisDependancies";

let booleanAcc: boolean = true;
const functionsInUse: string[] = [];

export function getBool(): boolean {
  return booleanAcc;
}
let ctr: i32 = 0;
export function getNext(): string {
  if (ctr === functionsInUse.length) {
    return "__no_more_functions";
  } else {
    let tmp = ctr;
    ctr++;
    return functionsInUse[tmp];
  }
}

export const numbersCollecting: i32[] = [];

export class MyAnalysis extends OronAnalysis {
  genericApply(fname: string, fptr: usize, args: ArgsBuffer): void {
    for (let argIdx = 0; argIdx < args.argsAmount; argIdx++) {
      // loop over all arguments
      switch (args.dynamicTypes[argIdx]) {
        case Types.boolean:
          booleanAcc = booleanAcc && args.getArgument<boolean>(argIdx);
        case Types.i32:
          numbersCollecting.push(args.getArgument<i32>(argIdx));
          if (functionsInUse.indexOf(fname) === -1) functionsInUse.push(fname);
      }
    }
  }
}

const myAnalysis = new MyAnalysis();

function apply3Args<RetType,In0,In1,In2>(
  fname: string,
  fptr: usize,
  argsBuff: ArgsBuffer,
): RetType {
  myAnalysis.genericApply(fname, fptr, argsBuff);
  
  const func: (in0: In0,in1: In1,in2: In2) => RetType = changetype<(in0: In0,in1: In1,in2: In2)=> RetType>(fptr);
  const res: RetType = func(argsBuff.getArgument<In0>(0),argsBuff.getArgument<In1>(1),argsBuff.getArgument<In2>(2));
  return res
  
}


function apply2Args<RetType,In0,In1>(
  fname: string,
  fptr: usize,
  argsBuff: ArgsBuffer,
): RetType {
  myAnalysis.genericApply(fname, fptr, argsBuff);
  
  const func: (in0: In0,in1: In1) => RetType = changetype<(in0: In0,in1: In1)=> RetType>(fptr);
  const res: RetType = func(argsBuff.getArgument<In0>(0),argsBuff.getArgument<In1>(1));
  return res
  
}
function expectingTrues(x: boolean, y: boolean, z: boolean): boolean {
    return x && y && z;
}
function addingNumbers(a: i32, b: i32): i32 {
    return a + b;
}
export function main(): void {
    (function (arg0: boolean, arg1: boolean, arg2: boolean): boolean { var args = new ArgsBuffer([sizeof<boolean>(), sizeof<boolean>(), sizeof<boolean>()]); args.setArgument<boolean>(0, Types.boolean, arg0, 0); args.setArgument<boolean>(1, Types.boolean, arg1, 0); args.setArgument<boolean>(2, Types.boolean, arg2, 0); return apply3Args<boolean, boolean, boolean, boolean>("expectingTrues", changetype<usize>(expectingTrues), args); })(true, true, true);
    (function (arg0: boolean, arg1: boolean, arg2: boolean): boolean { var args = new ArgsBuffer([sizeof<boolean>(), sizeof<boolean>(), sizeof<boolean>()]); args.setArgument<boolean>(0, Types.boolean, arg0, 0); args.setArgument<boolean>(1, Types.boolean, arg1, 0); args.setArgument<boolean>(2, Types.boolean, arg2, 0); return apply3Args<boolean, boolean, boolean, boolean>("expectingTrues", changetype<usize>(expectingTrues), args); })(true, false, true); // calling with a falsy value
    (function (arg0: i32, arg1: i32): i32 { var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); args.setArgument<i32>(1, Types.i32, arg1, 0); return apply2Args<i32, i32, i32>("addingNumbers", changetype<usize>(// calling with a falsy value
    addingNumbers), args); })(0, 21);
    (function (arg0: i32, arg1: i32): i32 { var args = new ArgsBuffer([sizeof<i32>(), sizeof<i32>()]); args.setArgument<i32>(0, Types.i32, arg0, 0); args.setArgument<i32>(1, Types.i32, arg1, 0); return apply2Args<i32, i32, i32>("addingNumbers", changetype<usize>(addingNumbers), args); })(0, 12);
}
