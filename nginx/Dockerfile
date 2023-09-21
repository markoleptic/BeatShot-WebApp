FROM nginx:alpine

# if 2+ sites probably split /etc/nginx/nginx.conf into /etc/nginx/conf.d/default.conf
#COPY ./nginx.conf /etc/nginx/conf.d/

#COPY ./nginx_dev.conf /etc/nginx/nginx.conf
# uncomment for prod
COPY ./nginx_prod.conf /etc/nginx/nginx.conf
COPY ./proxy.conf /etc/nginx/

EXPOSE 80
# uncomment for prod
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]