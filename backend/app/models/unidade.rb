class Unidade < ApplicationRecord
    validates :nome, presence: true, uniqueness: true
  end
  