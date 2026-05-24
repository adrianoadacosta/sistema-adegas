import { useEffect, useState } from 'react'

function ClienteForm({ onSalvar,
  clienteEditando,
  arquitetos,
  arquitetoSelecionado,
  setArquitetoSelecionado }) {
  const [nome, setNome] = useState(clienteEditando?.nome || '')
  const [telefone, setTelefone] = useState(clienteEditando?.telefone || '')
  const [email, setEmail] = useState(clienteEditando?.email || '')

  useEffect(() => {
    setNome(clienteEditando?.nome || '')
    setTelefone(clienteEditando?.telefone || '')
    setEmail(clienteEditando?.email || '')
  }, [clienteEditando])

  function handleSubmit() {
    onSalvar({ nome, telefone, email })
    setNome('')
    setTelefone('')
    setEmail('')
  }

  return (
    <div className="form">
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={arquitetoSelecionado}
        onChange={(e) => setArquitetoSelecionado(e.target.value)}
      >
        <option value="">
          Selecione um arquiteto
        </option>

        {arquitetos.map((arquiteto) => (
          <option
            key={arquiteto.id}
            value={arquiteto.id}
          >
            {arquiteto.nome}
          </option>
        ))}
      </select>

      <button className="btn-primary" onClick={handleSubmit}>
        {clienteEditando ? 'Atualizar' : 'Salvar'}
      </button>
    </div>
  )
}

export default ClienteForm