import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  _id: string;
  caption: string;
  // Add other post fields here
}

interface UserChoice {
  _id: string;
  postId: string;
  action: 'ACCEPT' | 'REJECT';
}

const PostDisplay1: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
  const [handledPosts, setHandledPosts] = useState<string[]>([]);
  const userEmail = "user@example.com";
  
  useEffect(() => {
    // Fetch posts using Axios
    axios.get<Post[]>('http://localhost:3001/event/app/v1/allpost')
      .then((response) => {
        setPosts(response.data.reverse());
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
      
    // Fetch user choices using Axios
    axios.get<UserChoice[]>(`http://localhost:3001/event/app/v1/userchoice/${userEmail}`)
      .then((response) => {
        setUserChoices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user choices:', error);
      });
  }, []);

  // Function to handle the user's action on a post
  const handleUserAction = (postId: string, action: 'ACCEPT' | 'REJECT') => {
    // Update the local state to track the handled post
    setHandledPosts([...handledPosts, postId]);

    // Send a request to your backend to update the user's choice
    axios.post('http://localhost:3001/event/app/v1/userchoice/update', {
      postId,
      action,
    })
      .then(() => {
        console.log(`User action updated: Post ${postId}, Action ${action}`);
      })
      .catch((error) => {
        console.error('Error updating user action:', error);
      });
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.caption}</p>
          {/* Display button based on user choice */}
          {userChoices.length > 0 &&
            userChoices.map((userChoice) => (
              userChoice.postId === post._id && !handledPosts.includes(post._id) ? (
                <div key={userChoice._id}>
                  {userChoice.action === 'ACCEPT' ? (
                    <button onClick={() => handleUserAction(post._id, 'REJECT')}>
                      Reject
                    </button>
                  ) : (
                    <button onClick={() => handleUserAction(post._id, 'ACCEPT')}>
                      Accept
                    </button>
                  )}
                </div>
              ) : null
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default PostDisplay1;
