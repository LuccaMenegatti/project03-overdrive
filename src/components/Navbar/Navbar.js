import Logo from '../../img/logo.png';

//dependencias
import { Link } from 'react-router-dom';

//css
import {Cabecalho, Title, LogoOverdrive, Ul, Li } from'./Style';

const Navbar = () => {
  return (
    <Cabecalho >

          <Title>
            <Link to="/">
              <LogoOverdrive class="logo" src={Logo} alt="Logo Overdrive" />
            </Link>
          </Title>

          <Ul>

            <Li>
              <Link to="/people">Pessoas</Link>
            </Li>

            <Li>
              <Link to="/company">Empresas</Link>
            </Li>

          </Ul>

    </Cabecalho>
  );
};

export default Navbar;