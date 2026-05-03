import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [nome, setNome] = useState('')
  const [clientes, setClientes] = useState([])
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [clienteEditando, setClienteEditando] = useState(null)

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
  if (clienteEditando) {
    // UPDATE
    const { error } = await supabase
      .from('clientes')
      .update({ nome, telefone, email })
      .eq('id', clienteEditando)

    if (error) {
      alert('Erro ao atualizar')
    } else {
      alert('Cliente atualizado!')
      setClienteEditando(null)
    }
  } else {
    // INSERT
    const { error } = await supabase
      .from('clientes')
      .insert([{ nome, telefone, email }])

    if (error) {
      alert('Erro ao salvar')
    } else {
      alert('Cliente salvo!')
    }
  }

  setNome('')
  setTelefone('')
  setEmail('')
  buscarClientes()
}

     // 🔹 editar cliente
    function editarCliente(cliente) {
      setNome(cliente.nome)
      setTelefone(cliente.telefone)
      setEmail(cliente.email)
      setClienteEditando(cliente.id)
    }
 
  // 🔹 deletar cliente
  async function deletarCliente(id) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
    alert('Erro ao deletar')
  } else {
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
        {clienteEditando ? 'Atualizar' : 'Salvar'}
      </button>

      <h2>Clientes cadastrados:</h2>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.telefone} - {cliente.email}
  
            <button onClick={() => deletarCliente(cliente.id)}>
              Deletar
            </button>

            <button onClick={() => editarCliente(cliente)}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App