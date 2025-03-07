require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Atualizações e recarregamento imediato
  config.enable_reloading = true
  config.eager_load = false

  # Exibe relatórios completos de erro
  config.consider_all_requests_local = true

  # Habilita server timing
  config.server_timing = true

  # Configura cache (mantém como está ou ajuste conforme necessário)
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.public_file_server.headers = { "cache-control" => "public, max-age=#{2.days.to_i}" }
  else
    config.action_controller.perform_caching = false
  end
  config.cache_store = :memory_store

  # Armazenamento local para uploads
  config.active_storage.service = :local

  # Configuração do ActionMailer para envio real de e-mail com SMTP

  # Levanta erros se o mailer não conseguir enviar o e-mail (útil para debug)
  config.action_mailer.raise_delivery_errors = true

  # Define o método de entrega como SMTP
  config.action_mailer.delivery_method = :smtp

  # Configurações SMTP usando variáveis de ambiente (definidas no .env)
  config.action_mailer.smtp_settings = {
    address:              ENV['SMTP_ADDRESS'] || 'smtp.gmail.com',
    port:                 ENV['SMTP_PORT'] || 587,
    domain:               ENV['SMTP_DOMAIN'] || 'gmail.com',
    user_name:            ENV['SMTP_USERNAME'],
    password:             ENV['SMTP_PASSWORD'],
    authentication:       'plain',
    enable_starttls_auto: true
  }

  # URL padrão para links gerados nos e-mails
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  # Configurações adicionais do Rails (logs, depreciações, etc.)
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
  config.active_record.query_log_tags_enabled = true
  config.active_job.verbose_enqueue_logs = true
  config.action_view.annotate_rendered_view_with_filenames = true
  config.action_controller.raise_on_missing_callback_actions = true
end

