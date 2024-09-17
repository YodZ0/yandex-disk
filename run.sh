#!/bin/bash

# Функция для завершения процессов при прерывании скрипта
cleanup() {
  echo "Stopping the backend and frontend..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Слушаем сигнал прерывания (Ctrl+C)
trap cleanup INT

# Запуск бэкенда
echo "Setting up and starting the backend..."
cd backend

# Создание виртуального окружения, если оно не существует
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python -m venv venv
fi

# Активируем виртуальное окружение
source venv/bin/activate

# Установка зависимостей
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Запуск бэкенд-сервера
echo "Starting the backend..."
uvicorn src.main:main_app --reload &
BACKEND_PID=$! # Запоминаем PID процесса бэкенда

# Запуск фронтенда
echo "Starting the frontend..."
cd ../frontend
# Убедитесь, что зависимости установлены
npm install
# Запуск фронтенд-сервера
npm start &
FRONTEND_PID=$! # Запоминаем PID процесса фронтенда

# Ожидание завершения процессов
wait $BACKEND_PID
wait $FRONTEND_PID
