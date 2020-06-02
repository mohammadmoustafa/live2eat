import PouchDB from 'pouchdb-browser';

class RecipeStore {
  db: PouchDB.Database<{}>;

  constructor(memory?: boolean) {
    if (memory) {
      PouchDB.plugin(require('pouchdb-adapter-memory'));
      this.db = new PouchDB('recipes', {adapter: 'memory'});
    } else {
      this.db = new PouchDB('recipes');
    }
  }

  addRecipe(recipe: Recipe) {
    return this.db.put(recipe);
  }

  deleteRecipe(id: string, rev: string) {
    return this.db.remove(id, rev);
  }

  getRecipe(id: string) {
    return this.db.get(id, {
      attachments: true,
      binary: true,
    });
  }

  getAllRecipes() {
    return this.db.allDocs({
      include_docs: true,
      attachments: true,
      binary: true,
    });
  }

  getAttachment(docId: string, attachment: string) {
    return this.db.getAttachment(docId, attachent);
  }

  destroy(): Promise<void> {
    return this.db.destroy();
  }
}

export {RecipeStore};
