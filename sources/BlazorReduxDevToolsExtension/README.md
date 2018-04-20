# BlazorReduxDevToolsExtension

[![NuGet](https://img.shields.io/nuget/v/Righthand.BlazorReduxDevToolsExtension.svg)](https://www.nuget.org/packages/Righthand.BlazorReduxDevToolsExtension)

This is a library that implements the interop between [Blazor](https://github.com/aspnet/Blazor) and [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension). Which allows you communicating with it and use it's capabilities including time travel debugging.

Core methods are implemented. Options class is not yet implemented.

Built against Blazor 0.2.1.

## Sample usage

You find sample usage in BlazorReduxDevToolsExtensionApp application.

```csharp
@using BlazorReduxDevToolsExtension
@page "/"

<h1>ReduxDevTools Extension interop</h1>

<div>Present <b>@IsAvailable</b></div>
<div>Last Message</div>
<div>@LastMessage</div>

@functions {
    public bool IsAvailable => ReduxDevToolsExtension.IsAvailable();
    public string LastMessage { get; private set; } = "Nothing yet";

    protected override void OnInit()
    {
        if (IsAvailable)
        {
            ReduxDevToolsExtension.Connect();
            ReduxDevToolsExtension.Init(new { Tubo = 88 });
            ReduxDevToolsExtension.MessageReceived += (s, e) =>
            {
                LastMessage = e.Message;
                StateHasChanged();
            };
            ReduxDevToolsExtension.Subscribe();
            ReduxDevToolsExtension.Send(new { type = "AnAction" }, new { Tubo = 109 });
            ReduxDevToolsExtension.Send(new { type = "Another" }, new { Tubo = 504 });
            // uncomment it but put a bit of delay in between, otherwise it unsubscribes too early
            //ReduxDevToolsExtension.UnSubscribe();
            //ReduxDevToolsExtension.Disconnect();
        }
    }
}
```