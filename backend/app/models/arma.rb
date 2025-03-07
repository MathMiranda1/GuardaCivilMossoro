class Arma < ApplicationRecord
    validates :modelo, presence: true
    validates :registro, presence: true, uniqueness: true
  end
  