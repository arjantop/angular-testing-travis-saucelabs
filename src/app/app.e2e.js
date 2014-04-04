'use strict';

describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('/');

    element(by.css('a[href="#/view2"]')).click();

    var txt = element(by.binding('message'));

    expect(txt.getText()).toEqual('controller 2');
  });
});
