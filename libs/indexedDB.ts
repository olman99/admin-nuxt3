class IndexedDB {
  private static instance: IndexedDB | null = null;
  private db: IDBDatabase | null = null;
  private dbname: string = "";
  private version: number = 0;
  private static dbsName: Array<string> = [];
  private static versions: Array<number> = [];
  private constructor() {}

  private static initialize(dbname: string, version: number): void {
    this.dbsName.push(dbname);
    this.versions.push(version);
  }

  public static getInstance(
    dbname: string,
    version: number,
    tables: Array<{ name: string; keyPath: string; autoIncrement: boolean }>
  ): IndexedDB {
    if (
      this.instance &&
      this.dbsName.includes(dbname) &&
      this.versions.includes(version)
    ) {
      return this.instance;
    }
    this.initialize(dbname, version);
    this.instance = new IndexedDB();
    this.instance.dbname = dbname;
    this.instance.version = version;
    this.instance.open(this.instance, tables);

    return this.instance;
  }

  private open(
    instance: IndexedDB,
    tables: Array<{ name: string; keyPath: string; autoIncrement: boolean }>
  ) {
    if ((process as any).client) {
      let request = window.indexedDB.open(this.dbname, this.version);

      request.onerror = (event) => {
        console.log(
          `Open database ${this.dbname} in version ${this.version} not successfully. Error: `,
          (event.target as any).errorCode
        );
      };

      request.onsuccess = (event) => {
        this.db = request.result;
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        this.db = (event.target as any).result;

        tables.forEach((el) => {
          instance?.createTable(el.name, el.keyPath, el.autoIncrement);
        });
      };
    }
  }

  private createTable(
    tableName: string,
    keyPath: string,
    autoIncrement: boolean
  ) {
    if (this.db !== null) {
      this.db.createObjectStore(tableName, { keyPath, autoIncrement });
    }
  }

  private createTransaction(
    name: string,
    type: IDBTransactionMode
  ): IDBTransaction | null {
    if (this.db !== null) {
      let transaction: IDBTransaction = this.db.transaction([name], type);
      return transaction;
    }
    return null;
  }

  public getAllObjects(name: string): any {
    let transaction = this.createTransaction(name, "readonly");
    if (transaction !== null) {
      let object: Array<any> = [];
      transaction.oncomplete = () => {
        return object;
      };
      let store = transaction.objectStore(name);

      store.openCursor().onsuccess = (e) => {
        let cursor = (e.target as any).result;
        if (cursor) {
          object.push(cursor.value);
          cursor.continue();
        }
      };
    }
  }

  public async getObject(name: string, key: string): Promise<any> {
    return new Promise((resolve) => {
      let transaction = this.createTransaction(name, "readonly");
      if (transaction !== null) {
        let store = transaction.objectStore(name);

        let request = store.get(key);
        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          resolve(null);
        };
      }
    });
  }

  public async addObject(name: string, data: object): Promise<boolean> {
    return new Promise((resolve) => {
      let transaction = this.createTransaction(name, "readwrite");
      if (transaction !== null) {
        let store = transaction.objectStore(name);
        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = () => {
          resolve(false);
        };

        store.add(data);
      }
    });
  }

  public async putObject(name: string, data: object): Promise<boolean> {
    return new Promise((resolve) => {
      let transaction = this.createTransaction(name, "readwrite");
      if (transaction !== null) {
        let store = transaction.objectStore(name);
        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = () => {
          resolve(false);
        };

        store.put(data);
      }
    });
  }

  public async deleteObject(
    name: string,
    data: IDBValidKey | IDBKeyRange
  ): Promise<boolean> {
    return new Promise((resolve) => {
      let transaction = this.createTransaction(name, "readwrite");
      if (transaction !== null) {
        let store = transaction.objectStore(name);
        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onerror = () => {
          resolve(false);
        };

        store.delete(data);
      }
    });
  }
}

export default IndexedDB;
