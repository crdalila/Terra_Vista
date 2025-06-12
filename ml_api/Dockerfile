FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema (incluyendo OpenMP para XGBoost)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libomp-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Actualizar pip
RUN pip install --upgrade pip

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Verificar que todo se instaló correctamente
RUN python -c "import numpy, sklearn, pandas, xgboost; print('All packages loaded successfully')"

COPY . .

EXPOSE 5000

CMD ["python", "api_model.py"]
