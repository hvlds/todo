FROM  python:3.8

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 90


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "90"]