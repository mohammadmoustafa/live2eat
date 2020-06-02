const assert = require('assert');
const path = require('path');

describe('Recipe Store', function() {

  let db, recipe1, recipe2;

  beforeAll(async function() {
    if (!globalThis.fetch) {
      globalThis.fetch = require('node-fetch');
      globalThis.Headers = fetch.Headers;
    }

    const {RecipeStore} = require('../build/js/RecipeStore');
    db = new RecipeStore(true);

    recipe1 = {
      _id: 'recipe1',
      _attachments: {
        "img": {
          data: Buffer.alloc(10),
          content_type: 'text/html'
        }
      },
      title: "Recipe 1",
      serves: 1,
      prepTime: {hours: 1, mins: 1, label: ""},
      cookTime: {hours: 1, mins: 1, label: ""},
      directions: [],
      ingredients: [],
      category: "Test",
      notes: ''
    }
    recipe2 = {
      _id: 'recipe2',
      _attachments: {
        "img": {
          data: Buffer.alloc(10),
          content_type: 'text/html'
        }
      },
      title: "Recipe 2",
      serves: 1,
      prepTime: {hours: 1, mins: 1, label: ""},
      cookTime: {hours: 1, mins: 1, label: ""},
      directions: [],
      ingredients: [],
      category: "Test",
      notes: ''
    }
  });

  test('insert recipe into database', function() {
    return db.addRecipe(recipe1).then(function(res) {
      expect(res.ok).toBeTruthy();
    });
  });

  test('retrieve inserted recipe', function() {
    return db.getRecipe('recipe1').then(function(res) {
      expect(res.title).toMatch('Recipe 1');
    });
  });

  test('insert second recipe & retrieve all recipes', function() {
    return db.addRecipe(recipe2).then(function() {
      return db.getAllRecipes().then(function(doc) {
        expect(doc.rows.length).toEqual(2);
      });
    });
  });

  test('delete recipe', function() {
    return db.getRecipe('recipe1').then((doc) => {
      return db.deleteRecipe(doc._id, doc._rev).then((res) => {
        expect(res.ok).toBeTruthy();
      });
    });
  });

  test('get stored attachment', function() {
    return db.getAttachment('recipe2', 'img').then(buf => {
      expect(Buffer.compare(buf, Buffer.alloc(10))).toEqual(0);
    });
  });

  test('destroy db', function() {
    return db.destroy().then(res => {
      expect(res.ok).toBeTruthy();
    });
  });

});
