function ClienteList({ clientes, onDelete, onEdit }) {
  return (
    <ul>
      {clientes.map((cliente) => (
        <li key={cliente.id}>
          {cliente.nome} - {cliente.telefone} - {cliente.email}

          <button onClick={() => onEdit(cliente)}>
            Editar
          </button>

          <button onClick={() => onDelete(cliente.id)}>
            Deletar
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ClienteList