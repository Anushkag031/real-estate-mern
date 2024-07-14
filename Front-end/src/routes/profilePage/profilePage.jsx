import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";

function ProfilePage() {

  const naviagte=useNavigate()

  const handleLogout = async()=> {
    try {
      const res = apiRequest.post("/auth/logout");
      
      localStorage.removeItem("user");
      naviagte("/");
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="avatarImg.avif"
                alt=""
              />
            </span>
            <span>
              Username: <b>Anushka</b>
            </span>
            <span>
              E-mail: <b>anushka@gmail.com</b>
            </span>
            <button
            onClick={handleLogout}
            >Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
