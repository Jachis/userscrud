import axios from 'axios';
import React from 'react';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const UsersForm = ({ getUsers, selectUser, userDeselected, close }) => {

    const { register, handleSubmit, reset } = useForm();
    const defaultValues = { first_name: "", last_name: "", email: "", password: "", birthday: "" }
    const submit = (data) => {
        reset(defaultValues)
        if (selectUser !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${selectUser.id}/`, data)
                .then(() => {
                    getUsers();
                    userDeselected();
                    close()
                })
                .catch(error => console.log(error.response));
        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(() => {getUsers(); close()})
                .catch(error => console.log(error.respose));
        }

    }

    useEffect(() => {
        if (selectUser !== null) {
            reset({
                first_name: selectUser.first_name,
                last_name: selectUser.last_name,
                email: selectUser.email,
                password: selectUser.password,
                birthday: selectUser.birthday
            })
        }
    }, [selectUser, reset]);

    return (
            <div className='Overlay'>
                <div className='Modal'>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="fristName" {...register("first_name")} />
                            <div id="firstnameHelp" className="form-text">Escribe tu nombre/s</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="lastName" {...register("last_name")} />
                            <div id="lastNameHelp" className="form-text">Escribe tu primer apellido</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" {...register("email")} />
                            <div id="emailHelp" className="form-text">Escribe tu direccion de correo electronico</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="Password" {...register("password")} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthDate" className="form-label">Fecha de nacimiento</label>
                            <input type="date" className="form-control" id="birthDate" {...register("birthday")} />
                            <div id="birthDateHelp" className="form-text">DD MM AAAA</div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-form m-1">Enviar</button>
                        <button onClick={() => { reset(defaultValues); userDeselected(); close() }} className="btn btn-primary btn-form m-1">Cancelar</button>
                    </form>
                </div>
            </div>
    );
};

export default UsersForm;