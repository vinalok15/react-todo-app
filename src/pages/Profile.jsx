import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Context, server } from '../main';

const Profile = () => {
  const { isAuthenticated, loading, user, setLoading, setUser } =
    useContext(Context);

  if (!isAuthenticated) return <Navigate to={'/login'} />;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};
export default Profile;
