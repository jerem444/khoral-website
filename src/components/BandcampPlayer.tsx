const BandcampPlayer = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <iframe
        style={{ border: 0, width: '100%', maxWidth: '350px', height: '470px' }}
        src="https://bandcamp.com/EmbeddedPlayer/album=1912367816/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/"
        seamless
        className="rounded-lg shadow-lg"
      >
        <a href="https://khoral.bandcamp.com/album/all-the-lost-weekends">
          All the Lost Weekends de Khoral
        </a>
      </iframe>
    </div>
  );
};

export default BandcampPlayer; 