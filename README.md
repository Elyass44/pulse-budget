# Pulse Budget

A personal budgeting web application built with Vue.js and Symfony for learning and practical financial management.

## 📁 Project Structure

```
pulse-budget/
├── backend/               # Symfony 7 API
│   ├── src/
│   ├── ...
├── frontend/              # Vue 3 SPA
│   ├── src/
│   ├── ...
├── docker-compose.yml     # Development environment
└── README.md              # This file
```

## Technology Stack

### Backend
- **Symfony 7**
- **PHP 8.2+**
- **PostgreSQL**
- **JWT** - Authentication tokens
- **Docker**

### Frontend
- **Vue 3**
- **TypeScript**
- **Pinia** - State management
- **Webpack Encore**
- **Tailwind CSS** - Utility-first CSS

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Git

### Installation
```bash
# Clone the repository
git clone git@github.com:Elyass44/pulse-budget.git
cd pulse-budget

# Start development environment
docker-compose up -d

# Backend setup (Symfony)
cd backend
make bash
composer install
php bin/console doctrine:migrations:migrate
exit

# Frontend setup (Vue)
cd ../frontend
make bash
yarn install
yarn run dev
exit
```

### Development URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432

## License

This project is for personal learning and use.

## Contributing

This is a solo learning project focused on Vue.js development. Feedback and suggestions are welcome through issues.
