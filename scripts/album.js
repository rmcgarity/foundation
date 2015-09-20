var createSongRow = function(songNumber, songName, songLength) {
    
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
    ;
    var $row = $(template);

    var clickHandler = function() {
        var thisSongNumber = parseInt($(this).attr('data-song-number'));
        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            $currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== thisSongNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong(thisSongNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === thisSongNumber) {
            if (currentSoundFile.isPaused()) {
                currentSoundFile.play();
                $(this).html(pauseButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPauseButton);
            } else {
                currentSoundFile.pause();
                $(this).html(playButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPlayButton);
            }
        }
    };
    var onHover = function(event) {
        var $songItem = $(this).find('.song-item-number');
            
        if (parseInt($songItem.attr('data-song-number')) !== currentlyPlayingSongNumber) {
            $songItem.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var $leavingSongItem = $(this).find('.song-item-number');
        var $leavingSongItemNumber = $leavingSongItem.attr('data-song-number');
        if (parseInt($leavingSongItemNumber) !== currentlyPlayingSongNumber) {
            $leavingSongItem.html($leavingSongItemNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
}

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton);
}

var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
}

var setVolume = function(volume) {
    if (currentSoundFile) {
     currentSoundFile.setVolume(volume);
    }

};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}

var nextPrevSongClickHandler = function(direction) {
    var getLastSongNumber = function(index) {
        return ((index + currentAlbum.songs.length - direction) % currentAlbum.songs.length) + 1;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Increase for next or decrease for prev current by 1, modulo the number of songs
    currentSongIndex = (currentSongIndex + currentAlbum.songs.length + direction) % currentAlbum.songs.length;
    
    // Set a new current song
    setSong(currentSongIndex+1);
    currentSoundFile.play();

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var togglePlayFromPlayerBar = function() {
    var currentSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    if (currentSoundFile) {  
        if (currentSoundFile.isPaused()) {
            currentSoundFile.play();
            currentSongNumberCell.html(pauseButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPauseButton);
        } else {
            currentSoundFile.pause();
            currentSongNumberCell.html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPlayButton);
        }
    }
};

// Album button templates
var playButtonTemplate  = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Create variables in the global scope to hold current song/album information
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');
var $playPauseButton = $('.left-controls .play-pause');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(function() {nextPrevSongClickHandler(-1);});
    $nextButton.click(function() {nextPrevSongClickHandler(1);});
    $playPauseButton.click(function() {togglePlayFromPlayerBar()});
});