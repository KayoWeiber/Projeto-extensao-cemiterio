export type Falecido = {
  id: string
  nome: string
  nascimento: string
  falecimento: string
  sepultamento: string
  setor: 'A' | 'B' | 'C' | 'D'
  quadra: string
  rua: string
  jazigo: string
  gaveta: string
  status: string
}

export const falecidos: Falecido[] = [
  {
    id: 'maria-aparecida-da-silva',
    nome: 'Maria Aparecida da Silva',
    nascimento: '12 fev 1948',
    falecimento: '03 mar 2023',
    sepultamento: '04 mar 2023',
    setor: 'A',
    quadra: '03',
    rua: 'Rua dos Ipês',
    jazigo: '128',
    gaveta: '02',
    status: 'Sepultado',
  },
  {
    id: 'joao-batista-oliveira',
    nome: 'João Batista Oliveira',
    nascimento: '21 jun 1939',
    falecimento: '18 set 2022',
    sepultamento: '19 set 2022',
    setor: 'B',
    quadra: '07',
    rua: 'Alameda Central',
    jazigo: '214',
    gaveta: '01',
    status: 'Sepultado',
  },
  {
    id: 'antonio-carlos-pereira',
    nome: 'Antônio Carlos Pereira',
    nascimento: '04 abr 1956',
    falecimento: '11 jan 2024',
    sepultamento: '12 jan 2024',
    setor: 'C',
    quadra: '02',
    rua: 'Rua das Palmeiras',
    jazigo: '076',
    gaveta: '03',
    status: 'Sepultado',
  },
  {
    id: 'helena-souza-pereira',
    nome: 'Helena Souza Pereira',
    nascimento: '29 out 1942',
    falecimento: '07 ago 2021',
    sepultamento: '08 ago 2021',
    setor: 'A',
    quadra: '08',
    rua: 'Rua São Miguel',
    jazigo: '189',
    gaveta: '01',
    status: 'Sepultado',
  },
  {
    id: 'francisco-das-chagas-pereira',
    nome: 'Francisco das Chagas Pereira',
    nascimento: '17 dez 1934',
    falecimento: '25 mai 2020',
    sepultamento: '26 mai 2020',
    setor: 'D',
    quadra: '05',
    rua: 'Rua da Paz',
    jazigo: '341',
    gaveta: '04',
    status: 'Sepultado',
  },
  {
    id: 'luiza-mendes-cavalcanti',
    nome: 'Luiza Mendes Cavalcanti',
    nascimento: '08 jul 1963',
    falecimento: '14 nov 2023',
    sepultamento: '15 nov 2023',
    setor: 'B',
    quadra: '01',
    rua: 'Rua Santa Clara',
    jazigo: '052',
    gaveta: '02',
    status: 'Sepultado',
  },
]

export const buscasRecentes = [
  falecidos[0],
  falecidos[3],
  falecidos[5],
  falecidos[2],
]

export function normalizarTexto(valor: string) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function buscarFalecidos(query: string) {
  const termo = normalizarTexto(query)

  if (!termo) {
    return []
  }

  return falecidos.filter((falecido) =>
    normalizarTexto(falecido.nome).includes(termo),
  )
}

export function encontrarFalecido(id: string) {
  return falecidos.find((falecido) => falecido.id === id)
}
