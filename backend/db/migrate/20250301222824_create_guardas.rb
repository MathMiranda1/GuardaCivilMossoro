class CreateGuardas < ActiveRecord::Migration[8.0]
  def change
    create_table :guardas do |t|
      t.string :nome_completo
      t.string :matricula
      t.string :numeracao_porte
      t.string :equipe

      t.timestamps
    end
  end
end
