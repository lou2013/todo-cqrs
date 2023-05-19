export interface TodoRepository {
  create();
  delete(id: string);
}
