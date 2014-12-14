var $fixtures = $('#fixtures');

var setFixtures = function () {
    _.each(arguments, function (content) {
        $fixtures.append(content);
    });
};

var clearFixtures = function () {
    $fixtures.empty();
};

var originalHash = window.location.hash;

before(function() {
    this.setFixtures = setFixtures;
    this.clearFixtures = clearFixtures;
});

beforeEach(function () {
    this.sinon = sinon.sandbox.create();

    /*
     * This is the Agent secret sauce.
     * We'll want to be able to run this before/after each unit test...
     * but to do that, we'll need to be able to pass in a new Backbone,Marionette
     * which means wrapping these libs in a factory that creates a new one.
    */
return;
    delete window.patchedBackbone;
    delete window.patchedMarionette;
    delete window._knownTypes;
    this._ = _;
    window.Backbone = root.BackboneFactory();
    window.Marionette = window.MarionetteFactory(Backbone);
    window.patchBackbone(Backbone);
    window.patchMarionette(Backbone, Marionette);

    window.knownTypes();

});

afterEach(function () {
    this.sinon.restore();
    this.clearFixtures();
    window.location.hash = originalHash;
    Backbone.history.stop();
    Backbone.history.handlers.length = 0;
});