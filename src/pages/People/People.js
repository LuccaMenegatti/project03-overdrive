import React, {Component, useState} from 'react';
import './People.css';
import { useAxios } from '../../hooks/useAxios';

const People = () => {

    const { data } =  useAxios("People/SearchPeople");
    
    console.log(data);

        return (
            <div class='conteudo'> 
                <h1>Lista de Pessoas - {data.length}</h1>
                <table class="table">
                    <tr>
                        <th>Nome</th>
                        <th>Nome de Usuario</th>
                        <th>Cpf</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Empresa</th>
                    </tr>
                    {
                        data.map(people => { 
                            return [
                                    <tr>
                                        <td>{people.name}</td>
                                        <td>{people.userName}</td>
                                        <td>{people.cpf}</td>
                                        <td>{people.numberContact}</td>
                                        <td>{people.status}</td>
                                        <td>{people.idCompany}</td>
                                    </tr>
                            ]
                        })
                    }
                </table>
            </div>
        )
}

export default People;