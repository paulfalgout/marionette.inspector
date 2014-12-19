var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;
global.sinon = sinon;

if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom;

  global.document = jsdom('<html><head><script></script></head><body><div id="fixtures" hidden></div></body></html>', null, {
    FetchExternalResources   : ['script'],
    ProcessExternalResources : ['script'],
    MutationEvents           : '2.0',
    QuerySelector            : false
  });

  global.window = document.createWindow();
  global.navigator = global.window.navigator;
  global.location = global.window.location;

}

this.$ = global.$ = global.jQuery = require('jquery');
global._ = global.window._ = require('../../../lib/underscore');
global.Backbone = global.window.Backbone = require('../../../lib/backbone');
global.Backbone.$ = this.$;

require('../../../agent/build/src/core');
