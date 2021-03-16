import { EventEmitter } from "events";

interface EventI {
  [key: string]: string;
}

export class UseCase extends EventEmitter {
  public events: any;

  static setEvents(events: Array<string>): void {
    Object.defineProperty(this.prototype, "events", {
      value: createEvents(events),
      writable: true,
    });
  }
}

function createEvents(events: string[]) {
  return events.reduce((accumulator: EventI, current: string) => {
    accumulator[current] = current;
    return accumulator;
  }, Object.create(null));
}
