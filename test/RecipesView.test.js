const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path');

describe('Recipes page', function() {

  let app, db;

  beforeAll(async function() {
    if (!globalThis.fetch) {
      globalThis.fetch = require('node-fetch');
      globalThis.Headers = fetch.Headers;
    }

    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    });
    await app.start();
    return app.client.element('#nav-recipes').click();
  });

  afterAll(function() {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  test('initially contains no recipes', function() {
    return app.client.$$('.list-group-item').then(function(contents) {
      expect(contents.length).toEqual(0);
    });
  });

  test('opens the add recipe form', function() {
    return app.client.element('#add-recipe-controls').click()
    .element('#add-recipe-form').click().getWindowCount()
    .then(function(numWindows) {
        expect(numWindows).toEqual(2);
      });
  });

});
