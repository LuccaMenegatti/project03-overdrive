import { useState } from "react";

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import {
    HomeDiv,
    Content,
    Info,
    Buttons,
    ButtonLink,
    Lista,
} from "./style";

function Home() {

    const [frontendDialog, setFrontendDialog] = useState(false);

    const showDialog = () => {
        setFrontendDialog(true);
    };

    const hideDialog = () => {
        setFrontendDialog(false);
    };

    const technologies = [
    {
        name: 'React',
        description: 'Uma biblioteca JavaScript para criar interfaces de usuário interativas.'
    },
    {
        name: 'JavaScript',
        description: 'Uma linguagem de programação amplamente utilizada para desenvolvimento web.'
    },
    {
        name: 'HTML',
        description: 'Linguagem de marcação que define a estrutura e o conteúdo de uma página web.'
    },
    {
        name: 'CSS',
        description: 'Linguagem de estilização que define a aparência e o layout de uma página web.'
    }
    ];


        return (
        <HomeDiv>
            <Content>
                <Info>
                    <h1>Bem-vindo ao Projeto 3</h1>
                    <p>O projeto foi desenvolvido com intuito de criar o front-end para consumir a API Csharp 
                        concluida no projeto 2, onde a API que fornece os recursos necessários para realizar 
                        as operaçoes de cadastro, edição, pesquisa e exclusão de empresas e pessoas (CRUD).
                    </p>

                    <p>O projeto foi uma experiência valiosa, pois me permitiu aprimorar minhas 
                        habilidades em desenvolvimento web, trabalhar com APIs externas e aprender
                        a lidar com dados de cadastro de pessoas e empresas de forma eficiente. 
                        Foi gratificante criar uma solução que facilita o gerenciamento e organização 
                        dessas informações de forma simples e acessível.
                    </p>
                    
                    <Button label="Exibir Tecnologias" icon="pi pi-list" onClick={showDialog} />

                </Info>
            </Content>


            <Dialog header="Tecnologias Utilizadas" visible={frontendDialog} onHide={hideDialog}>
                {technologies.map((tech, index) => (
                    <div className="technology" key={index}>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                    </div>
                ))}
            </Dialog>
            

        </HomeDiv>
        )
}
  
export default Home;