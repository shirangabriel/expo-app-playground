import { StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';

export default function WebViewSession() {
    const injectedJavaScript = `
       (function() {
      // Alert on page load
      alert('Page has loaded');

      document.addEventListener('DOMContentLoaded', function() {
        var button = document.createElement('button');
        button.innerText = 'Send Session Data';
        button.onclick = function() {
          alert('Session Data will be sent to React Native app');
          window.ReactNativeWebView.postMessage(JSON.stringify(sessionStorage));
        };
        document.body.appendChild(button);
      });
    })();
  `;

    const onMessage = (event) => {
        const sessionData = JSON.parse(event.nativeEvent.data);
        console.log('Session Data:', sessionData);
    };


    return (
        <WebView
            style={styles.container}
            source={{ uri: 'https://react-playground-beige.vercel.app' }}
            injectedJavaScript={injectedJavaScript}
            onMessage={onMessage}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
