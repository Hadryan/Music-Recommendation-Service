show databases;

use project;

drop table Spotify;
CREATE TABLE Spotify (
    Name VARCHAR(255),
    Artist VARCHAR(255),
    Streams INT(64),
    Week VARCHAR(255),
    PRIMARY KEY (Name, Artist,Week)
);

SELECT COUNT(*) FROM Spotify;

SELECT COUNT(*) FROM Spotify;
show tables;

DROP TABLE BB200;
CREATE TABLE BB200 (
    Artists VARCHAR(255),
    AlbumName VARCHAR(255),
    WeeklyRank INT(4),
    Peak INT(4),
    WeeksChart INT(4),
    Week VARCHAR(255),
    Date INT(64),
    Genre VARCHAR(255),
    PRIMARY KEY (Artists, AlbumName, Week));
    
SELECT COUNT(*) FROM BB200;

CREATE TABLE GrammyAlbums(
    Award VARCHAR(255), 
    GrammyYear INT(11),
	Genre VARCHAR(255),
    Album VARCHAR(255),
    Artist VARCHAR(255), 
	PRIMARY KEY (Award,GrammyYear));
SELECT * FROM GrammyAlbums;
    
    
CREATE TABLE GrammySongs(
    GrammyAward VARCHAR(255), 
    GrammyYear INT(11),
	Genre VARCHAR(255),
    SongName VARCHAR(255),
    Artist VARCHAR(255), 
	PRIMARY KEY (GrammyAward,GrammyYear));

SELECT COUNT(*) FROM GrammySongs;

CREATE TABLE riaaAlbum(
    Album VARCHAR(255), 
    Artist VARCHAR(255),
	Status VARCHAR(255),
    Label VARCHAR(255),
	PRIMARY KEY (Album, Artist));
    
CREATE TABLE riaaSingle(
    SongName VARCHAR(255), 
    Artist VARCHAR(255),
	RiaaStatus VARCHAR(255),
    Label VARCHAR(255),
	PRIMARY KEY (SongName, Artist));



WITH genre AS(
SELECT S.Name, S.Streams, S.Artist
FROM Spotify S
JOIN (SELECT Artist AS art
FROM Artist
WHERE Genres LIKE '%country%') sub
ON S.Artist = sub.art)

SELECT Name AS songname, Artist
FROM genre
INNER JOIN(SELECT Artist AS art, MAX(Streams) AS max_streams
FROM genre 
GROUP BY Artist) sub2
ON genre.Artist = sub2.art AND genre.Streams = sub2.max_streams
ORDER BY genre.Streams DESC;


WITH popular_songs AS (
	SELECT bb.AlbumName AS Song, bb.Artists AS Artist, bb.Date AS Year, bb.Genre AS Genre
	FROM BB200 bb JOIN Spotify spot ON bb.AlbumName = spot.name
    WHERE bb.AlbumName = spot.name AND bb.Artists = spot.Artist)

SELECT DISTINCT Song, Artist, Genre, Year
FROM popular_songs
WHERE Song NOT IN (SELECT SongName FROM GrammySongs)
AND Song NOT IN (SELECT SongName FROM riaaSingle)
AND Year BETWEEN 2015 AND 2016;

