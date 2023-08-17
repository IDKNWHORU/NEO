from typing import Any

from boa3.builtin.compile_time import public
from boa3.builtin.interop import storage


@public
def _deploy(data: Any, update: bool):
    storage.put(b"second script", "Hello Ludium, I'm WHORU")


@public
def get_message() -> str:
    return str(storage.get(b"second script"))            


@public
def set_message(new_message: str):
    storage.put(b"second script", new_message)
