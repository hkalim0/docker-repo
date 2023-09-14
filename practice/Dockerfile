FROM ubuntu:14.04
LABEL name="John"
ENV pass=123
ENV name=abc
RUN pwd>/tmp/1stpwd.txt
RUN cd /tmp/
RUN pwd>/tmp/2ndpwd.txt
WORKDIR /tmp
RUN pwd>/tmp/3rdpwd.txt
