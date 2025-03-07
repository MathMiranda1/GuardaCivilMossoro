class Guarda < ApplicationRecord
    belongs_to :equipe
  
    validates :nome_completo, presence: true
    validates :matricula, presence: true, uniqueness: true
    validates :numeracao_porte, presence: true
  end
  