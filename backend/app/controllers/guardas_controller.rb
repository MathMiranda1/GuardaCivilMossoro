class GuardasController < ApplicationController
    before_action :set_guarda, only: [:show, :update, :destroy]
  
    # GET /guardas
    def index
        guardas = Guarda.all.includes(:equipe)
        render json: guardas.as_json(include: :equipe)
    end
      
  
    # GET /guardas/:id
    def show
      render json: @guarda
    end
  
    # POST /guardas
    def create
      guarda = Guarda.new(guarda_params)
      if guarda.save
        render json: guarda, status: :created
      else
        render json: { errors: guarda.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # PUT/PATCH /guardas/:id
    def update
      if @guarda.update(guarda_params)
        render json: @guarda
      else
        render json: { errors: @guarda.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # DELETE /guardas/:id
    def destroy
      @guarda.destroy
      head :no_content
    end
  
    private
  
    def set_guarda
      @guarda = Guarda.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Guarda não encontrado" }, status: :not_found
    end
  
    def guarda_params
        params.require(:guarda).permit(:nome_completo, :matricula, :numeracao_porte, :equipe_id)
    end
      
  end
  