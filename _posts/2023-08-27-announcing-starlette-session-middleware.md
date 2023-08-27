---
layout: post
title: "Announcing Starlette Session Middleware"
date: 2023-08-27 00:00:00 -0500
category: blog
tags: [software-engineering]
---

# Announcing Starlette Session Middleware
I have started releasing alpha versions of my new Starlette Session Middleware
package and plan on releasing a stable version as soon as I settle on the API I
want. As of the time of writing, I currently support cookie based session
storage, cookie based sessions, as well as JWT and signed tokens that are
compatible with Starlette's existing upstream middleware. I fully intend on
adding support for authorization header based sessions but that does not exist
yet (even though it should be easy to add). The source code can be found
[here](https://github.com/lannuttia/starlette-session-middleware and the package
can be found on PyPI
[here](https://pypi.org/project/starlette-session-middleware/).

## Design Philosophy
Starlette Session Middleware is designed to provide sane options for session
management out of the box but not lock its consumers into one specific way of
doing things. This is accomplished through the concept of specialized "backends".
This allows you to mix-and-match behaviors by allowing you to swap out these
backends based on how exactly you want sessions to be handled. This also allows
developers to easily create custom backends to accomplish their specific goals
by implementing the specific backend interface and then providing that custom
backend to the middleware. This approach is exceptionally powerful and provides
some pretty cool improvements over the existing session middleware solutions
that I've found. For example, if you want to use a specific JWT library for
encoding/decoding JWTs because you don't want to use PyJWT, you can easily
create your own JwtBackend that uses your JWT library of choice and provide that
to the middleware instead. There are three kinds of "backends" that exist in
Starlette Session Middleware.

1. Codec Backend
1. Storage Backend
1. Authorization Backend

The codec backend specifies how the session information is to be encoded and
decoded. The storage backend specifies how the encoded token is supposed to be
communicated with the client (usually through the set-cookie header). The
authorization backend specifies how the session will be communicated with the
backend. This would usually be done through an authorization header or
through a session cookie but the backend approach would allow for users to
specify custom ways that they want to communicate session information.

### Backend Examples

#### Codec Backend Example
```python
import typing

import jwt
from jwt.exceptions import InvalidTokenError

from starlette.datastructures import Secret

from starlette_session.middleware.codecbackends.errors import DecodeError
from starlette_session.middleware.codecbackends.base import CodecBackendInterface


class JwtBackend(CodecBackendInterface):
    def __init__(
        self,
        key: typing.Union[str, Secret],
        algorithm: str,
    ):
        self.key = key
        self.algorithm = algorithm

    def decode(self, value: str) -> typing.Any:
        try:
            return jwt.decode(value, key=self.key, algorithms=[self.algorithm])
        except InvalidTokenError as ex:
            raise DecodeError("Failed to decode value") from ex

    def encode(self, data: dict[str, typing.Any]) -> str:
        return str(jwt.encode(data, key=self.key, algorithm=self.algorithm))
```

#### Authorization Backend Example
```python
import typing


from starlette.requests import HTTPConnection


from starlette_session.middleware.authorizationbackends.base import (
    AuthorizationBackendInterface,
)


class CookieAuthorizationBackend(AuthorizationBackendInterface):
    def __init__(self, session_cookie: str = "session"):
        self.session_cookie = session_cookie

    def get_token(self, connection: HTTPConnection) -> typing.Union[str, None]:
        if self.session_cookie not in connection.cookies:
            return None
        return str(connection.cookies[self.session_cookie])
```

#### Storage Backend Example
```python
import typing


from starlette.datastructures import MutableHeaders
from starlette.types import Message

from starlette_session.middleware.storagebackends.base import StorageBackendInterface


class CookieBackend(StorageBackendInterface):
    def __init__(
        self,
        max_age: typing.Optional[int] = 14 * 24 * 60 * 60,
        session_cookie: str = "session",
        path: str = "/",
        same_site: typing.Literal["lax", "strict", "none"] = "lax",
        https_only: bool = False,
    ):
        self.max_age = max_age
        self.session_cookie = session_cookie
        self.path = path
        self.security_flags = "httponly; samesite=" + same_site
        if https_only:  # Secure flag can be used with HTTPS only
            self.security_flags += "; secure"

    def persist(self, message: Message, data: str) -> None:
        headers = MutableHeaders(scope=message)
        header_value = "{session_cookie}={data}; path={path}; {max_age}{security_flags}".format(
            session_cookie=self.session_cookie,
            data=data,
            path=self.path,
            max_age=f"Max-Age={self.max_age}; " if self.max_age else "",
            security_flags=self.security_flags,
        )
        headers.append("Set-Cookie", header_value)

    def clear(self, message: Message) -> None:
        headers = MutableHeaders(scope=message)
        header_value = "{session_cookie}={data}; path={path}; {expires}{security_flags}".format(
            session_cookie=self.session_cookie,
            data="null",
            path=self.path,
            expires="expires=Thu, 01 Jan 1970 00:00:00 GMT; ",
            security_flags=self.security_flags,
        )
        headers.append("Set-Cookie", header_value)
```

# Why

Lately I have been playing around with [FastAPI](https://fastapi.tiangolo.com/)
and [Starlette](https://www.starlette.io/). I am looking at these as tools that
I might leverage in a future backend migration of a service that I maintain for
my day job. The existing service uses JWT based authentication and part of my
migration strategy involves moving the creation of these JWTs from the existing
service to the new service while still being able to decode and use these JWTs
in both services concurrently. Even though there is a tutorial for doing this
in FastAPI that exists
[here](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/). I thought
this was a little messy and that led me to look into starlette middleware for
session management. Unfortunately for me, Starlette's session middleware does
not support JWTs out of the box so it does not meet my use case. There
are third-party starlette session packages that exist too but none of these
were very flexible and largly seemed to be copy pasted from the upstream
Starlette SessionMiddleware implementation with minor changes to change how
tokens are encoded and decoded. This led me to ask the question "why can't
there be a more generic plugable session middleware that supports many
different ways of encoding/decoding tokens and provides an easy way to support
cookie or authorization header based sessions?" The answer I came up with is
there is no good reason. That lead me to where I am today.
