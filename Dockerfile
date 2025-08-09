FROM nginx:alpine

# Copy static site
COPY ./ /usr/share/nginx/html

# Harden and configure Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

