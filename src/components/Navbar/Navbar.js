import Logo from '../../img/logo.png';

//dependencias
import { Link } from 'react-router-dom';

//css
import {Cabecalho, LogoOverdrive} from'./Style';

const Navbar = () => {
  return (
    <Cabecalho >
        
        <Link to="/">
            <LogoOverdrive class="logo" src={Logo} alt="Logo Overdrive" />
        </Link>

        <Link to="/people">People</Link>

        <Link to="/company">Companies</Link>
    </Cabecalho>
  );
};

export default Navbar;