import asyncio

from neo3.api.helpers.signing import sign_insecure_with_account
from neo3.core import types
from neo3.api.wrappers import ChainFacade, NEP17Contract, NeoToken
from neo3.network.payloads.verification import Signer
from example import user_wallet


async def transfer_neo():
    wallet = user_wallet
    account = wallet.account_default
    facade = ChainFacade(rpc_host=f"http://seed1t4.neo.org:20332")
    facade.add_signer(sign_insecure_with_account(account, password="1234"),
                      Signer(account.script_hash)
                      )

    neo = NeoToken()

    print(
        await facade.invoke(neo.transfer(account.address, "NiozLpfrQ5hf6Hhq7u9RMyUk6u3TSqRjE5", 1))
    )


async def transfer_nep17():
    wallet = user_wallet
    account = wallet.account_default
    facade = ChainFacade(rpc_host=f"http://seed1t4.neo.org:20332")
    facade.add_signer(sign_insecure_with_account(account, password="1234"),
                      Signer(account.script_hash)
                      )

    contract_hash = types.UInt160.from_string("ca3d9ddbc153c11dbd1abc0ff55e25b9fdcdbce3")
    token = NEP17Contract(contract_hash)
    print(
        await facade.invoke(token.transfer(account.address, "NiozLpfrQ5hf6Hhq7u9RMyUk6u3TSqRjE5", 100000000))
    )


if __name__ == "__main__":
    asyncio.run(transfer_neo())
    asyncio.run(transfer_nep17())
