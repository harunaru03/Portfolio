FROM nginx:latest-alpine

RUN apk update && apk upgrade

COPY . /usr/share/nginx/html

EXPOSE 80

# -g daemon off;で設定ファイルなしでデーモン化を防ぐ
CMD ["nginx", "-g", "daemon off;"]
