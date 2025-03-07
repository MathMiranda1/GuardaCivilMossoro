class AddEquipeRefToGuardas < ActiveRecord::Migration[8.0]
  def change
    add_reference :guardas, :equipe, null: false, foreign_key: true
  end
end
