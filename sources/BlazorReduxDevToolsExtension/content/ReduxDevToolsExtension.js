const assemblyName = "BlazorReduxDevToolsExtension";
const namespace = "BlazorReduxDevToolsExtension";
const typeName = "ReduxDevToolsExtension";
const methodName = "OnMessageReceived";

const withDevTools = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__);
const BlazorReduxDevToolsExtension = {};
Blazor.registerFunction('BlazorReduxDevToolsExtension.IsAvailable', function () {
    return withDevTools !== undefined;
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.Connect', function (options) {
    BlazorReduxDevToolsExtension.devTools = withDevTools.connect(options);
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.Init', function (state, subscribe) {
    
    return BlazorReduxDevToolsExtension.devTools.init(state);
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.Send', function (action, state) {
    return BlazorReduxDevToolsExtension.devTools.send(action, state);
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.Subscribe', function () {
    const messageReceivedMethod = Blazor.platform.findMethod(
        assemblyName,
        namespace,
        typeName,
        methodName
    );

    BlazorReduxDevToolsExtension.subscription = BlazorReduxDevToolsExtension.devTools.subscribe((message) => {
        var json = JSON.stringify(message);
        Blazor.platform.callMethod(messageReceivedMethod, null, [Blazor.platform.toDotNetString(json)]);
    });
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.UnSubscribe', function () {
    BlazorReduxDevToolsExtension.devTools.unsubscribe();
});
Blazor.registerFunction('BlazorReduxDevToolsExtension.Disconnect', function () {
    withDevTools.disconnect();
});