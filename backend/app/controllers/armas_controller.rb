class ArmasController < ApplicationController
    before_action :set_arma, only: [:show, :update, :destroy]
  
    # GET /armas
    def index
      armas = Arma.all
      render json: armas
    end
  
    # GET /armas/:id
    def show
      render json: @arma
    end
  
    # POST /armas
    def create
      arma = Arma.new(arma_params)
      if arma.save
        render json: arma, status: :created
      else
        render json: { errors: arma.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # PUT/PATCH /armas/:id
    def update
      if @arma.update(arma_params)
        render json: @arma
      else
        render json: { errors: @arma.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /armas/:id
    def destroy
      @arma.destroy
      head :no_content
    end
  
    private
  
    def set_arma
      @arma = Arma.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Arma não encontrada" }, status: :not_found
    end
  
    def arma_params
      params.require(:arma).permit(:modelo, :registro, :emprestada)
    end
  end
  