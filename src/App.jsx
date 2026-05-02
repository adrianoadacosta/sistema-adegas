import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [nome, setNome] = useState('')

  async function salvarCliente() {
    const { error } = await supabase
      .from('clientes')
      .insert([{ nome }])

    if (error) {
      console.log(error)
      alert('Erro ao salvar')
    } else {
      alert('Cliente salvo!')
      setNome('')
    }
  }

  return (
    <div>
      <h1>Sistema de Adegas</h1>

      <input
        placeholder="Nome do cliente"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button onClick={salvarCliente}>
        Salvar
      </button>
    </div>
  )
}

export default App