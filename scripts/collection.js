var collectionItemTemplate = 
    '<div class="collection-album-container column fourth">'
  + '  <img src="assets/images/album_covers/01.png"/>'
  + '  <div class="collection-album-info caption">'
  + '    <p>'
  + '      <a class="album-name" href="/album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="/album.html"> Pablo Picasso </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '    </p>'
  + '  </div>'
  + '</div>';

function getAllProperties(obj) {
  var properties = '';
  for (property in obj) {
    properties += '\n' + property;
  }
  alert('Properties of object:' + properties);
}

window.onload = function() {

    // #1
    //var collectionContainer = document.getElementsByName('ralph')[0].childNodes[1];
    var collectionContainer = document.getElementsByClassName('album-covers')[0].childNodes[1];
    
    // # 2
    collectionContainer.innerHTML = '';
    
    // getAllProperties(collectionContainer);
    // #3
    for (var i = 0; i < 12; i++) {
       collectionContainer.innerHTML += collectionItemTemplate;
    }
    
}