import { genColor, modifyData, taskIsValid } from "./func/function";

test("genColor", () => {
  const value = genColor();
  expect(Math.floor(value / 1000 / 1000)).toBeGreaterThanOrEqual(0);
  expect(Math.floor(value / 1000 / 1000)).toBeLessThanOrEqual(256);
  expect(Math.floor((value % (1000 * 1000)) / 1000)).toBeGreaterThanOrEqual(0);
  expect(Math.floor((value % (1000 * 1000)) / 1000)).toBeLessThanOrEqual(256);
  expect(Math.floor(value % 1000)).toBeGreaterThanOrEqual(0);
  expect(Math.floor(value % 1000)).toBeLessThanOrEqual(256);
});

test("taskIsValid", () => {
  expect(taskIsValid("wrong")).toBe(false);
  expect(taskIsValid("testing")).toBe(false);
  expect(taskIsValid("title")).toBe(true);
  expect(taskIsValid("targetDate")).toBe(true);
  expect(taskIsValid("description")).toBe(true);
  expect(taskIsValid("clear")).toBe(true);
});

test("modifyData", () => {});

const doAdd = (a, b, callback) => {
  callback(a + b);
};

test("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});
