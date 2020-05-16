FROM node:lts-alpine

ENV NODE_ENV=production

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG SSH_PRV_KEY
ARG SSH_PUB_KEY
ENV SSH_PRV_KEY=${SSH_PRV_KEY}
ENV SSH_PUB_KEY=${SSH_PUB_KEY}

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
RUN apk update && \
    apk add --update git && \
    apk add --update openssh
    
# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    echo "${SSH_PRV_KEY}" > /root/.ssh/id_rsa && \
    echo "${SSH_PUB_KEY}" > /root/.ssh/id_rsa.pub && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts

# RUN ssh -Tv git@github.com
# RUN cat /root/.ssh/id_rsa && cat /root/.ssh/id_rsa.pub

ADD ./ /usr/src/app
WORKDIR /usr/src/app

RUN npm config set registry https://registry.npm.taobao.org && npm install --only-production

# Remove SSH keys
RUN rm -rf /root/.ssh/

EXPOSE 80
CMD npm run start