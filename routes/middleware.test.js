import { isLoggedIn, isNotLoggedIn } from "./middlewares";

describe("isLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test("loggedin call next", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("not loggedin error", () => {
    const req = { isAuthenticated: jest.fn(() => false) };
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      result: "failure",
      error: "not loggedIn",
    });
  });
});

describe("notLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test("not loggedin call next", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };
    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("loggedin error", () => {
    const req = { isAuthenticated: jest.fn(() => true) };
    isNotLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      result: "failure",
      error: "already loggedIn",
    });
  });
});
