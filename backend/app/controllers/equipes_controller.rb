class EquipesController < ApplicationController
    before_action :set_equipe, only: [:show, :update, :destroy]
  
    # GET /equipes
    def index
      equipes = Equipe.all
      render json: equipes
    end
  
    # GET /equipes/:id
    def show
      render json: @equipe
    end
  
    # POST /equipes
    def create
      equipe = Equipe.new(equipe_params)
      if equipe.save
        render json: equipe, status: :created
      else
        render json: { errors: equipe.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # PUT/PATCH /equipes/:id
    def update
      if @equipe.update(equipe_params)
        render json: @equipe
      else
        render json: { errors: @equipe.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /equipes/:id
    def destroy
      @equipe.destroy
      head :no_content
    end
  
    private
  
    def set_equipe
      @equipe = Equipe.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Equipe não encontrada" }, status: :not_found
    end
  
    def equipe_params
      params.require(:equipe).permit(:nome)
    end
  end
  