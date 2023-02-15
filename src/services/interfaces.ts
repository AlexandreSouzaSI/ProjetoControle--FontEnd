export interface POSTSubgrupos {
  nome: string,
  tipo: string,
  pix: string,
  codigo_de_barra: string,
  id_grupo: string
}

export interface POSTGrupos {
nome: string
}

export interface POSTSaida {
  data_pagamento?: string,
  data_vencimento?: string,
  multa?: string,
  juros?: string,
  desconto?: string,
  id_subgrupo?: string
  valor?: string,
}

export interface POSTEntrada {
  data?: string,
  id_subgrupo?: string
  valor?: string,
}

export interface PUTSubgrupos {
  nome?: string,
  tipo?: string,
  pix?: string,
  codigo_de_barra?: string,
  id_grupo?: string
}

export interface PUTGrupos {
nome?: string
}

export interface PUTSaida {
  data_pagamento?: string,
  data_vencimento?: string,
  multa?: string,
  juros?: string,
  desconto?: string,
  id_subgrupo?: string
  valor?: string,
}

export interface PUTEntrada {
  data?: string,
  id_subgrupo?: string
  valor?: string,
}
