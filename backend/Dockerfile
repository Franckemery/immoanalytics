FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

# Hugging Face Spaces tourne sur le port 7860 par défaut
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]