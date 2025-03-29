import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Manager() {
  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);


  const [loggedInUser, setLoggedInUser] = useState(null);

  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', avatar: '' });
  const [editingUser, setEditingUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!savedUser) {
      navigate('/');
    } 
    else {
      setLoggedInUser(savedUser);
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data); 
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm); 
  }, [users, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(term.toLowerCase()) ||
          user.last_name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleAddUser = () => {

    if (newUser.first_name && newUser.last_name && newUser.email) {
      const userToAdd = {
        id: users.length + 1,
        ...newUser,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      };
      setUsers([userToAdd, ...users]);
      alert('User has been added successfully!');
      setNewUser({ first_name: '', last_name: '', email: '', avatar: '' });
    } else {
      alert('Please fill all the fields before adding a user.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleUpdateUser = () => {

    setUsers(users.map((user) => (user.id === editingUser.id ? { ...editingUser, ...newUser } : user)));
    alert('User has been updated successfully!');
    setEditingUser(null);
    setNewUser({ first_name: '', last_name: '', email: '', avatar: '' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    alert('User has been deleted successfully!');
  };

  return (
    <div className="p-4">
        
      <div className="flex justify-between items-center bg-green-400 p-2 rounded text-white">
        <h2 className="text-2xl font-bold">Users List</h2>
        {loggedInUser && (

          <div className="flex items-center space-x-4">
            <span>{loggedInUser.email}</span>
            <button

              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-3 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      
      <div className="mt-4 max-w-md mx-auto">
        <input
          type="text"

          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

     
      <div className="mt-4 p-4 border rounded bg-gray-100 max-w-md mx-auto">

        <h3 className="text-lg font-bold text-center mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <div className="grid grid-cols-1 gap-4">
          <input

            type="text"
            placeholder="First Name"
            value={newUser.first_name}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.last_name}

            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"

            value={newUser.email}

            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded"
          />
          <button

            onClick={editingUser ? handleUpdateUser : handleAddUser}
            className={`p-2 text-white ${editingUser ? 'bg-blue-400' : 'bg-green-500'} rounded hover:bg-opacity-90`}
          >
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 gap-4 mt-4">
        {filteredUsers.map((user) => (

          <div key={user.id} className="p-4 border rounded bg-gray-100 flex items-center gap-4">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-16 h-16 rounded-full border" />
            <div className="flex-1">

              <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <button
              onClick={() => handleEditUser(user)}
              className="bg-green-400 hover:bg-green-300 text-white font-bold py-1 px-3 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manager;
