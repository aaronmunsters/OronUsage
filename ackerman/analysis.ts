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
}
