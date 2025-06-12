FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libomp-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Update pip
RUN pip install --upgrade pip

# Install required Python
RUN pip install --no-cache-dir -r requirements.txt

# Check if all packages are installed
RUN python -c "import numpy, sklearn, pandas, xgboost; print('All packages loaded successfully')"

COPY . .

EXPOSE 5000

CMD ["python", "api_model.py"]
