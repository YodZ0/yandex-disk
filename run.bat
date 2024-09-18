@ECHO OFF

:: Go to backend dir
CD backend

:: Check if venv exist
IF EXIST "venv/Scripts/activate" (
  ECHO Activating virtual environment...
  CALL venv/Scripts/activate
) ELSE (
  ECHO Venv not found. Creating new one...
  ::python -m venv venv
  ECHO Venv has been created!
  ECHO Activating virtual environment...
  CALL venv/Scripts/activate
  ECHO Virtual environment activated!
)

:: Checking if virtual environment is active
:: IF NOT DEFINED VIRTUAL_ENV (
IF DEFINED VIRTUAL_ENV (
  ECHO Virtual environment is NOT active!
  PAUSE
  EXIT /B 1
) ELSE (
  :: Install req.txt
  IF EXIST "req.txt" (
    ECHO Installing requirements...
  ) ELSE (
    ECHO File req.txt not found
    PAUSE
    EXIT /B 1
  )
)

:: Starting backend app
ECHO Starting backend app...
python src/main.py
IF ERRORLEVEL 1 (
  ECHO Failed to start the backend application. Exiting...
  PAUSE
  EXIT /B 1
)

PAUSE
EXIT /B 1
