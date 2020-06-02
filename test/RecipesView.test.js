const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Recipes page', function() {

  before(async function() {
    this.timeout(25000);
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    });
    await this.app.start();
    return this.app.client.element('#nav-recipes').click();
  });

  after(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('initially contains no recipes', function() {
    return this.app.client.$$('.list-group-item').then(function(contents) {
      assert.equal(contents, 0);
    }).catch(console.log);
  });

  it('opens the add recipe form', function() {
    return this.app.client.element('#add-recipe-controls').click()
    .element('#add-recipe-form').click().getWindowCount()
    .then(function(numWindows) {
        assert.equal(numWindows, 2);
      });
  });
});
