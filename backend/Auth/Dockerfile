# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir database

COPY . .

EXPOSE 5001

ENV FLASK_APP=app.py

CMD ["python", "app.py"]
