@echo off
chcp 65001 > nul
cls
setlocal enabledelayedexpansion

:: Configurar el registro de actividades (logging)
set "logFile=%~dpn0.log"
echo ====================================== >> "%logFile%"
echo Inicio del proceso: %date% %time% >> "%logFile%"

:: Fecha y hora actuales
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set "datetime=%%I"
set "datetime=!datetime:~0,14!"

echo.
echo. ******* Realizando copia de seguridad de la información de la aplicación Control de Vencimientos. *******
echo. >> "%logFile%"

:: Directorio de trabajo
set "WORKDIR=E:\appsNode\Control\json"

:: Directorio de descargas
set "DOWNLOADDIR=E:\Users\aleso\Downloads"

:: Directorio de respaldo
set "BACKUPDIR=E:\appsNode\Control\json\backups"

set "keyword1=clientes"
set "keyword2=notasControl"
set "keyword3=seguimientos"

:: Comprobar si los directorios existen
if exist "%WORKDIR%" (
    echo El directorio de trabajo "%WORKDIR%" existe. >> "%logFile%"
) else (
    echo Error: El directorio de trabajo "%WORKDIR%" no existe. >> "%logFile%"
    pause > nul
    exit /b
)

if exist "%DOWNLOADDIR%" (
    echo El directorio de descargas "%DOWNLOADDIR%" existe. >> "%logFile%"
) else (
    echo Error: El directorio de descargas "%DOWNLOADDIR%" no existe. >> "%logFile%"
    pause > nul
    exit /b
)

if exist "%BACKUPDIR%" (
    echo El directorio de respaldo "%BACKUPDIR%" existe. >> "%logFile%"
) else (
    echo Error: El directorio de respaldo "%BACKUPDIR%" no existe. >> "%logFile%"
    pause > nul
    exit /b
)

:: Buscar archivos que comienzan con "clientes" en el directorio de origen
echo. >> "%logFile%"
echo Buscando archivos que comienzan con "clientes" en el directorio de descargas: >> "%logFile%"

set "fileFound=false"
for %%F in ("%DOWNLOADDIR%\%keyword1%*.json") do (
    echo Archivo encontrado: %%~nxF >> "%logFile%"
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "clientes" en el directorio de descargas. >> "%logFile%"
)

:: Buscar archivos que comienzan con "notasControl" en el directorio de origen
echo. >> "%logFile%"
echo Buscando archivos que comienzan con "notasControl" en el directorio de descargas: >> "%logFile%"

set "fileFound=false"
for %%F in ("%DOWNLOADDIR%\%keyword2%*.json") do (
    echo Archivo encontrado: %%~nxF >> "%logFile%"
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "notasControl" en el directorio de descargas. >> "%logFile%"
)

:: Buscar archivos que comienzan con "seguimientos" en el directorio de origen
echo. >> "%logFile%"
echo Buscando archivos que comienzan con "seguimientos" en el directorio de descargas: >> "%logFile%"

set "fileFound=false"
for %%F in ("%DOWNLOADDIR%\%keyword3%*.json") do (
    echo Archivo encontrado: %%~nxF >> "%logFile%"
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "seguimientos" en el directorio de descargas. >> "%logFile%"
)

:: Verificar la existencia y la fecha de los nuevos archivos
set /a totalFiles=0, processedFiles=0
for %%F in ("clientes" "seguimientos" "notasControl") do (
    for /r "%DOWNLOADDIR%" %%G in ("%%F-*.json") do (
        set /a totalFiles+=1
    )
)

for %%F in ("clientes" "seguimientos" "notasControl") do (
    for /r "%DOWNLOADDIR%" %%G in ("%%F-*.json") do (
        set /a processedFiles+=1
        echo. >> "%logFile%"
        echo Procesando: %%G >> "%logFile%"
        echo [!processedFiles!/!totalFiles!] Archivos procesados

        set "filename=%%~nG"
        
        for /l %%A in (8,1,15) do (
            if "!filename:~%%A,1!" neq "" (
                set "filedate=!filedate!!filename:~%%A,1!"
            )
        )

        :: Eliminar los archivos antiguos
        if exist "%WORKDIR%\%%F-old.json" (
            del /Q "%WORKDIR%\%%F-old.json"
            echo Archivo eliminado: %WORKDIR%\%%F-old.json >> "%logFile%"
        )

        :: Renombrar los archivos actuales
        if exist "%WORKDIR%\%%F.json" (
            ren "%WORKDIR%\%%F.json" "%%F-old.json"
            echo Archivo renombrado: %WORKDIR%\%%F.json a %%F-old.json >> "%logFile%"
        )

        :: Copiar los nuevos archivos
        copy /Y "%%G" "%WORKDIR%\%%F.json"
        
        :: Verificar si la copia fue exitosa
        if exist "%WORKDIR%\%%F.json" (
            :: Mover el archivo al directorio de respaldo
            move /Y "%%G" "%BACKUPDIR%\%%~nxG"
            echo Archivo movido al directorio de respaldo: %%G >> "%logFile%"

            :: Realizar operaciones de Git
            cd "%WORKDIR%"
            cd ..
            git add "%%F.json" >> "%logFile%" 2>&1
            git add "%%F-old.json" >> "%logFile%" 2>&1
            echo. >> "%logFile%"
            echo Se agregaron los siguientes archivos al índice de Git: >> "%logFile%"
            echo. >> "%logFile%"
            echo %%F.json >> "%logFile%"
            echo %%F-old.json >> "%logFile%"
        ) else (
            echo Error: La copia del archivo %%G no fue exitosa. >> "%logFile%"
        )
    )
)

:: Realizar operaciones de Git
echo. ******************************** >> "%logFile%"
git diff --cached --name-only > changes.txt 2>&1
findstr /r /v "^$" changes.txt > changes_non_empty.txt 2>&1
if exist changes_non_empty.txt (
    set /p first_line=<changes_non_empty.txt
    if not "%first_line%"==" " (
        echo Los siguientes archivos se han agregado al índice de Git pero aún no tienen un commit: >> "%logFile%"
        type changes_non_empty.txt >> "%logFile%"
        git status >> "%logFile%" 2>&1
        echo Realizando commit y push. >> "%logFile%"
        git commit -m "copia-seguridad-database-%datetime%" >> "%logFile%" 2>&1

        if !errorlevel! neq 0 (
        echo Hubo un error al realizar el commit. >> "%logFile%"
        ) else (
            git push -u origin master  >> "%logFile%" 2>&1
            if !errorlevel! neq 0 (
                echo Hubo un error al subir los cambios al repositorio. >> "%logFile%"
            ) else (
                echo Se ha realizado un nuevo commit y se subio al repositorio GitHub. >> "%logFile%"
            )
        )
    )
) else (
    echo No hay archivos en el índice de Git que se hayan agregado sin realizar un commit. >> "%logFile%"
)

del changes.txt 2>nul
del changes_non_empty.txt 2>nul
endlocal