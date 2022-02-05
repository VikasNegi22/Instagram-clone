import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import Button from '@mui/material/Button';
import { storage, db } from '../../firebase';
import './imageUpload.css';

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const UploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log('UploadTask', UploadTask)
        UploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div className='imageupload'>
            <h2>Create Post</h2>
            <progress className='imageupload_progress' value={progress} max="100" />
            <input className='imageupload_caption' type="text" placeholder='Enter a caption...' onChange={(event) => setCaption(event.target.value)} value={caption} />
            <input  type="file" onChange={handleChange} />
            <button onClick={handleUpload} >
                Upload
            </button>
        </div>
    )
}

export default ImageUpload;
