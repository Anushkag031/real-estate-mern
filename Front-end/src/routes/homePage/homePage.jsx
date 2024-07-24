import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser}=useContext(AuthContext);
  console.log("currentUser",currentUser);

  //if(!currentUser) return <div>loading...</div>
    
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Where Dreams Come Home🏡</h1>
          <p>
          <li>Welcome to urbanNest, where we bring you the best of urban living. </li>
          <li>Explore our curated listings and find the perfect home that matches your lifestyle and dreams.</li> 
          <li>Whether you are looking for a chic apartment, a cozy loft, or a spacious family home, urbanNest is your trusted partner in finding the ideal nest in the city.</li>


          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
