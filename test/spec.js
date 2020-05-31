const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
  this.timeout(25000)

  before(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    }).catch(console.log);
  });

  it('has correct title', function() {
    return this.app.client.waitUntilWindowLoaded().getTitle().then(function (title) {
      assert.equal(title, 'Live To Eat');
    }).catch(console.log);
  });

  it('dev tools not open', function() {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened().then(function(devTools) {
        assert.equal(devTools, false);
      }).catch(console.log);
  });

  it('loads correct elements on dashboard', function() {
    return this.app.client.$$('.body').then(function(contents) {
      assert.equal(contents.length, 3);
    }).catch(console.log);
  });
})
