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
