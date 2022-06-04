import React from "react";
import "./Home.css";
import {defaultImgs} from "../defaultimgs"
import { Icon} from "web3uikit";
import {useState, useRef} from "react";
import MessageInFeed from "../components/MessageInFeed"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {Helmet} from "react-helmet"; 
const Home = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [message, setMessage] = useState();
  const [inputStr, setInputStr] = useState('');
 async function maticSend() {
   if(!message){
     message = " "
   }
   let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }
    let options = {
      contractAddress: "0xee8530268768C1f20A42b4B43e38e2469b651d1D",
      functionName: "sendMessage",
      abi:[{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "MessageTxt",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "MessageImage",
            "type": "string"
          }
        ],
        "name": "messageSent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "MessageTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "MessageImage",
            "type": "string"
          }
        ],
        "name": "sendMessage",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }], 
      params: {
        MessageTxt:message,
        MessageImage: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveMessage();
      },
      onError: (error) => {
        alert(error.data.message)
      }
    });
 }
  async function saveMessage() {
    
    setInputStr(message)
    let cati = "none"
    const Messages = Moralis.Object.extend("Messages");
    const newMessage = new Messages;
    var acl = new Moralis.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    const currentDate = new Date();
    const timestamp = currentDate.getTime();


   

    if(message.replace(/\s/g,'').toLowerCase().includes("meme") || message.replace(/\s/g,'').toLowerCase().includes("funny") || message.replace(/\s/g,'').toLowerCase().includes("laugh") || message.replace(/\s/g,'').toLowerCase().includes("joke") || message.replace(/\s/g,'').toLowerCase().includes("gasgasgas") || message.replace(/\s/g,'').toLowerCase().includes("rickroll") || message.replace(/\s/g,'').toLowerCase().includes("coffindance") || message.replace(/\s/g,'').toLowerCase().includes("tothemoon") || message.replace(/\s/g,'').toLowerCase().includes("juicy") || message.replace(/\s/g,'').toLowerCase().includes("mem")){
      cati = "memes"
    }else if(message.replace(/\s/g,'').toLowerCase().includes("song") || message.replace(/\s/g,'').toLowerCase().includes("sing") || message.replace(/\s/g,'').toLowerCase().includes("lilnasx") || message.replace(/\s/g,'').toLowerCase().includes("rock") || message.replace(/\s/g,'').toLowerCase().includes("hop") || message.replace(/\s/g,'').toLowerCase().includes("pop") || message.replace(/\s/g,'').toLowerCase().includes("jazz") || message.replace(/\s/g,'').toLowerCase().includes("dance") || message.replace(/\s/g,'').toLowerCase().includes("classical") || message.replace(/\s/g,'').toLowerCase().includes("rythm") || message.replace(/\s/g,'').toLowerCase().includes("heavymetal") || message.replace(/\s/g,'').toLowerCase().includes("electronic") || message.replace(/\s/g,'').toLowerCase().includes("funk") || message.replace(/\s/g,'').toLowerCase().includes("tesries") || message.replace(/\s/g,'').toLowerCase().includes("disco")){
      cati = "songs"
    }else if(message.replace(/\s/g,'').toLowerCase().includes("sport") || message.replace(/\s/g,'').toLowerCase().includes("soccer") || message.replace(/\s/g,'').toLowerCase().includes("basketball") || message.replace(/\s/g,'').toLowerCase().includes("cricket") || message.replace(/\s/g,'').toLowerCase().includes("golf") || message.replace(/\s/g,'').toLowerCase().includes("football") || message.replace(/\s/g,'').toLowerCase().includes("track") || message.replace(/\s/g,'').toLowerCase().includes("field") || message.replace(/\s/g,'').toLowerCase().includes("ball") || message.replace(/\s/g,'').toLowerCase().includes("badminton") || message.replace(/\s/g,'').toLowerCase().includes("goal") || message.replace(/\s/g,'').toLowerCase().includes("score") || message.replace(/\s/g,'').toLowerCase().includes("hit") || message.replace(/\s/g,'').toLowerCase().includes("boxing") || message.replace(/\s/g,'').toLowerCase().includes("WWE") || message.replace(/\s/g,'').toLowerCase().includes("worldcup") || message.replace(/\s/g,'').toLowerCase().includes("run") || message.replace(/\s/g,'').toLowerCase().includes("volley") || message.replace(/\s/g,'').toLowerCase().includes("game") || message.replace(/\s/g,'').toLowerCase().includes("pool") || message.replace(/\s/g,'').toLowerCase().includes("swim") || message.replace(/\s/g,'').toLowerCase().includes("hockey") || message.replace(/\s/g,'').toLowerCase().includes("karate")){
      cati = "sports"
    }else if(message.replace(/\s/g,'').toLowerCase().includes("game") || message.replace(/\s/g,'').toLowerCase().includes("gaming") || message.replace(/\s/g,'').toLowerCase().includes("video") || message.replace(/\s/g,'').toLowerCase().includes("minecraft") || message.replace(/\s/g,'').toLowerCase().includes("fortnite") || message.replace(/\s/g,'').toLowerCase().includes("app") || message.replace(/\s/g,'').toLowerCase().includes("steam") || message.replace(/\s/g,'').toLowerCase().includes("install")){
      cati = "gaming"
    }else if(message.replace(/\s/g,'').toLowerCase().includes("new") || message.replace(/\s/g,'').toLowerCase().includes("world") || message.replace(/\s/g,'').toLowerCase().includes("canada") || message.replace(/\s/g,'').toLowerCase().includes("politcs") || message.replace(/\s/g,'').toLowerCase().includes("economy") || message.replace(/\s/g,'').toLowerCase().includes("trump") || message.replace(/\s/g,'').toLowerCase().includes("ukraine") || message.replace(/\s/g,'').toLowerCase().includes("war") || message.replace(/\s/g,'').toLowerCase().includes("shoot") || message.replace(/\s/g,'').toLowerCase().includes("breakingnews") || message.replace(/\s/g,'').toLowerCase().includes("bbc") || message.replace(/\s/g,'').toLowerCase().includes("covid") || message.replace(/\s/g,'').toLowerCase().includes("update") || message.replace(/\s/g,'').toLowerCase().includes("live") || message.replace(/\s/g,'').toLowerCase().includes("usa") || message.replace(/\s/g,'').toLowerCase().includes("texas") || message.replace(/\s/g,'').toLowerCase().includes("mexico")){
      cati = "news"
    }

    newMessage.set("messageTxt", message)
    newMessage.set("senderPfp", user.attributes.pfp);
    newMessage.set("senderAcc", user.attributes.ethAddress);
    newMessage.set("senderUsername", user.attributes.username);
    newMessage.set("ACL", acl)
    newMessage.set("likes", 0)
    newMessage.set("likelist", "")
    newMessage.set("rating", 10000000000000 -  timestamp)
    newMessage.set("cat", cati)
    if(theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newMessage.set("messageImg", file.ipfs());
    }
    await newMessage.save();
    window.location.reload();
  }
  const onImageClick = () => {
    inputFile.current.click();
  };
  const opencreate = () => {
    document.getElementById("creatememe").style.display = "flex"
  }
  const changeHandler = (event) =>{
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img))
  }
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />    
         
          <meta name="description" content = "Connect with friends and family with the power of Memes. Share memes, grow your status and become the meme lord!"/>
          <meta name="keywords" content = "connect, friends, family, share, memes"/>
  </Helmet>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
       
        <div className="profileEva">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic" alt="profilepic"></img>
          <div className="evaBox">
            <textArea  label="" id="tweetTxtArea" name="tweetTxtArea" value={inputStr} onChange={(e) => setMessage(e.target.value)} placeholder="Start a message!" type="text" width="100%" style={{backgroundColor: "transparent", fontSize: 20, fontFamily: "Arial, Helvetica, sans-serif", resize: "none", color:"white", border: "none",outline: "none", paddingLeft:"20px"}}></textArea>
              {selectedFile && (
                <img src={selectedFile} className="evaImg"></img>
              )}
            <div className="imgOrEva">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                  type="file"
                  name = "file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{display:"none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div><div>
    </div>
   
              <div className="evaOptions">
                  <div className="eva" onClick={saveMessage}>Send</div>
                  <div className="eva" onClick={opencreate}>Create</div>
                  <div className="eva" onClick={maticSend} style={{backgroundColor:"#8247e5"}}><Icon fill="#ffffff" size={20} svg="matic"></Icon></div>
                  
              </div>
            </div>
          </div>
        </div>
        
        
        <MessageInFeed profile={false} other={false}  accountother=""/>
      </div>
    </>
  );
};
export default Home;
