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

### nep6.json 파일 참고 사이트
https://docs.neo.org/docs/en-us/basic/concept/wallets.html#nep6-files

### __init__.py 코드 추가
아래 코드를 `__init__.py` 파일에 추가한다.
```python
import pathlib
from neo3.wallet.wallet import Wallet

# shared 폴더에 NEP6 형식을 따르는 test-nep6.json 파일을 추가한다.
shared_dir = pathlib.Path("shared").resolve(strict=True)
# json 파일과 비밀번호는 본인이 원하는 형식으로 변경한다.
# 예를 들어, shared/my-wallet.json 파일로 만들었고, 비밀번호가 5678이면 아래처럼 코드를 작성한다.
# user_wallet = Wallet.from_file(f"{shared_dir}/my-wallet.json", passwords=["5678"])
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

    # https://dora.coz.io/monitor 사이트에서 나타나는 RPC 주소를 참고한다.
    # 아래 예시는 Neo Test네트워크에 배포하는 예시임.
    facade = ChainFacade(rpc_host=f"http://seed1t4.neo.org:20332")
    # shared 폴더에 NEP6 형식을 따르는 test-nep6.json 파일을 추가한다.
    # json 파일과 비밀번호는 본인이 원하는 형식으로 변경한다.
    # 예를 들어, shared/my-wallet.json 파일로 만들었고, 비밀번호가 5678이면 아래처럼 코드를 작성한다.
    # facade.add_signer(sign_insecure_with_account(account, password="5678"),
    #                       Signer(account.script_hash)
    #                       )
    facade.add_signer(sign_insecure_with_account(account, password="1234"),
                      Signer(account.script_hash)
                      )

    # neo-boa로 컴파일하면 .nef, manifest.json형식의 파일이 생성된다.
    # .nef, manifest.json가 위치한 경로를 작성한다.
    files_path = f"../../neo-boa/example/"

    # .nef 파일 이름
    nep17 = nef.NEF.from_file(files_path + "nep17.nef")
    # manifest.json 파일 이름
    manifest_nep17 = manifest.ContractManifest.from_file(files_path + "nep17.manifest.json")
    print("Deploying contract nep17...", "end=""")
    receipt = await facade.invoke(GenericContract.deploy(nep17, manifest_nep17))
    # 배포된 스마트 컨트랙트 주소를 잘 기억해 둘 것
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
