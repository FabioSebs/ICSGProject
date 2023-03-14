FROM nginx:1.19

COPY nginx.conf /etc/nginx/nginx.conf

USER root

COPY . .

RUN sed -i "s/SERVER_ADDRESS/$SERVER_ADDRESS/g" /etc/nginx/nginx.conf
RUN sed -i "s/SERVER_ADDRESS/$FRONTEND_ADDRESS/g" /etc/nginx/nginx.conf
RUN sed -i "s/SERVER_ADDRESS/$BACKEND_ADDRESS/g" /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
