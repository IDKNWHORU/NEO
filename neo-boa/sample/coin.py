from boa3.builtin.compile_time import public


@public(name='totalSupply', safe=True)
def total_supply() -> int:
    return 10 ** 8
