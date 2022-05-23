import IndexedDB from "./indexedDB";
class DataPersistance {
  private tok2kitDB: IndexedDB;
  constructor() {
    this.tok2kitDB = IndexedDB.getInstance("tok2kitDB", 1, [
      { name: "persistance", keyPath: "id", autoIncrement: true },
    ]);
  }

  public getAll(name: string): any {
    return this.tok2kitDB.getAllObjects(name);
  }

  public async get(name: string, key: string): Promise<any> {
    const data = await this.tok2kitDB.getObject(name, key);

    return data;
  }

  public async add(name: string, data: object): Promise<boolean> {
    return this.tok2kitDB.addObject(name, data);
  }

  public async put(name: string, data: object): Promise<boolean> {
    return this.tok2kitDB.putObject(name, data);
  }

  public async delete(name: string, key: string): Promise<boolean> {
    return this.tok2kitDB.deleteObject(name, key);
  }
}

export default new DataPersistance();
