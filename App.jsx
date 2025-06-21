import { useEffect, useState } from 'react';


function App() {
  
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/posts.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  // Filter by title, description , or author name
  const filteredPosts = posts.filter((post) => {
    const searchText = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchText) ||
      post.body.toLowerCase().includes(searchText) ||
      post.author.name.toLowerCase().includes(searchText)
    );
  });

  return (
    <div >
      {/* Header with Search */}
      <header >
        <h1>Blog Posts Application</h1>
        <input
          type="text"
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
        />
      </header>

      {/* Post Cards */}
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          
        >
          <h2>Title:{post.title}</h2>
          <h3>Description:</h3><p>{post.body}</p>

          <div >
            {post.tags.map((tag, index) => (
              <span
                key={index}
              >
                Tags:
                #{tag}
              </span>
            ))}
          </div>

          <a href={`mailto:${post.author.email}`} target="_blank" rel="noopener noreferrer">
            <strong>Author:</strong> {post.author.name}
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
