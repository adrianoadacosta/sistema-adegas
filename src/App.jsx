import './App.css'
import Home from './components/Home'

import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import ClienteForm from './components/ClienteForm'
import ClienteList from './components/ClienteList'

function App() {
  const [clientes, setClientes] = useState([])
  const [clienteEditando, setClienteEditando] = useState(null)
  const [pagina, setPagina] = useState('home')

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

  useEffect(() => {
    buscarClientes()
  }, [])

  // 🔹 Salvar (create + update)
  async function salvarCliente(dados) {
    if (clienteEditando) {
      const { error } = await supabase
        .from('clientes')
        .update(dados)
        .eq('id', clienteEditando.id)

      if (error) {
        alert('Erro ao atualizar')
      } else {
        alert('Cliente atualizado!')
        setClienteEditando(null)
      }
    } else {
      const { error } = await supabase
        .from('clientes')
        .insert([dados])

      if (error) {
        alert('Erro ao salvar')
      } else {
        alert('Cliente salvo!')
      }
    }

    buscarClientes()
  }

  // 🔹 Deletar
  async function deletarCliente(id) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao deletar')
    } else {
      buscarClientes()
    }
  }

  // 🔹 Editar
  function editarCliente(cliente) {
    setClienteEditando(cliente)
  }

 return (
  <div className="container">
    {pagina === 'home' && (
      <Home irPara={setPagina} />
    )}

    {pagina === 'clientes' && (
      <>
        <button onClick={() => setPagina('home')}>
          ← Voltar
        </button>

        <h1>Clientes</h1>

        <ClienteForm
          onSalvar={salvarCliente}
          clienteEditando={clienteEditando}
        />

        <h2>Clientes cadastrados:</h2>

        <ClienteList
          clientes={clientes}
          onDelete={deletarCliente}
          onEdit={editarCliente}
        />
      </>
    )}

    {pagina === 'arquitetos' && (
      <>
        <button onClick={() => setPagina('home')}>
          ← Voltar
        </button>
        <h1>Arquitetos (em breve)</h1>
      </>
    )}

    {pagina === 'orcamentos' && (
      <>
        <button onClick={() => setPagina('home')}>
          ← Voltar
        </button>
        <h1>Orçamentos (em breve)</h1>
      </>
    )}
  </div>
  )
}

export default App
