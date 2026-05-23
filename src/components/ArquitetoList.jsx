function ArquitetoList({ arquitetos, onDelete, onEdit }) {
  return (
    <div>
      {arquitetos.map((arquiteto) => (
        <div className="cliente-card" key={arquiteto.id}>
          <div>
            <strong>{arquiteto.nome}</strong><br />
            {arquiteto.telefone}<br />
            {arquiteto.email}
          </div>

          <div>
            <button
              className="btn-edit"
              onClick={() => onEdit(arquiteto)}
            >
              Editar
            </button>

            <button
              className="btn-danger"
              onClick={() => onDelete(arquiteto.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArquitetoList