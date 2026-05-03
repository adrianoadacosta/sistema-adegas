function ClienteList({ clientes, onDelete, onEdit }) {
  return (
    <ul className="cliente-list">
      {clientes.map((cliente) => (
        <li className="cliente-card" key={cliente.id}>
          <div className="cliente-info">
            <strong>{cliente.nome}</strong><br />
            {cliente.telefone}<br />
            {cliente.email}
          </div>

          <div className="cliente-actions">
            <button className="btn-edit" onClick={() => onEdit(cliente)}>
              Editar
            </button>

            <button className="btn-danger" onClick={() => onDelete(cliente.id)}>
              Deletar
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ClienteList