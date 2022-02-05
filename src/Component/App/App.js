import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./App.css";
import instagram from "../../image/instagram.jpg";
import { db, auth } from "../../firebase";
import ImageUpload from "../ImageUpload/ImageUpload";
import Front from "../Front/Front";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      {user ? (
        <div className="App_first">
          <div className="app_header">
            <a href="/">
              <img
                src={instagram}
                alt="instagram"
                className="app_headerImage"
              />
            </a>
            <button
              className="app_headerLogButton"
              onClick={() => auth.signOut()}
            >
              LOGOUT
            </button>
          </div>
          <div className="app_posts">
            <div className="app_postLeft">
              {posts.map(({ post, id }) => {
                return (
                  <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                  />
                );
              })}
            </div>
            <div className="app_postsRight">
              <ImageUpload username={user.displayName} />
            </div>
          </div>
        </div>
      ) : (
        <div className="App_Second">
          <Front />
        </div>
      )}
    </div>
  );
}

export default App;
