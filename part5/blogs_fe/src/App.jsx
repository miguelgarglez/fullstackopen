import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [message, setMessage] = useState({ content: null, color: "green" });
  const [blogs, setBlogs] = useState([]);
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

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      const populatedBlog = await blogService.getOne(newBlog.id);
      setBlogs(blogs.concat(populatedBlog));
      console.log("populatedBlog:", populatedBlog);
      setMessage({
        content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        color: "green",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage({ content: "Error adding blog", color: "red" });
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

  const blogForm = () => {
    return <BlogForm createBlog={addBlog} />;
  };

  return (
    <div>
      <h2>blogs</h2>
      {message !== null ? (
        <Notification message={message.content} color={message.color} />
      ) : null}
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>

          <Togglable buttonLabel="new blog">{blogForm()}</Togglable>

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
