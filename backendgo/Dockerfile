FROM golang:alpine
WORKDIR /backend
COPY . .
RUN go mod download
EXPOSE 8080
RUN go build -o /main main.go
ENTRYPOINT [ "/main" ]
