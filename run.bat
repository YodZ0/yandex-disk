@ECHO OFF

:: =========================== BACKEND APP PART START ===========================
ECHO === STARTING BACKEND APP ===
:: Go to backend dir
CD backend

:: Check if venv exist
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
python src/main.py
IF ERRORLEVEL 1 (
  ECHO Failed to start the backend application. Exiting...
  EXIT /B 1
)
:: =========================== BACKEND APP PART END ===========================

:: =========================== FRONTED APP PART START ===========================
ECHO === STARTING FRONTEND APP ===
:: Go to frontend dir
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
  npm install
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
npm run dev
IF %ERRORLEVEL% NEQ 0 (
  ECHO Failed to start the frontend application. Exiting...
  EXIT /B 1
)
:: =========================== FRONTED APP PART END ===========================

PAUSE
EXIT /B 1
