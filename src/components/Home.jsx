function Home({ irPara }) {
  return (
    <div>
      <h1>Sistema de Adegas</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => irPara('clientes')}>
          Clientes
        </button>

        <button onClick={() => irPara('arquitetos')}>
          Arquitetos
        </button>

        <button onClick={() => irPara('orcamentos')}>
          Orçamentos
        </button>
      </div>
    </div>
  )
}

export default Home