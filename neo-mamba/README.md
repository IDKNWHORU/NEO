# neo-mamba

## 빠른 시작
- `Python 3.10`
- Linux 혹은 MaxOS 혹은 Windows 운영 체제
## 설치
python 가상 환경을 만들고 활성화한다. 

리눅스, Mac OS 설치 커맨드
```sh
$ python3 -m venv venv
$ source venv/bin/activate
```
Windows 설치 커맨드
```sh
$ python3 -m venv venv
$ venv\Scripts\activate.bat
```
### Pip를 이용한 neo-mamba 설치 
```sh
$ pip install neo-mamba
```
## 개발 코드 추가
소스 코드를 작성할 디렉터리를 추가한다.
```sh
$ mkdir example
$ mkdir example/shared
$ touch example/shared/test-nep6.json
$ touch example/__init__.py
$ touch example/contract-deploy.py
```
### test-nep6.json 
자신의 neo wallet (NEP6 형식으로 작성 된 json) 데이터를 `test-nep6.json`에 추가한다.

### __init__.py 코드 추가
아래 코드를 `__init__.py` 파일에 추가한다.
```python
import pathlib
from neo3.wallet.wallet import Wallet

shared_dir = pathlib.Path("shared").resolve(strict=True)
user_wallet = Wallet.from_file(f"{shared_dir}/test-nep6.json", passwords=["1234"])

```
### contract-deploy.py 코드 추가
아래 코드를 `contract-deploy.py` 파일에 추가한다.
```python
import asyncio

from neo3.api.wrappers import GenericContract, ChainFacade
from neo3.api.helpers.signing import sign_insecure_with_account
from neo3.contracts import nef, manifest
from neo3.network.payloads.verification import Signer
from example import user_wallet


async def main():
    wallet = user_wallet
    account = wallet.account_default

    facade = ChainFacade(rpc_host=f"http://seed1t4.neo.org:20332")
    facade.add_signer(sign_insecure_with_account(account, password="1234"),
                      Signer(account.script_hash)
                      )

    files_path = f"../../neo-boa/example/"

    nep17 = nef.NEF.from_file(files_path + "nep17.nef")
    manifest_nep17 = manifest.ContractManifest.from_file(files_path + "nep17.manifest.json")
    print("Deploying contract nep17...", "end=""")
    receipt = await facade.invoke(GenericContract.deploy(nep17, manifest_nep17))
    contract_hash = receipt.result
    print(f"contract hash = {contract_hash}")

    contract = GenericContract(contract_hash)
    print("Calling `symbol`, result is: ", end="")
    result = await facade.test_invoke(contract.call_function("symbol"))
    print(result)

if __name__ == "__main__":
    asyncio.run(main())
```

## 실행
`contract-deploy.py` 파일을 실행한다.
