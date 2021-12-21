FROM nginx
COPY --chown=nginx ./dist/secret-santa/ /www/data
COPY nginx.conf /etc/nginx/nginx.conf
