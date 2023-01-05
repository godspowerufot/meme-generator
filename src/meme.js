import React, { useEffect } from "react";

function Meme() {
  //update the text input and url
  const [meme, getmeme] = React.useState({
    topText: "",
    buttomText: "",
    randomImage: "https://i.imgflip.com/1g8my4.jpg",
  });
  //update the Api state
  const [memedata, setMemedata] = React.useState([]);

  // this function update the text input
  function handle(event) {
    const { name, value } = event.target;
    getmeme((p) => ({ ...p, [name]: value }));
  }

  // handle all event outside the react hanad ,  must have a callback function and a counter array to avoid multiple update
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((Response) => Response.json())
      .then((datas) => setMemedata(datas.data.memes)); // set the meme data from the api to the use state
  }, []);

  //randomize the data and url
  function Handleclick() {
    const random = Math.floor(Math.random() * memedata.length);
    const url = memedata[random].url;
    console.log(url);
    getmeme((p) => ({ ...p, randomImage: url })); // update the memeILmage to the randomize url
  }
  //render it on the screen
  return (
    <>
      <main>
        <div className="form">
          <input
            type="text"
            placeholder="Top text"
            className="form-input"
            name="topText"
            value={meme.topText}
            onChange={handle}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form-input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handle}
          />
          <button className="form-button" onClick={Handleclick}>
            Get a new meme meme image 🖼️
          </button>
        </div>
        {/* //where the image is being change */}
        <div className="meme">
          <img src={meme.randomImage} className="meme-image" alt="meme" />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </main>
    </>
  );
}

export default Meme;
