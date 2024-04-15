@echo off
setlocal

cls
echo.
echo. ******* Realizando Backup de la informacion de la aplicacion Control de Vencimientos. *******
echo.
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
    echo El directorio de trabajo "%WORKDIR%" existe.
) else (
    echo Error: El directorio de trabajo "%WORKDIR%" no existe.
    pause > nul
    exit /b
)

if exist "%DOWNLOADDIR%" (
    echo El directorio de descargas "%DOWNLOADDIR%" existe.
) else (
    echo Error: El directorio de descargas "%DOWNLOADDIR%" no existe.
    pause > nul
    exit /b
)

if exist "%BACKUPDIR%" (
    echo El directorio de respaldo "%BACKUPDIR%" existe.
) else (
    echo Error: El directorio de respaldo "%BACKUPDIR%" no existe.
    pause > nul
    exit /b
)

:: Buscar archivos que comienzan con "clientes o notasControl o seguimientos" en el directorio de origen
echo.
echo Buscando archivos que comienzan con "clientes o notasControl o seguimientos" en el directorio de origen:
echo.
set "fileFound=false"

for %%F in ("%DOWNLOADDIR%\%keyword1%*.json") do (
    echo Archivo encontrado: %%~nxF
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "clientes o notasControl o seguimientos" en el directorio de origen.
    pause > nul
    exit /b
)

for %%F in ("%DOWNLOADDIR%\%keyword2%*.json") do (
    echo Archivo encontrado: %%~nxF
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "%clientes o notasControl o seguimientos%" en el directorio de origen.
    pause > nul
    exit /b
)

for %%F in ("%DOWNLOADDIR%\%keyword3%*.json") do (
    echo Archivo encontrado: %%~nxF
    set "fileFound=true"
)
if "%fileFound%"=="false" (
    echo No se encontraron archivos que comiencen con "%clientes o notasControl o seguimientos%" en el directorio de origen.
    pause > nul
    exit /b
)


:: Fecha y hora actuales
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set "datetime=%%I"
set "datetime=%datetime:~0,14%"

:: Verificar la existencia y la fecha de los nuevos archivos
for %%F in (clientes seguimientos notasControl) do (
    for /r "%DOWNLOADDIR%" %%G in ("%%F-*.json") do (
        set "filename=%%~nG"
        setlocal enabledelayedexpansion
        set "filedate=!filename:~8,8!!filename:~18,6!"

        :: Eliminar los archivos antiguos
        del /Q "%WORKDIR%\%%F-old.json"

        :: Renombrar los archivos actuales
        ren "%WORKDIR%\%%F.json" "%%F-old.json"

        :: Copiar los nuevos archivos
        copy /Y "%%G" "%WORKDIR%\%%F.json"
        echo Archivo copiado: %%G

        :: Verificar si la copia fue exitosa
        if exist "%WORKDIR%\%%F.json" (
            :: Mover el archivo al directorio de respaldo
            move /Y "%%G" "%BACKUPDIR%\%%~nxG"
            echo Archivo movido a respaldo: %%G

            

            echo Operaciones de Git omitidas.
        ) else (
            echo Error: La copia del archivo %%G no fue exitosa.
        )

        endlocal
    )
)

endlocal
