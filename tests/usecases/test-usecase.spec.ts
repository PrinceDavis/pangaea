import { EventEmitter } from "events";

import { UseCase } from "../../src/usecases/usecase";

describe("UseCase", () => {
  const useCase = new UseCase();

  test("it is an event emitter", () => {
    expect(useCase).toBeInstanceOf(EventEmitter);
  });

  test("setOutputs: is a function", () => {
    expect(UseCase.setEvents).toBeInstanceOf(Function);
  });
  test("setOutputs: add event types", () => {
    UseCase.setEvents(["SUCCESS", "ERROR"]);
    const useCase = new UseCase();
    expect(useCase.events).toEqual({ SUCCESS: "SUCCESS", ERROR: "ERROR" });
  });
});
