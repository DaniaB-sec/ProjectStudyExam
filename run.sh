#!/usr/bin/env bash
PORT=${1:-8000}
echo "=========================================================="
echo "🚀 Iniciando WebDev Mastery Lab na porta $PORT..."
echo "Acesse no navegador: http://localhost:$PORT"
echo "Para encerrar, pressione Ctrl+C"
echo "=========================================================="
cd "$(dirname "$0")"
php -S 0.0.0.0:$PORT
