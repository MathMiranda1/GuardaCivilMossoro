class Equipe < ApplicationRecord
  has_many :guardas

  validates :nome, presence: true, uniqueness: true
end
