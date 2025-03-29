import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [existingUser, setExistingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (savedUser) {

      setExistingUser(savedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (existingUser && existingUser.email !== email) {

      alert(`Another user (${existingUser.email}) is already logged in. Please log out first.`);
      return;
    }

    const user = { email, password };
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setExistingUser(user);
    navigate('/manager');
  };

  const handleLogout = () => {

    localStorage.removeItem('loggedInUser');
    setExistingUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {existingUser ? (
          <div className="text-center">

            <h2 className="text-2xl font-bold">Already Logged In</h2>
            <p className="mt-2 text-gray-600">User: {existingUser.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 px-4 text-white bg-red-500 hover:bg-red-400 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}

                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  required

                  value={password}

                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <button
                type="submit"

                className="w-full py-3 px-4 text-white bg-green-400 hover:bg-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
