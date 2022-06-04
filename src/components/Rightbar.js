import React from "react";
import './Rightbar.css';
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
const Rightbar = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();
  function selectcategory(category){
    if(localStorage.getItem("cat") == category){
      localStorage.setItem("cat", "none")
      document.getElementById(category).className = "category"
      window.location.reload()
    }else{
      localStorage.setItem("cat", category)
      document.getElementById(category).className = "hovera"
      window.location.reload()
    }
    
  }
  const trends = [
   /* {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: js,
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },*/
  ];
  return (
    <>
    <div className="rightbarContent">
    <div className="details">
          <img alt="profileimg" id="profileimgo" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
              {user.attributes.username.slice(0, 6)}
            </div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>
      <div className="trends" >
        Categories
        
        <div id="memes" onClick={()=> selectcategory("memes")} className="category" style={{marginTop:40}}>Memes</div>
        <div id="songs" onClick={()=> selectcategory("songs")} className="category" style={{marginTop:10}}>Songs</div>
        <div id="sports" onClick={()=> selectcategory("sports")} className="category" style={{marginTop:10}}>Sport</div>
        <div id="gaming" onClick={()=> selectcategory("gaming")} className="category" style={{marginTop:10}}>Gaming</div>
        <div id="news" onClick={()=> selectcategory("news")} className="category" style={{marginTop:10}}>News</div>
        
        {trends.map((e)=> {
          return(
            <>
            
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendTxt">{e.text}</div>
            </div>
            </>
          )
        })}
      </div>
    </div>
    </>
  );
};

export default Rightbar;

