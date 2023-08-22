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
