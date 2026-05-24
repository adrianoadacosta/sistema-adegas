function ClienteList({
  clientes = [],
  arquitetos = [],
  relacoes = [],
  onDelete,
  onEdit
}) {
  return (
    <ul className="cliente-list">
      {clientes.map((cliente) => {

        const arquitetosCliente = relacoes
          .filter(
            (relacao) => relacao.cliente_id === cliente.id
          )
          .map((relacao) =>
            arquitetos.find(
              (arquiteto) =>
                arquiteto.id === relacao.arquiteto_id
            )
          )
          .filter(Boolean)

        return (
          <li className="cliente-card" key={cliente.id}>
            <div className="cliente-info">
              <strong>{cliente.nome}</strong>
              <br />

              {cliente.telefone}
              <br />

              {cliente.email}

              <p>
                <strong>Arquitetos:</strong>{' '}
                {arquitetosCliente
                  .map((a) => a.nome)
                  .join(', ')}
              </p>
            </div>

            <div className="cliente-actions">
              <button
                className="btn-edit"
                onClick={() => onEdit(cliente)}
              >
                Editar
              </button>

              <button
                className="btn-danger"
                onClick={() => onDelete(cliente.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ClienteList