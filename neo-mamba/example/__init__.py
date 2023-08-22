import pathlib
import os
import sys
import subprocess
import threading
import shlex
import time
import json
from typing import Optional
from neo3.wallet.wallet import Wallet
from neo3.core import types

shared_dir = pathlib.Path("shared").resolve(strict=True)

user_wallet = Wallet.from_file(f"{shared_dir}/test-nep6.json", passwords=["1234"])
