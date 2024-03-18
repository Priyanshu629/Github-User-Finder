/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setuserInfo] = useState({});

  //Fetching data
  useEffect(() => {
    handelData();
  }, []);
  const handelData = async () => {
    if (username === "") {
      return;
    } else {
      let response = await fetch("https://api.github.com/users/" + username);
      let data = await response.json();
      console.log(data);

      if (response.status === 403) {
        document.getElementById('msg').innerHTML="&quot;Something went wrong!! Try again after sometime&quot;"
        document.getElementById('msg').style.display='block'
        document.getElementById("card").style.display = "none";
      } else if (response.status === 404) {

        document.getElementById('msg').innerHTML="&quot;User not found , Please enter the right username&quot;"
        document.getElementById('msg').style.display='block'
        document.getElementById("card").style.display = "none";
      } else if (response.status === 500) {
        document.getElementById('msg').innerHTML="&quot;Internal server error&quot;"
        document.getElementById('msg').style.display='block'
        document.getElementById("card").style.display = "none";
      } else {
        setuserInfo(data);
        document.getElementById("card").style.display = "block";
        document.getElementById('msg').style.display='none'
      }
    }
  };

  // Displaying data
  return (
    <div className="container">
      <h1>Github User Finder</h1>
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter user-name"
        />
        <button onClick={handelData}>Search</button>
      </div>
      <span id="msg"></span>
      <div id="card">
        <img src={userInfo.avatar_url} alt="" id="img"/>
        <h2>{userInfo.name}</h2>
        <h3>{userInfo.login}</h3>

        <div id="location">
          <i className="fa-solid fa-location-dot"></i>
          <span>{userInfo.location}</span>
        </div>

        <p>{userInfo.bio}</p>

        <div className="info">
          <span>{userInfo.followers} followers</span>
          <span>{userInfo.following} following</span>
          <span>{userInfo.public_repos} repos</span>
        </div>
        <a href={userInfo.html_url} className="show">Show More</a>
      </div>
    </div>
  );
};

export default App;
