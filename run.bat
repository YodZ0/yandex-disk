@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION

:: =========================== BACKEND APP PART START ===========================
ECHO === STARTING BACKEND APP ===
CD backend

:: Check if venv exists and activate it
IF EXIST "venv/Scripts/activate" (
  ECHO Activating virtual environment...
  CALL venv/Scripts/activate
) ELSE (
  ECHO Venv not found. Creating new one...
  python -m venv venv
  ECHO Venv has been created!
  ECHO Activating virtual environment...
  CALL venv/Scripts/activate
  ECHO Virtual environment activated!
)

:: Checking if virtual environment is active
IF NOT DEFINED VIRTUAL_ENV (
  ECHO Virtual environment is NOT active!
  EXIT /B 1
) ELSE (
  :: Install req.txt
  IF EXIST "req.txt" (
    ECHO Installing requirements...
    pip install -r req.txt
  ) ELSE (
    ECHO File req.txt not found
    EXIT /B 1
  )
)

:: Set PYTHONPATH to current directory
SET PYTHONPATH=%CD%

:: Starting backend app
ECHO Starting backend app...
START "" /B python src/main.py
IF ERRORLEVEL 1 (
  ECHO Failed to start the backend application. Exiting...
  EXIT /B 1
)

:: Проверка, что сервер backend запущен
:CHECK_BACKEND
ECHO Checking if backend is up...
curl -s http://127.0.0.1:8000 > NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO Backend is not up yet. Retrying...
    TIMEOUT /T 5 > NUL
    GOTO CHECK_BACKEND
)
ECHO Backend is up and running!
:: =========================== BACKEND APP PART END ===========================

:: =========================== FRONTEND APP PART START ===========================
ECHO === STARTING FRONTEND APP ===
CD ../frontend

:: Check for Node.js
ECHO Checking if NODE.JS installed...
WHERE node >NUL 2>NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO Node.js is not installed. Please install Node.js from https://nodejs.org/.
    EXIT /B 1
) ELSE (
    ECHO Success!
)

:: Check for npm
ECHO Checking if NPM installed...
WHERE npm >NUL 2>NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO npm is not installed. Please install npm from https://nodejs.org/.
    EXIT /B 1
) ELSE (
    ECHO Success!
)

:: Check package.json
IF EXIST "package.json" (
  ECHO Installing frontend dependencies...
  START "" /B npm install
  IF %ERRORLEVEL% NEQ 0 (
    ECHO Failed to install frontend dependencies. Exiting...
    EXIT /B 1
  )
  ECHO Frontend dependencies installed successfully!
) ELSE (
  ECHO package.json not found. Exiting...
  EXIT /B 1
)

:: Starting frontend app
ECHO Starting frontend app...
START "" /B npm run dev
IF ERRORLEVEL 1 (
  ECHO Failed to start the frontend application. Exiting...
  EXIT /B 1
)
:: =========================== FRONTEND APP PART END ===========================

:: Цикл ожидания и проверки флага
:WAIT
TIMEOUT /T 10 > NUL
IF EXIST "%~dp0stop.flag" (
    ECHO Stopping the backend and frontend...
    TASKKILL /IM python.exe /F
    TASKKILL /IM node.exe /F
    DEL "%~dp0stop.flag"
    EXIT /B 0
)
GOTO WAIT
