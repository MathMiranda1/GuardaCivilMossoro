class UnidadesController < ApplicationController
    before_action :set_unidade, only: [:show, :update, :destroy]
  
    # GET /unidades
    def index
      unidades = Unidade.all
      render json: unidades
    end
  
    # GET /unidades/:id
    def show
      render json: @unidade
    end
  
    # POST /unidades
    def create
      unidade = Unidade.new(unidade_params)
      if unidade.save
        render json: unidade, status: :created
      else
        render json: { errors: unidade.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # PUT /unidades/:id
    def update
      if @unidade.update(unidade_params)
        render json: @unidade
      else
        render json: { errors: @unidade.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /unidades/:id
    def destroy
      @unidade.destroy
      head :no_content
    end
  
    private
  
    def set_unidade
      @unidade = Unidade.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Unidade não encontrada" }, status: :not_found
    end
  
    def unidade_params
      params.require(:unidade).permit(:nome)
    end
  end
  