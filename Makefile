# Pulse Budget - Development Makefile

.PHONY: help up down restart build logs clean test status

# Default target
help: ## Show this help message
	@echo "Pulse Budget - Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Development workflow
start: ## Start all services
	docker compose up -d

stop: ## Stop all services
	docker compose down

restart: ## Restart all services
	docker compose down && docker compose up -d

build: ## Build and start all services
	docker compose up --build -d

rebuild: ## Force rebuild all services (no cache)
	docker compose build --no-cache && docker compose up -d

# Monitoring
logs: ## Show logs for all services
	docker compose logs -f

logs-backend: ## Show backend logs only
	docker compose logs -f backend

logs-frontend: ## Show frontend logs only
	docker compose logs -f frontend

logs-db: ## Show database logs only
	docker compose logs -f database

status: ## Show status of all containers
	docker compose ps

# Development helpers
bash-backend: ## Access backend container shell
	docker compose exec backend sh

bash-frontend: ## Access frontend container shell
	docker compose exec frontend sh

bash-db: ## Access database shell
	docker compose exec database psql -U pulse_user -d pulse_budget

# Testing
test-api: ## Test API health endpoint
	curl http://localhost:8000/api/v1/health

# Cleanup
clean: ## Stop and remove all containers, networks, and volumes
	docker compose down -v --remove-orphans

clean-images: ## Remove all project images
	docker rmi $$(docker images pulse-budget* -q) 2>/dev/null || true

fresh: ## Clean everything and rebuild from scratch
	make clean && make clean-images && make rebuild

# Database helpers
db-reset: ## Reset database (remove volume and restart)
	docker compose down -v database && docker compose up -d database

# Install dependencies
install-backend: ## Install backend dependencies
	docker compose exec backend composer install

install-frontend: ## Install frontend dependencies
	docker compose exec frontend npm install