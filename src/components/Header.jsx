import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Context, server } from '../main';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } =
    useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success('Logged out successfully.');
      setIsAuthenticated(false);
      setUser({});
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        {isAuthenticated ? <Link to={'/profile'}>Profile</Link> : ''}

        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
