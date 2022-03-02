import {
  genColor,
  modifyData,
  putIsValid,
  taskIsValid,
  postIsValid,
} from "./function.js";
import assert from "assert";

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

test("modifyData", () => {
  const testingClear = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 1,
  };
  const outClear = {
    title: "1234",
    description: "a1234",
    clear: 1,
    finishDate: expect.any(Object),
  };
  expect(modifyData(testingClear)).toMatchObject(outClear);
  const testing = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 0,
  };
  const out = {
    title: "1234",
    description: "a1234",
    finishDate: null,
  };
  expect(modifyData(testing)).toMatchObject(out);
  const testingDate = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 0,
    targetDate: "",
  };
  expect(modifyData(testingDate)).toMatchObject(out);
  const testingDateString = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 0,
    targetDate: "2022-02-02 23:23",
  };
  expect(modifyData(testingDateString)).toMatchObject(out);
});

const doAdd = (a, b, callback) => {
  callback(a + b);
};

test("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});

test("putIsValid", () => {
  const testing = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 1,
    targetDate: "1234556",
  };
  const res = {
    send: function () {},
    json: function (err) {
      console.log("\n : " + err);
    },
    status: function (responseStatus) {
      assert.equal(responseStatus, 404);
      // This next line makes it chainable
      return this;
    },
  };
  expect(putIsValid(testing, res)).toBe(true);
});
test("post is valid", () => {
  const res = {
    send: function () {},
    json: function (err) {
      console.log("\n : " + err);
    },
    status: function (responseStatus) {
      assert.equal(responseStatus, 404);
      // This next line makes it chainable
      return this;
    },
  };
  const testing = {
    id: "1234",
    title: "1234",
    description: "a1234",
    clear: 1,
    targetDate: "1234556",
  };
  expect(postIsValid(testing, res)).toBe(true);
  const testingTitle = {
    id: "1234",
    description: "a1234",
    clear: 1,
    targetDate: "1234556",
  };
  expect(postIsValid(testingTitle, res)).toBe(true);
  const testingDescription = {
    id: "1234",
    title: "1234",
    clear: 1,
    targetDate: "1234556",
  };
  expect(postIsValid(testingDescription, res)).toBe(true);
  const correct = {
    title: "1234",
    description: "1234",
    targetDate: "",
  };
  expect(postIsValid(correct, res)).toBe(false);
  const correctDate = {
    title: "1234",
    description: "1234",
    targetDate: "2022-02-02 23:23",
  };
  expect(postIsValid(correctDate, res)).toBe(false);
});
