class CreateMovimentacoes < ActiveRecord::Migration[8.0]
  def change
    create_table :movimentacoes do |t|
      t.string :armeiro
      t.string :matricula_armeiro
      t.date   :data
      t.string :hora
      t.string :tipo  # "emprestimo" ou "devolucao"
      t.integer :arma_id
      t.integer :quantidade_balas
      t.string :calibre
      t.integer :quantidade_carregadores
      t.integer :guarda_id
      t.string :porte_guarda
      t.string :matricula_guarda
      t.text :justificativa

      t.timestamps
    end

    add_index :movimentacoes, :arma_id
    add_index :movimentacoes, :guarda_id
  end
end