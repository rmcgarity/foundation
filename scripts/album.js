// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    return template;
};

var setCurrentAlbum = function(album) {

    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // #2
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};

var findParentByClassName = function(element, className) {
    var thisElement = element;
    while (thisElement && ! thisElement.classList.contains(className)) {
        thisElement = thisElement.parentNode;
    }
    if (thisElement) {
        return thisElement;
    } else {
        return null;
    }
};

var getSongItem = function(element) {
    
    // Return the element with the .song-item-number class.
    // 
    // There are four different relationships the clicked element can have 
    // to the .song-item-number table cell:
    // 1. A child, like the icon or the icon's circular container
    // 2. A parent, like the table row
    // 3. A child of the parent, but neither a child nor parent of .song-item-number, like the table cells
    //    with the classes .song-item-title or .song-item-duration
    // 4. The .song-item-number element itself
    
    // Jean-Denis,
    // First I implemented the code that is commented out below, and it works. It's not exactly the same
    // solution as the Bloc link shows, but it works.
    //    var returnElement = element;
    //    var parentElement = element;
    //    switch (element.className) {
    //        case "song-item-number" : 
    //            // thisElement already is pointing to the song item number.
    //            break;
    //        case "song-item-title" :
    //        case "song-item-duration" :
    //            // Find the parent, and drop into the next case
    //            parentElement = findParentByClassName(element, "album-view-song-item");
    //        case "album-view-song-item" :
    //            // If we we reach this point, then thisElement should contain the parent of the song-item-number
    //            returnElement = parentElement.querySelector('.song-item-number');
    //            break;
    //        default : 
    //              
    //            returnElement = findParentByClassName(element, "song-item-number");
    //            if (! returnElement) {
    //                // Didn't find any of the above cases.
    //                return;
    //            }
    //    }
    // return returnElement;

    // Then I thought about it some more, and the code below seems much simper, and gets the same result.
    // But it doesn't use a switch statement:
    //
    var returnElement = findParentByClassName(element, "album-view-song-item");
    if (returnElement) {
     returnElement = returnElement.querySelector('.song-item-number');
    }
    return returnElement;
}

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null) {
        // alert("currentlyPlayingSong is null.");
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
        // alert("set currentlyPlayingSong to '" + songItem.getAttribute('data-song-number') + "'");
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        // alert("currentlyPlayingSong isn't null, was clicked, and is: '" + currentlyPlayingSong + "'");
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        // alert("currentlyPlayingSong isn't null, but wasn't the one clicked.");
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
        // alert("changed the previously playing song to it's song number, '", currentlyPlayingSongElement.innerHTML, "'\ncurrentlyPlayingSong is now: '" + currentlyPlayingSong + "'");
    }
};
            
// Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
console.log("songListContainer.parentNode.parentNode.className '" + songListContainer.parentNode.className) + "'";
var songRows = document.getElementsByClassName('album-view-song-item');
console.log("songListContainer.parentNode.parentNode.className '" + songListContainer.parentNode.className) + "'";

// Album button templates
var playButtonTemplate  = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function() {
  
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        // #1
        console.log(event.target);
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
 
            // #1
            var leavingSongItem = getSongItem(event.target);
            var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
 
            // #2
            if (leavingSongItemNumber !== currentlyPlayingSong) {
                leavingSongItem.innerHTML = leavingSongItemNumber;
            }
        });
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });

    }
};