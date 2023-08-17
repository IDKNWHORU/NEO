import asyncio
from neo3.core import types
from neo3.api.wrappers import ChainFacade, NeoToken, NEP17Contract


async def main():
    facade = ChainFacade(rpc_host=f"http://127.0.0.1:50012")
    contract_hash = types.UInt160.from_string("0x94d3a02056981122cdb39b8b4f463c6dc1b5518a")
    contract = NEP17Contract(contract_hash)
    print(
        await facade.test_invoke(contract.call_function("get_message"))
    )


if __name__ == "__main__":
    asyncio.run(main())
