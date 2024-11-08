import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import TodoDataService from './services/todos';

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');


  async function login(user = null) {
    TodoDataService.login(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  }
  

  // const login = (user) => {
  //   setUser(user);
  // };

  const logout = () => {
    setUser(null);
  };

  const signup = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>TodoApp</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/todos">Todos</Link>
            {user ? (
              <Link className="nav-link" onClick={logout}>Logout ({user})</Link>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodosList token={token} />} />
          <Route path="/todos" element={<TodosList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />} />
          <Route path="/todos/:id" element={<AddTodo token={token} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </div>
      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright - 
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/jayrajdabhi78"
          >
            Jayraj Dabhi
          </a> - 
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/jayrajdabhi78"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
