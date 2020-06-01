const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Recipes page', function() {
  this.timeout(60000);

  beforeEach(function() {
    console.log(electronPath.app.getPath('exe'))
    this.app = new Application({
      path: electronPath.app.getPath('exe'),
      args: [path.join(__dirname, '..')]
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('initially contains no recipes', function() {
    return this.app.client.$$('.list-group-item').then(function(contents) {
      assert.equal(contents, 0);
    }).catch(console.log);
  });
});
