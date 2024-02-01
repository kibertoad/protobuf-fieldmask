import { applyFieldMask, generateFieldMask, WithFieldMask } from "./";
import { expectType } from "tsd";

const obj: Record<string, string> = {
  foo: "bar",
};

expectType<WithFieldMask<Record<string, string>>>(applyFieldMask(obj, ["foo"]))
expectType<string[]>(generateFieldMask(obj))
