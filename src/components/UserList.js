import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UsersForm from './UsersForm';

const UserList = () => {

    const [users, setUsers] = useState([])
    const [selectUser, setSelectUser] = useState(null)

    useEffect(() => {

        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    }, []);

    const getUsers = () => {
        axios.get('https://users-crud1.herokuapp.com/users/')
            .then(res => setUsers(res.data));
    }

    const userSelected = user => setSelectUser(user)
    const userDeselected = () => setSelectUser(null)
    const del = user => {
        axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
            .then(() => getUsers())
    }

    const [showUserForm, setShowUserForm] = useState(false);

    const showForm = () => setShowUserForm(true);

    return (
        <div>
            <nav className="nav">
                <h1>Usuarios</h1>
                <button onClick={() => showForm()} className="btn btn-primary btn-form">+ Crear nuevo usuario</button>
            </nav>
            {showUserForm && <UsersForm getUsers={getUsers} selectUser={selectUser} userDeselected={userDeselected} showForm={showForm} close={() => setShowUserForm(false)} />}
            <div className='Container'>
                {
                    users?.map(user => (
                        <div key={user.id} className="Card">
                            <h1>{user.first_name} {user?.last_name}</h1>
                            <span>EMAIL</span>
                            <p>{user.email}</p>
                            <span>BIRTHDAY</span>
                            <p><i className="fa-solid fa-gift"></i> {user.birthday}</p>
                            <div className="Btns">
                                <button onClick={() => del(user)} className='btn-delete'><i className="fa-regular fa-trash-can"></i></button>
                                <button onClick={() => { userSelected(user); showForm() }} className='btn-edit'><i className="fa-regular fa-pen-to-square"></i></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserList;