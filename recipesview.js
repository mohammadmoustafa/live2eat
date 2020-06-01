const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Recipes page', function() {

  before(function(done) {
    this.timeout(25000);
    this.app = new Application({
      path: electronPath.app.getPath('exe'),
      args: [path.join(__dirname, '..')]
    });
    this.app.start().then(() => {
      done();
    });
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
});
