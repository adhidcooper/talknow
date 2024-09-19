# Use an official Python runtime as a parent image
FROM python:3.9-slim

COPY requirements.txt /Auth_app/requirements.txt
WORKDIR /Auth_app
RUN pip install -r requirements.txt
COPY . /Auth_app
ENTRYPOINT [ "python" ]
CMD ["app.py"]
