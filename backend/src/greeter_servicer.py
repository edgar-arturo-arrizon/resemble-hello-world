import asyncio
from hello_world.v1.greeter_rsm import (
    Greeter,
    GreeterState,
    GreetingsRequest,
    GreetingsResponse,
    GreetRequest,
    GreetResponse,
)
from resemble.aio.contexts import ReaderContext, WriterContext


class GreeterServicer(Greeter.Interface):

    async def Greetings(
        self,
        context: ReaderContext,
        state: GreeterState,
        request: GreetingsRequest,
    ) -> GreetingsResponse:
        print('request: ', request)
        print('context:', context)
        return GreetingsResponse(
            greetings=state.greetings,
            greetInt=state.greetInt
            )

    async def Greet(
        self,
        context: WriterContext,
        state: GreeterState,
        request: GreetRequest,
    ) -> Greeter.GreetEffects:
        greeting = request.greeting
        state.greetings.extend([greeting])
        state.greetInt = request.greetInt
        state.isChecked = request.isChecked
        print('state: ', state)
        return Greeter.GreetEffects(state=state, response=GreetResponse())
