import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [message, setMessage] = useState({ content: null, color: "green" });
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ content: `Wrong username or password`, color: "red" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="newBlogTitle">Title:</label>
        <input
          id="newBlogTitle"
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author:</label>
        <input
          id="newBlogAuthor"
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        <label htmlFor="newBlogUrl">URL:</label>
        <input
          id="newBlogUrl"
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );

  const handleBlogTitleChange = (event) => {
    console.log(event.target.value);
    setNewBlogTitle(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    console.log(event.target.value);
    setNewBlogAuthor(event.target.value);
  };

  const handleBlogUrlChange = (event) => {
    console.log(event.target.value);
    setNewBlogUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    try {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlogAuthor("");
        setNewBlogTitle("");
        setNewBlogUrl("");
        setMessage({
          content: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          color: "green",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } catch (error) {
      setMessage({ content: `Error creating blog: ${error}`, color: "red" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {message !== null ? (
        <Notification message={message.content} color={message.color} />
      ) : null}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>

          <h2>Create new</h2>
          {blogForm()}

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

const Notification = ({ message, color }) => {
  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default App;
