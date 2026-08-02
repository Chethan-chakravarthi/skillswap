@echo off
REM Runs the SkillSwap backend (Spring Boot, H2 in-memory DB).
REM
REM TEMP/TMP are redirected away from %LOCALAPPDATA%\Temp because on this
REM machine Windows security software blocks AF_UNIX socket connect() calls
REM there, which breaks java.nio.channels.Selector.open() (used by both the
REM Gradle daemon and Tomcat's NIO connector) with:
REM   java.net.SocketException: Invalid argument: connect
set TEMP=%~dp0.javatmp
set TMP=%~dp0.javatmp
if not exist "%TEMP%" mkdir "%TEMP%"
"%~dp0gradlew.bat" bootRun
