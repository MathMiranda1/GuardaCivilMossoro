class RemoveEquipeFromGuardas < ActiveRecord::Migration[8.0]
  def change
    remove_column :guardas, :equipe, :string
  end
end
