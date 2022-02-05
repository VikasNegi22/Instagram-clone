import React, { useEffect, useState } from "react";
import "./Post.css";
import firebase from "firebase/compat/app";
import { Avatar } from "@mui/material";
import { db } from "../../firebase";

function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="username"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img src={imageUrl} alt="" className="post_image" />
      <div className="post_text">
        <p>
          <strong className="post_textUsername">{username}</strong>
          {caption}
        </p>
        {/* <strong>{username}</strong>
                <h4>{caption}</h4> */}
      </div>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong className="post_commentsUsername">{comment.username}</strong>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
