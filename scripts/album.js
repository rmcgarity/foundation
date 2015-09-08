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

// Ralph's Album
var albumCharlesTrenet = {
    name: 'Le Tour De Chant De Charles Trenet',
    artist: 'Charles Trenet',
    label: 'Columbia',
    year: '1956',
    albumArtUrl: 'assets/images/album_covers/Charles-Trenet.jpg',
    songs: [
        { name: 'En Attendant Ma Belle', length: '5:02' },
        { name: 'La Petite Musique', length: '5:01' },
        { name: 'L\'Ane Et Le Gendarme', length: '3:50'},
        { name: 'La Java Du Diable', length: '4:14' },
        { name: 'J\'ai Mordu Dans Le Fruit', length: '2:15'}
    ]
};

var albumChoices = [albumPicasso, albumMarconi, albumCharlesTrenet];

var createSongRow = function(songNumber, songName, songLength) {
    
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    return template;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

    // #1


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

var count = 1;
var chooseAndDisplayAlbumCover = function() {
    setCurrentAlbum(albumChoices[count % 3]);
    count++;
}

window.onload = function() {
    setCurrentAlbum(albumChoices[0]);
    albumImage.addEventListener("click", chooseAndDisplayAlbumCover);
};