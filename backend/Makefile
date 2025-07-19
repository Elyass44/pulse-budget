# Pulse Budget Backend - Makefile

.PHONY: help bash logs composer

# Default target
help: ## Show available commands
	@echo "Backend commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

bash: ## Enter backend container shell
	docker compose exec backend sh

logs: ## Show backend logs
	docker compose logs -f backend

composer: ## Run composer install
	docker compose exec backend composer install

cache-clear: ## Clear Symfony cache
	docker compose exec backend php bin/console cache:clear

migrate: ## Run database migrations
	docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
