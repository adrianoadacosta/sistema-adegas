import { useEffect, useState } from 'react'

function ArquitetoForm({ onSalvar, arquitetoEditando }) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (arquitetoEditando) {
      setNome(arquitetoEditando.nome)
      setTelefone(arquitetoEditando.telefone)
      setEmail(arquitetoEditando.email)
    }
  }, [arquitetoEditando])

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

      <button className="btn-primary" onClick={handleSubmit}>
        {arquitetoEditando ? 'Atualizar' : 'Salvar'}
      </button>
    </div>
  )
}

export default ArquitetoForm