var assert = require('assert');

describe('Array', function() {
  describe('#server_testing()', function() {
    it('simple test case for just testing mocha', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
