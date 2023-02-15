import { useState } from 'react'

import { Container } from './styles'

import Receber from '../../assets/receber.png'
import Pagar from '../../assets/pagar.png'
import Grupo from '../../assets/grupo.png'
import Subgrupo from '../../assets/subgrupo.png'
import dre from '../../assets/dre1.png'

import menuImg from '../../assets/menu.svg'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <Container isMenuOpen={menuOpen}>
      <button type='button' onClick={handleToggleMenu}>
        <img src={menuImg} alt='Abrir e fechar o menu' />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to='/' >
              <img src={Receber} alt="" />
              <span>Contas a Receber</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='pagar'>
              <img src={Pagar} alt="" />
              <span>Contas a Pagar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='grupos'>
              <img src={Grupo} alt="" />
              <span>Grupo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='subgrupos'>
              <img src={Subgrupo} alt="" />
              <span>Subgrupo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='dre'>
              <img src={dre} alt="" />
              <span>DRE</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
