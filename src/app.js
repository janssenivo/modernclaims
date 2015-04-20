/**
 * Test app to demonstrate Kinvey integration for CityWatch app on Pebble
 *
 * Ivo Janssen, 2015-04-12
 */

var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: ' MODERN',  icon: 'images/kinvey.png',
  subtitle: 'Claims App',  body: 'Press middle button to continue.'
});

main.show();

main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      title: 'Claims'
    }]
  });
  
  var claimitems = [];
  ajax({ url: 'https://baas.kinvey.com/appdata/kid_WkiTdocbR/CityWatch', type: 'json', 
         headers: {'Authorization':'Basic <secret here>'} },
         function(data) {
      for (var i = 0, len = data.length; i < len; i++) {
        claimitems.push({title:data[i].category, subtitle:data[i].title, 
                      description:data[i].description,address:data[i].description});
      }
  });
  menu.items(0,claimitems);
         
  menu.on('select', function(p) {
    var card = new UI.Card();
    card.body(p.item.description+" address:"+p.item.address);
    card.title(p.item.title);
    card.show();  
  });
  menu.show();
  
});

