import './App.css'
import Home from './components/Home'
import ArquitetoForm from './components/ArquitetoForm'
import ArquitetoList from './components/ArquitetoList'

import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import ClienteForm from './components/ClienteForm'
import ClienteList from './components/ClienteList'

function App() {
  const [clientes, setClientes] = useState([])
  const [clienteEditando, setClienteEditando] = useState(null)
  const [pagina, setPagina] = useState('home')
  const [arquitetos, setArquitetos] = useState([])
  const [arquitetoEditando, setArquitetoEditando] = useState(null)

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

  async function buscarArquitetos() {
    const { data, error } = await supabase
      .from('arquitetos')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setArquitetos(data)
    }
  }

  useEffect(() => {
    buscarClientes()
    buscarArquitetos()
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

  async function salvarArquiteto(dados) {
    if (arquitetoEditando) {
      const { error } = await supabase
        .from('arquitetos')
        .update(dados)
        .eq('id', arquitetoEditando.id)

      if (error) {
        alert('Erro ao atualizar')
      } else {
        alert('Arquiteto atualizado!')
        setArquitetoEditando(null)
      }
    } else {
      const { error } = await supabase
        .from('arquitetos')
        .insert([dados])

      if (error) {
        alert('Erro ao salvar')
      } else {
        alert('Arquiteto salvo!')
      }
    }

    buscarArquitetos()
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

  async function deletarArquiteto(id) {
    const { error } = await supabase
      .from('arquitetos')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao deletar')
    } else {
      buscarArquitetos()
    }
  }

  // 🔹 Editar
  function editarCliente(cliente) {
    setClienteEditando(cliente)
  }

  function editarArquiteto(arquiteto) {
    setArquitetoEditando(arquiteto)
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
          <>
            <h1>Arquitetos</h1>

            <ArquitetoForm
              onSalvar={salvarArquiteto}
              arquitetoEditando={arquitetoEditando}
            />

            <h2>Arquitetos cadastrados:</h2>

            <ArquitetoList
              arquitetos={arquitetos}
              onDelete={deletarArquiteto}
              onEdit={editarArquiteto}
            />
          </>
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
