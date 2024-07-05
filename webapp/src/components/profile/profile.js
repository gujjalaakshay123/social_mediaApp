import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial posts from API
    fetch('/posts/get_post')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch('post/delete_post', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId: id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPosts(posts.filter(post => post.id !== id));
        } else {
          throw new Error(data.message);
        }
      })
      .catch(err => setError(err.message));
  };

  const handleAddPost = () => {
    if (newPost.trim() === '') return;

    const newPostObject = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      content: newPost
    };

    fetch('posts/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPostObject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding post');
        }
        return response.json();
      })
      .then(data => {
        setPosts([...posts, data]);
        setNewPost('');
      })
      .catch(err => setError(err.message));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <input 
          type="text" 
          value={newPost} 
          onChange={(e) => setNewPost(e.target.value)} 
          placeholder="Write a new post" 
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.content} 
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;