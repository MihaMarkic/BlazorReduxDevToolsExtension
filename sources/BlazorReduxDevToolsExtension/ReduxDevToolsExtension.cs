using System;
using Microsoft.AspNetCore.Blazor.Browser.Interop;

namespace BlazorReduxDevToolsExtension
{
    public class ReduxDevToolsExtension
    {
        public static event EventHandler<MessageReceivedEventArgs> MessageReceived;
        public static void OnMessageReceived(string message) => MessageReceived?.Invoke(null, new MessageReceivedEventArgs(message));
        public static bool IsAvailable()
        {
            return RegisteredFunction.Invoke<bool>("BlazorReduxDevToolsExtension.IsAvailable");
        }
        public static void Connect(ReduxDevToolsExtensionOptions options = null)
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.Connect", options);
        }
        public static void Init(object state)
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.Init", state);
        }
        public static void Subscribe()
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.Subscribe");
        }
        public static void Send(object action, object state)
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.Send", action, state);
        }
        public static void UnSubscribe()
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.UnSubscribe");
        }
        public static void Disconnect()
        {
            RegisteredFunction.Invoke<object>("BlazorReduxDevToolsExtension.Disconnect");
        }
    }
}
