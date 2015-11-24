'use strict';

describe('Navigation menu', function() {

  it('changes active link depending on route', function() {
    browser.get('/');
    var activeListItem = element(by.css('.active'));
    var text = activeListItem.element(by.tagName('a')).getText();

    expect(text).toEqual('Home');
  });
});