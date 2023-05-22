import React, {Component} from 'react';
import axios from 'axios';
import './People.css';

class People extends Component{
    state = {
        people: []
    };

    componentDidMount(){
        axios.get('https://localhost:7166/api/People/SearchPeople').then(response => {
             const people = response.data;
             this.setState({people});
        });
    };

    render() {
        return (
            <div class='conteudo'> 
                <h1>Lista de Pessoas - {this.state.people.length}</h1>
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
                        this.state.people.map(people => (
                            <tr>
                                <td>{people.name}</td>
                                <td>{people.userName}</td>
                                <td>{people.cpf}</td>
                                <td>{people.numberContact}</td>
                                <td>{people.status}</td>
                                <td>{people.idCompany}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}
export default People;