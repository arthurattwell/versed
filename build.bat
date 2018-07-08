:: Don't show these commands to the user
@echo off
:: Keep variables local, and expand at execution time not parse time
setlocal enabledelayedexpansion
:: Set the title of the window
title Build and serve

echo 1. Sass
echo 2. Serve
echo 3. Exit

choice /C 123 /M "Enter an option: "

:: List ERRORLEVELS in descending order
if errorlevel 3 goto:EOF
if errorlevel 2 goto Serve
if errorlevel 1 goto Sass

:Serve
	echo -------------------------------------------
	echo Starting webserver...echo Starting webserver at http://localhost:5000
	echo Press Ctrl+C to stop
	echo -------------------------------------------
	ruby -run -e httpd . -p 5000

:Sass
	echo -------------------------------------------
	echo Building CSS with Sass and watching for changes
	echo -------------------------------------------
	sass --watch versed.scss:versed.css --style compressed --sourcemap=none

