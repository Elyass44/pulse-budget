# Pulse Budget Frontend - Makefile

.PHONY: help bash logs npm dev build

# Default target
help: ## Show available commands
	@echo "Frontend commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

bash: ## Enter frontend container shell
	docker compose exec frontend sh

logs: ## Show frontend logs
	docker compose logs -f frontend

npm: ## Run npm install
	docker compose exec frontend npm install

dev: ## Start development server
	docker compose exec frontend npm run dev

build: ## Build for production
	docker compose exec frontend npm run build

lint: ## Run ESLint = code checker
	docker compose exec frontend npm run lint
