FROM node:12.19.0-alpine
# Install base packages
RUN apk update
RUN apk upgrade
# Change TimeZone
RUN apk add --update tzdata
ENV TZ=America/New_York
# Install packages
RUN apk --no-cache add \
        git \
        bash

WORKDIR /var/www/courseware
ADD . /var/www/courseware

#RUN mkdir -p /var/www/courseware/tmp