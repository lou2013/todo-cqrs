export interface Todo {
  move(): void; //each have their own events
  delete(): void;
  update(): void;
  commit(): void;
}
