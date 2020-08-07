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
