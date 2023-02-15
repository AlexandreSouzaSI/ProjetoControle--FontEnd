import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/Main'
import ContasReceberPage from './pages/Main/contasReceber'
import ContasPagarPage from './pages/Main/contasPagar'
import GruposPage from './pages/Main/grupos'
import SubGrupoPage from './pages/Main/subGrupo'
import Dre from './pages/Main/dre/index';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<ContasReceberPage />}/>
        <Route path='pagar' element={<ContasPagarPage />}/>
        <Route path='grupos' element={<GruposPage />}/>
        <Route path='subgrupos' element={<SubGrupoPage />}/>
        <Route path='dre' element={<Dre />}/>
      </Route>
    </Routes>
  )
}
