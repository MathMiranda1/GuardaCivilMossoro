class Movimentacao < ApplicationRecord
  self.table_name = "movimentacoes"  # Força o Rails a usar o nome correto da tabela

  belongs_to :arma
  belongs_to :guarda

  validates :armeiro, :matricula_armeiro, :data, :hora, :tipo, presence: true
  validates :tipo, inclusion: { in: %w(emprestimo devolucao), message: "deve ser 'emprestimo' ou 'devolucao'" }
  validates :quantidade_balas, :quantidade_carregadores,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 },
            allow_nil: true

  # Validações customizadas
  validate :validate_movimentacao
  validate :validate_armeiro_consistency

  after_create :update_arma_status

  private

  def validate_movimentacao
    if tipo == 'emprestimo'
      if arma.emprestada
        errors.add(:arma, "já está emprestada")
      end
    elsif tipo == 'devolucao'
      unless arma.emprestada
        errors.add(:arma, "não está emprestada, então não pode ser devolvida")
      end

      last_emprestimo = Movimentacao.where(arma_id: arma_id, tipo: 'emprestimo').order(created_at: :desc).first
      if last_emprestimo && last_emprestimo.guarda_id != guarda_id
        errors.add(:guarda, "não é o responsável pelo empréstimo desta arma")
      end

      # Exige justificativa somente se houver discrepância
      if last_emprestimo
        discrepancia_balas = last_emprestimo.quantidade_balas.to_i > quantidade_balas.to_i
        discrepancia_carregadores = last_emprestimo.quantidade_carregadores.to_i > quantidade_carregadores.to_i

        if (discrepancia_balas || discrepancia_carregadores) && justificativa.blank?
          errors.add(:justificativa, "é necessária se houver discrepância nas quantidades")
        end
      end
    end
  end

  def validate_armeiro_consistency
    if armeiro.present? && matricula_armeiro.present?
      existing = Movimentacao.where(armeiro: armeiro).where.not(id: id).first
      if existing && existing.matricula_armeiro != matricula_armeiro
        errors.add(:matricula_armeiro, "não corresponde ao armeiro informado")
      end
    end
  end

  def update_arma_status
    if tipo == 'emprestimo'
      arma.update(emprestada: true)
    elsif tipo == 'devolucao'
      arma.update(emprestada: false)
    end
  end
end
