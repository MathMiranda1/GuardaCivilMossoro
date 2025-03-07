class MovimentacoesController < ApplicationController
  before_action :set_movimentacao, only: [:show, :update, :destroy]

  # GET /movimentacoes
  def index
    movimentacoes = Movimentacao.all.includes(:arma, :guarda)
    render json: movimentacoes.as_json(include: [:arma, :guarda])
  end

  # GET /movimentacoes/:id
  def show
    render json: @movimentacao.as_json(include: [:arma, :guarda])
  end

  # POST /movimentacoes
  def create
    movimentacao = Movimentacao.new(movimentacao_params)
    if movimentacao.save
      render json: movimentacao, status: :created
    else
      puts movimentacao.errors.full_messages  # Debug: imprime os erros no console do Rails
      render json: { errors: movimentacao.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # PUT/PATCH /movimentacoes/:id
  def update
    if @movimentacao.update(movimentacao_params)
      render json: @movimentacao
    else
      render json: { errors: @movimentacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /movimentacoes/:id
  def destroy
    @movimentacao.destroy
    head :no_content
  end

  private

  def set_movimentacao
    @movimentacao = Movimentacao.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Movimentação não encontrada" }, status: :not_found
  end

  def movimentacao_params
    params.require(:movimentacao).permit(
      :armeiro, :matricula_armeiro, :data, :hora, :tipo,
      :arma_id, :quantidade_balas, :calibre, :quantidade_carregadores,
      :guarda_id, :porte_guarda, :matricula_guarda, :justificativa
    )
  end
end
