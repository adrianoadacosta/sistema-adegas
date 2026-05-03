import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [nome, setNome] = useState('')
  const [clientes, setClientes] = useState([])
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')

  // 🔹 Buscar clientes
  async function buscarClientes() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setClientes(data)
    }
  }

  // 🔹 Executa ao abrir a página
  useEffect(() => {
    buscarClientes()
  }, [])

  // 🔹 Salvar cliente
  async function salvarCliente() {
    const { error } = await supabase
      .from('clientes')
      .insert([{ nome, telefone, email }])

    if (error) {
      alert('Erro ao salvar')
    } else {
      alert('Cliente salvo!')
      setNome('')
      setTelefone('')
      setEmail('')
      buscarClientes() // atualiza lista
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

      <button onClick={salvarCliente}>
        Salvar
      </button>

      <h2>Clientes cadastrados:</h2>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.telefone} - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App