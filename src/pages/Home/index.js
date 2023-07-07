import { useState } from "react";

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import {
    HomeDiv,
    Content,
    Paragrafo,
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
        description: 'Biblioteca JavaScript para criação de interfaces de usuário (UI) modernas e reativas.'
    },
    {
        name: 'JavaScript',
        description: 'Linguagem de programação usada para desenvolvimento web, permite adicionar interatividade às páginas..'
    },
    {
        name: 'Prime-React',
        description: 'Biblioteca de componentes prontos para uso em React, oferece uma aparência moderna e responsiva.'
    },
    {
        name: 'Stitches',
        description: 'Biblioteca CSS-in-JS que simplifica a estilização de componentes React usando JavaScript.'
    },
    {
        name: 'Axios',
        description: ' Biblioteca JavaScript para fazer requisições HTTP a uma API de forma simples e flexível.'
    },
    {
        name: 'API',
        description: 'Conjunto de regras que permite a comunicação entre diferentes softwares, fornecendo métodos padronizados para enviar e receber dados.'
    },
    ];


        return (
        <HomeDiv>
            <Content>
                <div>
                    <h1>Bem-vindo ao Projeto 3</h1>
                    <Paragrafo>O projeto foi desenvolvido com intuito de criar o front-end para consumir a API Csharp 
                        concluida no projeto 2, onde a API que fornece os recursos necessários para realizar 
                        as operações de cadastro, edição, pesquisa e exclusão de empresas e pessoas (CRUD).
                    </Paragrafo>

                    <Paragrafo>Foi uma experiência valiosa, pois me permitiu aprimorar minhas 
                        habilidades em desenvolvimento web, trabalhar com APIs externas e aprender
                        a lidar com as requisições Axios de forma eficiente. 
                        Foi gratificante criar uma solução que facilita o gerenciamento e organização 
                        dessas informações e funcionalidades fornecidas pela Api.
                    </Paragrafo>
                    
                    <Button label="Exibir Tecnologias" icon="pi pi-list" onClick={showDialog} />
                </div>
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