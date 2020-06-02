const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {

  let app;

  beforeAll(function () {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return app.start()
  })

  afterAll(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  test('shows an initial window', function () {
    return app.client.getWindowCount().then(function (count) {
      expect(count).toEqual(1);
    })
  });

  it('has correct title', function() {
    return app.client.waitUntilWindowLoaded().getTitle().then(function (title) {
      expect(title).toMatch('Live To Eat');
    });
  });

  it('dev tools not open', function() {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened().then(function(devTools) {
        expect(devTools).toBeFalsy();
      })
  });

  it('loads correct elements on dashboard', function() {
    return app.client.$$('.body').then(function(contents) {
      expect(contents.length).toEqual(3);
    });
  });
})
