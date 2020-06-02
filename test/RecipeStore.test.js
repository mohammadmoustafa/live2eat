const assert = require('assert');
const path = require('path');

describe('Recipe Store', function() {

  before(async function() {
    this.timeout(25000);

    if (!globalThis.fetch) {
      globalThis.fetch = require('node-fetch');
      globalThis.Headers = fetch.Headers;
    }

    const {RecipeStore} = require('../build/js/RecipeStore');
    this.db = new RecipeStore(true);

    this.recipe1 = {
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
    this.recipe2 = {
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

  it('insert recipe into database', function() {
    return this.db.addRecipe(this.recipe1).then(function(res) {
      assert.equal(res.ok, true);
    });
  });

  it('retrieve inserted recipe', function() {
    return this.db.getRecipe('recipe1').then(function(res) {
      assert.equal(res.title, 'Recipe 1');
    });
  });

  it('insert second recipe & retrieve all recipes', function() {
    var self = this;
    return this.db.addRecipe(this.recipe2).then(function() {
      self.db.getAllRecipes().then(function(doc) {
        assert.equal(doc.rows.length, 2);
      });
    })
  });
});
