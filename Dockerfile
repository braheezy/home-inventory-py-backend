FROM python:3.7

WORKDIR /app

COPY app/* /app/

RUN pip install -r requirements.txt

EXPOSE 5000

# Run flask as module so we can pass in host IP.
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
